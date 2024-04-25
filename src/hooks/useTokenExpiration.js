import { useEffect } from "react";
import { useRouter } from "next/router";
// import router from "next/router";

export default function useTokenExpiration () {
  // const router = useRouter();

  // useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem("token");
      const expiryTime = localStorage.getItem("tokenExpiry");

      if (
        token &&
        expiryTime &&
        new Date().getTime() < parseInt(expiryTime, 10)
      ) {
        const interval = setInterval(() => {
          const currentTime = new Date().getTime();
          if (currentTime >= parseInt(expiryTime, 10)) {
            localStorage.removeItem("token");
            localStorage.removeItem("tokenExpiry");
            console.log("logout");
            router.push(`/login`, undefined, { shallow: true });
            clearInterval(interval);
          }
        }, 60000); // 每分一次

        return () => clearInterval(interval);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiry");
        console.log("logout");
        // router.push(`/login`, undefined, { shallow: true });
      }
    };

    checkTokenExpiration();
  // }, [router]);
  // }, []);

};

