import useSWR from "swr";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import Navbar from "src/pages/components/molecules/Navbar";
import MenuBar from "src/pages/components/molecules/MenuBar";
import Breadcrumb from "src/pages/components/molecules/Breadcrumb";
// import { cookies } from "next/headers";


function Login() {
  // const {session, loading} = useSession();

  const router = useRouter();

  // const params = useMemo(
  //   () => ({ id, accessToken: session?.accessToken }),
  //   [id]
  // );


   const Login = async (event) => {
     event.preventDefault();

     const formData = new FormData(event.currentTarget);
     const email = formData.get("email");
     const password = formData.get("password");

     const response = await fetch("/api/auth/login", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ email, password }),
     });

     if (response.ok) {
       const data = await response.json();
       console.log("token", data.data.access_token);
       const expiryTime = new Date().getTime() + 1000 * 60 * 15; // 15 minutes
      localStorage.setItem("tokenExpiry", expiryTime.toString());

      localStorage.setItem("token", data.data.access_token);
      localStorage.setItem("email", email);

       router.push("/member");
     }
   };

  useEffect(() => {
    if (localStorage.getItem("email") != null) {
      router.push("/member");
    }

  }, []);

  


  return (
    <>
      <div className="contactus-page">
        <Navbar />
        <MenuBar />
        <Breadcrumb data={"登入"} />
        <form onSubmit={Login} className="form-area contact-us">
          <div className="block-title">登入</div>
          <div className="red-word">*必須填寫</div>
          <div className="">
            <label htmlFor="email" className="form-label">
              帳號<span className="red-word">*</span>
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
            ></input>
          </div>

          <div className="">
            <label htmlFor="password" className="form-label">
              密碼 <span className="red-word">*</span>
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              aria-describedby="password"
            ></input>
          </div>

          <div className="button-group">
            <button type="submit" className="btn cancel-btn info-site-btn">
              取消
            </button>
            <button type="submit" className="btn info-site-btn">
              確認傳送
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
