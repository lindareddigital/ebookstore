import Navbar from "src/pages/components/molecules/Navbar";
import MenuBar from "src/pages/components/molecules/MenuBar";
import Breadcrumb from "src/pages/components/molecules/Breadcrumb";
import { useEffect, useState } from "react";
import Head from "next/head";
import { z } from "zod";
import {
  createDirectus,
  rest,
  utilsImport,
  staticToken,
  uploadFiles,
} from "@directus/sdk";
import apiManager from "src/pages/api/api";
import { Directus } from "@directus/sdk";


export const signUpFormSchema = z.object({
  email: z.string().email({ message: "錯誤的信箱格式" }),
  // password: z.string().min(8, {
  //   message: "密碼最短需要8個字符",
  // }),
});

export default function ContactUs() {
  const [formData, setFormData] = useState({
    email: "",
    // password: "",
  });
  const [errors, setErrors] = useState({});

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const email = formData.get("email");
    const phone = formData.get("phone");
    const fullname = formData.get("fullname");
    const nickname = formData.get("nickname");
    const type = formData.get("type");
    const content = formData.get("content");

    try {
      // 验证表单数据
      signUpFormSchema.parse(formData);

      // 如果数据验证通过，这里可以执行提交逻辑
      console.log("Form data:", formData);
    } catch (error) {
      // 如果数据验证失败，更新错误状态
      if (error instanceof z.ZodError) {
        const fieldErrors = {};
        error.errors.forEach((err) => {
          const fieldName = err.path.join(".");
          fieldErrors[fieldName] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        console.error("Validation error:", error);
      }
    }

    const client = createDirectus("https://directus-cms.vicosys.com.hk")
      .with(rest())
      .with(staticToken(process.env.NEXT_PUBLIC_TOKEN));

    const fileInput = document.querySelector("#formFile");

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

     const transformedArray = ids.map((id) => ({
       directus_files_id: {
         id: id,
       },
     }));

     console.log(transformedArray);

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
    console.log("data", data.data.id);

    const id = data.data.id

    const patchForm = await fetch("/api/patchForm", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        token,
        id,
        transformedArray 
      }),
    });

    console.log("patchForm", patchForm);
    
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="contactus-page">
      <Head>
        <title>聯絡我們</title>
      </Head>
      <Navbar />
      <MenuBar />
      <Breadcrumb data={"聯絡我們"} />
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
          ></input>
        </div>
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
          {/* {errors.email && <div className="error-message">{errors.email}</div>} */}
        </div>
        <div className="">
          <label htmlFor="phone" className="form-label">
            phone <span className="red-word">*</span>
          </label>
          <input
            name="phone"
            type="text"
            className="form-control"
            id="phone"
            aria-describedby="phone"
          ></input>
        </div>
        <div className="">
          <label className="" htmlFor="floatingSelect">
            主旨
          </label>

          <select
            name="type"
            className="form-select"
            id="floatingSelect"
            aria-label="Floating label select example"
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
          <label className="" htmlFor="content">
            內容<span className="red-word">*</span>
            <div className="sub-word">(字數150字以內)</div>
          </label>
          <textarea
            name="content"
            className="form-control form-comments"
            placeholder="Leave a comment here"
            id="content"
          ></textarea>
        </div>

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
            multiple
          ></input>
        </div>
        <div className="button-group">
          <button
            type="submit"
            className="btn cancel-btn info-site-btn"
          >
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



