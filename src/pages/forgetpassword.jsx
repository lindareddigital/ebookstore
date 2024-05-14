import useSWR from "swr";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "src/components/molecules/Navbar";
import MenuBar from "src/components/molecules/MenuBar";
import Breadcrumb from "src/components/molecules/Breadcrumb";
import Head from "next/head";
import Link from "next/link";
import Toast from "react-bootstrap/Toast";
import { isValidEmail } from "src/utilities/tool.js";
import { createDirectus,passwordRequest,rest,staticToken } from "@directus/sdk";

function Forgetpassword() {

  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastContent, setToastContent] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  const signup = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    // const password = formData.get("password");

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setShowToast(true);

    if (response.ok) {
      const data = await response.json();
      setToastContent("一封包含密碼重設連結的郵件已發送至您的電子郵件信箱！");
      router.push("/member/info");

      // localStorage.setItem("token", data.data.access_token);
    } else {
      setToastContent("更改失敗！");
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

    if (name === "confirmPassword") {
      setPasswordMatch(formData.password === value);
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.email) {
      errors.email = "郵件地址不能為空";
    } else if (!isValidEmail(data.email)) {
      errors.email = "請輸入有效的郵件地址";
    }
    // if (!data.password) {
    //   errors.password = "密碼不能為空";
    // }
    // if (!data.confirmPassword) {
    //   errors.confirmPassword = "密碼不能為空";
    // }

    // console.log("error", errors);

    if (!errors) {
      setIsDisabled(false);
    }
    return errors;
  };

  useEffect(() => {
    if (localStorage.getItem("email") != null) {
      router.push("/member/info");
    }
  }, []);

  return (
    <>
      <div className="contactus-page">
        <Head>
          <title>忘記密碼</title>
        </Head>
        <Navbar />
        <MenuBar />
        <Breadcrumb data={"忘記密碼"} />
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
          <div className="block-title">忘記密碼</div>
          <div className="red-word">*必須填寫</div>
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
              新密碼 <span className="red-word">*</span>
            </label>
            <input
              type="password"
              className="form-control"
              autoComplete="on"
              id="password"
              name="password"
              aria-describedby="current-password"
              value={formData.password}
              onChange={handleChange}
            ></input>
          </div>
          {errors.password && <div className="red-word">{errors.password}</div>}

          <div className="">
            <label htmlFor="current-password" className="form-label">
              確認新密碼 <span className="red-word">*</span>
            </label>
            <input
              type="password"
              autoComplete="on"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              aria-describedby="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            ></input>
          </div>
          {errors.confirmPassword && (
            <div className="red-word">{errors.confirmPassword}</div>
          )}
          {!passwordMatch && <div className="red-word">確認密碼錯誤</div>}

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


export default Forgetpassword;
