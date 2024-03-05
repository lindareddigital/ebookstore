


export default function Info() {
  return (
    <>
      <form class="info contact-us">
        <div class="">
          <label htmlFor="exampleInputEmail1" class="form-label">
            姓名*
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
            電郵 *
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
            手機 *
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

        <button type="submit" class="info-site-btn btn">
          確認
        </button>
      </form>
    </>
  );
}
