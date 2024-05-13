import { useState, useEffect } from "react";

export default function Info({ info }) {
  // console.log(info);

   const [localInfo, setLocalInfo] = useState(info);

  // 當 info props 改變時，更新 localInfo
  useEffect(() => {
    setLocalInfo(info);
  }, [info]);

  // 更新 info 物件的屬性
  const handleChange = (key, value) => {
    setLocalInfo({
     ...localInfo,
      [key]: value,
    });
  };

    // const errors = validateForm({ ...formData, [name]: value });
    // setErrors(errors);
    // setIsDisabled(Object.keys(errors).length > 0);




  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const fullname = formData.get("fullname");
    const email = formData.get("email");
    const birth = formData.get("birth");
    const phone = formData.get("phone");
    const location = formData.get("location");
    const id = localStorage.getItem("id");

    const response = await fetch(`/api/auth/patchInfo`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        fullname,
        birth,
        phone,
        location,
        id
      }),
    });

    const res = await response.json();
    console.log(res);
   
  };

  return (
    <>
      <form onSubmit={onSubmit} className="info contact-us">
        <div className="block-title">
          <div className="dot"></div>會員資料管理
        </div>
        <div className="red-word">*必須填寫</div>
        <div className="">
          <label htmlFor="name" className="form-label">
            姓名<span className="red-word">*</span>
          </label>
          <input
            value={localInfo?.first_name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
            type="fullname"
            className="form-control"
            id="fullname"
            name="fullname"
            aria-describedby="fullname"
          ></input>
        </div>
        <div className="">
          <label htmlFor="birth" className="form-label">
            生日
          </label>
          <input
            value={localInfo?.birth || ""}
            onChange={(e) => handleChange("birth", e.target.value)}
            type="text"
            className="form-control"
            id="birth"
            name="birth"
          ></input>
        </div>
        <div className="">
          <label htmlFor="email" className="form-label">
            電郵 <span className="red-word">*</span>
          </label>
          <input
            value={localInfo?.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="email"
          ></input>
        </div>
        <div className="">
          <label htmlFor="phone" className="form-label">
            手機 <span className="red-word">*</span>
          </label>
          <input
            value={localInfo?.phone || ""}
            onChange={(e) => handleChange("phone", e.target.value)}
            type="phone"
            className="form-control"
            id="phone"
            name="phone"
            aria-describedby="phone"
          ></input>
        </div>
        <div className="">
          <label htmlFor="location" className="form-label">
            地址
          </label>
          <input
            value={localInfo?.location || ""}
            onChange={(e) => handleChange("location", e.target.value)}
            type="location"
            className="form-control"
            id="location"
            name="location"
            aria-describedby="location"
          ></input>
        </div>
        <div className="">
          <button type="button" className="btn cancel-btn info-site-btn">
            取消
          </button>
          <button type="submit" className="info-site-btn btn">
            確認
          </button>
        </div>
      </form>
    </>
  );
}
