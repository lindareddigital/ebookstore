import useSWR from "swr";
import { useMemo } from "react";
import { useRouter } from "next/router";
import Navbar from "src/pages/components/molecules/Navbar";
import MenuBar from "src/pages/components/molecules/MenuBar";
import Breadcrumb from "src/pages/components/molecules/Breadcrumb";


function Login() {
  // const {session, loading} = useSession();

  const router = useRouter();

  // const params = useMemo(
  //   () => ({ id, accessToken: session?.accessToken }),
  //   [id]
  // );

   const signup = async () => {
     const response = await fetch(
       "https://directus-cms.vicosys.com.hk/auth/login",
       {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
          email: email,
          password: password,
         }),
       }
     );
     const res = await response.json();
     console.log('88',res);
     
   };

   async function handleSubmit(event) {
     event.preventDefault();

     const formData = new FormData(event.currentTarget);
     const email = formData.get("email");
     const password = formData.get("password");

     const response = await fetch(
       "https://directus-cms.vicosys.com.hk/auth/login",
       {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ email, password }),
       }
     );

     if (response.ok) {
       router.push("/member");
     } else {
       // Handle errors
     }
   }


  return (
    <>
      {/* {!session && <button onClick={() => signIn()}>登入</button>}
      {session && (
        <>
          <p>使用者 email: {user.email}</p>
          <button onClick={() => signOut()}>登出</button>
        </>
      )} */}
      {/* <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form> */}
      <div className="contactus-page">
        <Navbar />
        <MenuBar />
        <Breadcrumb data={"註冊"} />
        <form className="form-area contact-us">
          <div className="block-title">註冊</div>
          <div className="red-word">*必須填寫</div>
          <div className="">
            <label htmlFor="exampleInputEmail1" className="form-label">
              姓名<span className="red-word">*</span>
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            ></input>
          </div>
          <div className="">
            <label htmlFor="exampleInputPassword1" className="form-label">
              暱稱
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            ></input>
          </div>
          <div className="">
            <label htmlFor="exampleInputEmail1" className="form-label">
              電郵 <span className="red-word">*</span>
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            ></input>
          </div>
          <div className="">
            <label htmlFor="exampleInputEmail1" className="form-label">
              類型 <span className="red-word">*</span>
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
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
