


export default function Info() {
  return (
    <>
      <form class="info contact-us">
        <div className="block-title">會員資料管理</div>
        <div className="red-word">*必須填寫</div>
        <div class="">
          <label htmlFor="exampleInputEmail1" class="form-label">
            姓名<span className="red-word">*</span>
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          ></input>
        </div>
        <div class="">
          <label htmlFor="exampleInputPassword1" class="form-label">
            生日
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
          ></input>
        </div>
        <div class="">
          <label htmlFor="exampleInputEmail1" class="form-label">
            電郵 <span className="red-word">*</span>
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          ></input>
        </div>
        <div class="">
          <label htmlFor="exampleInputEmail1" class="form-label">
            手機 <span className="red-word">*</span>
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          ></input>
        </div>
        <div class="">
          <label htmlFor="exampleInputEmail1" class="form-label">
            地址
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          ></input>
        </div>
        <div class="">
          <button type="submit" class="btn cancel-btn info-site-btn">
            取消
          </button>
          <button type="submit" class="info-site-btn btn">
            確認
          </button>
        </div>
      </form>
    </>
  );
}
