


export default function Info() {
  return (
    <>
      <form className="info contact-us">
        <div className="block-title">
          <div class="dot"></div>會員資料管理
        </div>
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
            生日
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
            手機 <span className="red-word">*</span>
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
            地址
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          ></input>
        </div>
        <div className="">
          <button type="submit" className="btn cancel-btn info-site-btn">
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
