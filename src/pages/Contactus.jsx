import Navbar from "src/pages/components/molecules/Navbar";
import MenuBar from "src/pages/components/molecules/MenuBar";
import Breadcrumb from "src/pages/components/molecules/Breadcrumb";
import { useEffect, useState } from "react";
import { createDirectus, rest, createItem } from "@directus/sdk";
import Head from "next/head";
import { z } from "zod";
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

  // 读取文件并将其转换为 Base64 字符串
  function readFileAsBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]); // 忽略前缀 data:image/png;base64,
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

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

    const fileInput = event.currentTarget.querySelector("#formFile");
    const selectedFiles = fileInput.files;
    const picData = new FormData(); // 创建 FormData 对象

    let filesDataArray = [];

    if (selectedFiles && selectedFiles.length > 0) {
      for (let i = 0; i < selectedFiles.length; i++) {
        const selectedFile = selectedFiles[i];

        const allowedExtensions = [".docx", ".doc", ".jpg", ".jpeg", ".png"];
        const fileExtension = selectedFile.name.split(".").pop().toLowerCase();

        if (!allowedExtensions.includes(`.${fileExtension}`)) {
          console.log(
            `文件 ${selectedFile.name} 的类型无效，请选择有效的文件类型。`
          );
          return;
        }

        const base64String = await readFileAsBase64(selectedFile);

        const fileData = {
          filename: selectedFile.name,
          type: selectedFile.type,
          size: selectedFile.size,
          data: base64String,
        };

        filesDataArray.push(fileData);
        picData.append("files", fileData);

        console.log("文件信息:", fileData);
      }
    } else {
      console.log("未选择任何文件。");
    }

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
          ...(filesDataArray && { attachment: filesDataArray }),
        }),
      }
    );

    // const res = await fetch(
    //   "https://directus-cms.vicosys.com.hk/items/contact_form",
    //   {
    //     method: "POST",
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "Content-Type": "multipart/form-data",
    //     },
    //     body: picData,
    //     // JSON.stringify({
    //     // email,
    //     // fullname,
    //     // phone,
    //     // nickname,
    //     // type,
    //     // content,
    //     // ...(picData && { attachment: picData }),
    //     // }),
    //   }
    // );


    const res = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
      }),
    });

    // const test = await directus.files.createOne(formData);

  
   
    // formData.append("file", fileInput.files[0]);



    const file = await directus.files.createOne(picData);

    await directus.items("contact_form").createOne({
      email: email,
      phone: phone,
      fullname: fullname,
      nickname: nickname,
      type: type,
      content: content,
      // // for singe file field
      file: file.id,
      // // for multiple files field
      // file: [file.id],
      attachment: filesDataArray,
    });

    

   

    const data = await response.json();
    // const ddata = await res.json();
    console.log("data", data);
    // console.log("ddata", ddata);
  };

  // 处理输入框值变化
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
        <title>{"聯絡我們"}</title>
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
            <span className="red-word">*</span>
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



