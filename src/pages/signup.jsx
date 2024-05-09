import useSWR from "swr";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "src/pages/components/molecules/Navbar";
import MenuBar from "src/pages/components/molecules/MenuBar";
import Breadcrumb from "src/pages/components/molecules/Breadcrumb";
import Head from "next/head";
import Link from "next/link";
import Toast from "react-bootstrap/Toast";


function Signup() {
  // const {session, loading} = useSession();

  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    fullname: "",
    nickname:"",
    password:""
  });
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastContent, setToastContent] = useState("");


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
      setShowToast(true);

    if (response.ok) {
      const data = await response.json();
      console.log("token", data);
      setToastContent("帳號註冊成功！");
      router.push("/member");

      // localStorage.setItem("token", data.data.access_token);
    } else {
      setToastContent("帳號註冊失敗！");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    const errors = validateForm({ ...formData, [name]: value });
    setErrors(errors);
    setIsDisabled(Object.keys(errors).length > 0);
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.email) {
      errors.email = "郵件地址不能為空";
    } else if (!isValidEmail(data.email)) {
      errors.email = "請輸入有效的郵件地址";
    }
    if (!data.fullname) {
      errors.fullname = "姓名不能為空";
    }
    if (!data.password) {
      errors.password = "密碼不能為空";
    }

    console.log('error',errors);
    
   
    if (!errors) {
      setIsDisabled(false);
    }
    return errors;
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

   useEffect(() => {
     if (localStorage.getItem("email") != null) {
       router.push("/member");
     }
   }, []);


  return (
    <>
      <div className="contactus-page">
        <Head>
          <title>註冊</title>
        </Head>
        <Navbar />
        <MenuBar />
        <Breadcrumb data={"註冊"} />
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          style={{
            position: "absolute",
            top: 200,
            right: 20,
          }}
        >
          <Toast.Header></Toast.Header>
          <Toast.Body>{toastContent}</Toast.Body>
        </Toast>
        <form onSubmit={signup} className="form-area contact-us">
          <div className="block-title">註冊</div>
          <div className="red-word">*必須填寫</div>
          <div className="">
            <label htmlFor="fullname" className="form-label">
              姓名<span className="red-word">*</span>
            </label>
            <input
              type="fullname"
              className="form-control"
              id="fullname"
              name="fullname"
              aria-describedby="fullname"
              value={formData.fullname}
              onChange={handleChange}
            ></input>
          </div>
          {errors.fullname && <div className="red-word">{errors.fullname}</div>}

          <div className="">
            <label htmlFor="nickname" className="form-label">
              暱稱
            </label>
            <input
              type="text"
              className="form-control"
              id="nickname"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
            ></input>
          </div>
          <div className="">
            <label htmlFor="email" className="form-label">
              電郵 <span className="red-word">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              aria-describedby="email"
              value={formData.email}
              onChange={handleChange}
            ></input>
          </div>
          {errors.email && <div className="red-word">{errors.email}</div>}

          <div className="">
            <label htmlFor="current-password" className="form-label">
              密碼 <span className="red-word">*</span>
            </label>
            <input
              type="password"
              autocomplete="on"
              className="form-control"
              id="password"
              name="password"
              aria-describedby="current-password"
              value={formData.password}
              onChange={handleChange}
            ></input>
          </div>
          {errors.password && <div className="red-word">{errors.password}</div>}
          <div className="button-group">
            <Link href="/" className="btn cancel-btn info-site-btn">
              取消
            </Link>
            <button
              disabled={isDisabled}
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

export default Signup;
