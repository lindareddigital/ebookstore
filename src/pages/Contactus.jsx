import Navbar from "src/pages/components/molecules/Navbar";
import MenuBar from "src/pages/components/molecules/MenuBar";
import Breadcrumb from "src/pages/components/molecules/Breadcrumb";
import { useEffect, useState } from "react";
import Head from "next/head";
import Toast from "react-bootstrap/Toast";

import {
  createDirectus,
  rest,
  staticToken,
  uploadFiles,
} from "@directus/sdk";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    email: "",
    title: "",
    fullname: "",
    content:"",
  });
  const [showToast, setShowToast] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (localStorage.getItem("email") == null) {
      location.replace(`/login`);
    }
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);     

    const email = formData.get("email");
    const phone = formData.get("phone");
    const fullname = formData.get("fullname");
    const nickname = formData.get("nickname");
    const type = formData.get("type");
    const content = formData.get("content");

    const client = createDirectus("https://directus-cms.vicosys.com.hk")
      .with(rest())
      .with(staticToken(process.env.NEXT_PUBLIC_TOKEN));

    const fileInput = document.querySelector("#formFile");

    // 有檔案才上傳
    if (fileInput.files.length > 0) {
      const picData = new FormData();
      for (const file of fileInput.files) {
        picData.append("files", file);
      }
      const result = await client.request(uploadFiles(picData));
      console.log("result", result);

      let ids = [];

      if (Array.isArray(result)) {
        ids = result.map((item) => item.id);
      } else if (typeof result === "object" && result.id) {
        ids.push(result.id);
      }

      console.log("ids:", ids);

      var transformedArray = ids.map((id) => ({
        directus_files_id: {
          id: id,
        },
      }));
    }

    //  console.log(transformedArray);

    let token = localStorage.getItem("token");

    const response = await fetch(
      "https://directus-cms.vicosys.com.hk/items/contact_form",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          fullname,
          phone,
          nickname,
          type,
          content,
        }),
      }
    );

    const data = await response.json();
    console.log("pass form success", data.data.id);
    setShowToast(true);
    const id = data.data.id

    // 有檔案才把檔案放進form
    if (fileInput.files.length > 0) {
      const patchForm = await fetch("/api/patchForm", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          token,
          id,
          transformedArray 
        }),
      });

      console.log("patchForm success", patchForm);
    }
    
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    }
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
    if (!data.title) {
      errors.title = "主旨不能為空";
    }
    if (!data.content) {
      errors.content = "內容不能為空";
    }
    return errors;
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div className="contactus-page">
      <Head>
        <title>聯絡我們</title>
      </Head>
      <Navbar />
      <MenuBar />
      <Breadcrumb data={"聯絡我們"} />
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        // delay={3000}
        // autohide
        style={{
          position: "absolute",
          top: 200,
          right: 20,
        }}
      >
        <Toast.Header>
        </Toast.Header>
        <Toast.Body>表單傳送成功！</Toast.Body>
      </Toast>

      <form onSubmit={onSubmit} className="form-area contact-us">
        <div className="block-title">聯絡我們</div>
        <div className="red-word">*必須填寫</div>
        <div className="">
          <label htmlFor="fullname" className="form-label">
            姓名<span className="red-word">*</span>
          </label>
          <input
            name="fullname"
            type="text"
            className="form-control"
            id="fullname"
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
            name="nickname"
            type="text"
            className="form-control"
            id="nickname"
          ></input>
        </div>
        <div className="">
          <label htmlFor="email" className="form-label">
            電郵 <span className="red-word">*</span>
          </label>
          <input
            name="email"
            type="text"
            className="form-control"
            id="email"
            aria-describedby="email"
            value={formData.email}
            onChange={handleChange}
          ></input>
        </div>
        {errors.email && <div className="red-word">{errors.email}</div>}

        <div className="">
          <label className="" htmlFor="floatingSelect">
            類型 <span className="red-word">*</span>
          </label>

          <select
            name="type"
            className="form-select"
            id="floatingSelect"
            aria-label="Floating label select"
          >
            <option value="1.書籍意見">1.書籍意見</option>
            <option value="2.異業合作">2.異業合作</option>
            <option value="3.帳號問題">3.帳號問題</option>
            <option value="4.購書問題">4.購書問題</option>
            <option value="5.網站問題">5.網站問題</option>
            <option value="6.我要投稿">6.我要投稿</option>
            <option value="7.其他">7.其他</option>
          </select>
        </div>

        <div className="">
          <label htmlFor="title" className="form-label">
            主旨 <span className="red-word">*</span>
          </label>
          <input
            name="title"
            type="text"
            className="form-control"
            id="title"
            aria-describedby="title"
            value={formData.title}
            onChange={handleChange}
          ></input>
        </div>
        {errors.title && <div className="red-word">{errors.title}</div>}

        <div className="">
          <label className="" htmlFor="content">
            內容<span className="red-word">*</span>
            <div className="sub-word">(字數150字以內)</div>
          </label>
          <textarea
            name="content"
            className="form-control form-comments"
            id="content"
            value={formData.content}
            onChange={handleChange}
          ></textarea>
        </div>
        {errors.content && <div className="red-word">{errors.content}</div>}

        <div className="">
          <label htmlFor="formFile" className="form-label">
            附件
            <div className="sub-word">(請上傳 docx.doc.jpg.jpeg.png 格式)</div>
          </label>

          <input
            className="form-control"
            accept=".docx, .doc, .jpg, .jpeg, .png"
            type="file"
            id="formFile"
            placeholder="請上傳 docx.doc.jpg.jpeg.png 格式"
            multiple
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
  );
}



