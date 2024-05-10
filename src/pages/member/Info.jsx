import { useState } from "react";

export default function Info({ info }) {
  console.log(info);

  const [formData, setFormData] = useState({
    email: "",
    title: "",
    fullname: "",
    birth: "",
    phone: "",
    location: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // const errors = validateForm({ ...formData, [name]: value });
    // setErrors(errors);
    // setIsDisabled(Object.keys(errors).length > 0);
  };

  return (
    <>
      <form className="info contact-us">
        <div className="block-title">
          <div className="dot"></div>會員資料管理
        </div>
        <div className="red-word">*必須填寫</div>
        <div className="">
          <label htmlFor="name" className="form-label">
            姓名<span className="red-word">*</span>
          </label>
          <input
            value={info?.first_name}
            onChange={handleChange}
            type="fullname"
            className="form-control"
            id="fullname"
            aria-describedby="fullname"
          ></input>
        </div>
        <div className="">
          <label htmlFor="birth" className="form-label">
            生日
          </label>
          <input
            value={info?.status}
            onChange={handleChange}
            type="birth"
            className="form-control"
            id="birth"
          ></input>
        </div>
        <div className="">
          <label htmlFor="email" className="form-label">
            電郵 <span className="red-word">*</span>
          </label>
          <input
            value={info?.email}
            onChange={handleChange}
            type="email"
            className="form-control"
            id="email"
            aria-describedby="email"
          ></input>
        </div>
        <div className="">
          <label htmlFor="phone" className="form-label">
            手機 <span className="red-word">*</span>
          </label>
          <input
            value={info?.phone}
            onChange={handleChange}
            type="phone"
            className="form-control"
            id="phone"
            aria-describedby="phone"
          ></input>
        </div>
        <div className="">
          <label htmlFor="location" className="form-label">
            地址
          </label>
          <input
            value={info?.location}
            onChange={handleChange}
            type="location"
            className="form-control"
            id="location"
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
