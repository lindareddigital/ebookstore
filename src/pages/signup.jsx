import useSWR from "swr";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import Navbar from "src/pages/components/molecules/Navbar";
import MenuBar from "src/pages/components/molecules/MenuBar";
import Breadcrumb from "src/pages/components/molecules/Breadcrumb";


function Signup() {
  // const {session, loading} = useSession();

  const router = useRouter();

  // const params = useMemo(
  //   () => ({ id, accessToken: session?.accessToken }),
  //   [id]
  // );

  const signup = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      // router.push("/member");
      const data = await response.json();
      console.log("token", data.data.access_token);

      localStorage.setItem("token", data.data.access_token);
    } else {
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
        <Breadcrumb data={"註冊"} />
        <form onSubmit={signup} className="form-area contact-us">
          <div className="block-title">註冊</div>
          <div className="red-word">*必須填寫</div>
          <div className="">
            <label htmlFor="name" className="form-label">
              姓名<span className="red-word">*</span>
            </label>
            <input
              type="name"
              className="form-control"
              id="name"
              aria-describedby="name"
            ></input>
          </div>
          <div className="">
            <label htmlFor="lastname" className="form-label">
              暱稱
            </label>
            <input
              type="lastname"
              className="form-control"
              id="lastname"
            ></input>
          </div>
          <div className="">
            <label htmlFor="email" className="form-label">
              電郵 <span className="red-word">*</span>
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="email"
            ></input>
          </div>
          <div className="">
            <label htmlFor="current-password" className="form-label">
              密碼 <span className="red-word">*</span>
            </label>
            <input
              type="current-password"
              className="form-control"
              id="current-password"
              aria-describedby="current-password"
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

export default Signup;
