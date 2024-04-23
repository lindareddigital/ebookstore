import useSWR from "swr";
import { useMemo } from "react";
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

   const Login = async () => {
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
      // router.push("/member");
      const data = await response.json();
      console.log("token", data.data.access_token);

      localStorage.setItem("token", data.data.access_token);

      

     } else {
       // Handle errors
     }
   }



  // const fetcher = (url, params) => fetch(url + params.id).then((r) => r.json());

  // const { data: product, error } = useSWR(id && !loading ? ["/products", params] : null, fetcher);

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
        <Breadcrumb data={"登入"} />
        <form onSubmit={handleSubmit} className="form-area contact-us">
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
            <button
              onSubmit={handleSubmit}
              type="submit"
              className="btn info-site-btn"
            >
              確認傳送
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
