import Navbar from "src/pages/components/molecules/Navbar";
import MenuBar from "src/pages/components/molecules/MenuBar";
import Breadcrumb from "src/pages/components/molecules/Breadcrumb";

export default function Contactus() {
  return (
    <div class="contactus-page">
      <Navbar />
      <MenuBar />
      <Breadcrumb />
      <form class="contact-us">
        <div className="block-title">聯絡我們</div>
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
            暱稱
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
            類型 <span className="red-word">*</span>
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          ></input>
        </div>
        <div class="">
          <label class="" htmlFor="floatingSelect">
            主旨
          </label>

          <select
            class="form-select"
            id="floatingSelect"
            aria-label="Floating label select example"
          >
            <option selected>1.書籍意見</option>
            <option value="2">2.異業合作</option>
            <option value="3">3.帳號問題</option>
            <option value="4">4.購書問題</option>
            <option value="5">5.網站問題</option>
            <option value="6">6.我要投稿</option>
            <option value="7">7.其他</option>
          </select>
        </div>

        <div class="">
          <label class="" htmlFor="floatingTextarea2">
            內容<span className="red-word">*</span>
            <div className="sub-word">(字數150字以內)</div>
          </label>
          <textarea
            class="form-control form-comments"
            placeholder="Leave a comment here"
            id="floatingTextarea2"
          ></textarea>
        </div>

        <div class="">
          <label htmlFor="formFile" class="form-label">
            附件
            <span className="red-word">*</span>
            <div className="sub-word">(請上傳JPG圖檔)</div>
          </label>
          <input class="form-control" type="file" id="formFile"></input>
        </div>
        <div class="">
          <button type="submit" class="btn info-site-btn">
            取消
          </button>
          <button type="submit" class="btn info-site-btn">
            確認傳送
          </button>
        </div>
      </form>
    </div>
  );
}
