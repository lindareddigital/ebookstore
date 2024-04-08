import Navbar from "src/pages/components/molecules/Navbar";
import MenuBar from "src/pages/components/molecules/MenuBar";
import Breadcrumb from "src/pages/components/molecules/Breadcrumb";

export default function ContactUs() {
  return (
    <div className="contactus-page">
      <Navbar />
      <MenuBar />
      <Breadcrumb data={"聯絡我們"} />
      <form className="form-area contact-us">
        <div className="block-title">聯絡我們</div>
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
            暱稱
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
            類型 <span className="red-word">*</span>
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          ></input>
        </div>
        <div className="">
          <label className="" htmlFor="floatingSelect">
            主旨
          </label>

          <select
            className="form-select"
            id="floatingSelect"
            aria-label="Floating label select example"
          >
            <option>1.書籍意見</option>
            <option value="2">2.異業合作</option>
            <option value="3">3.帳號問題</option>
            <option value="4">4.購書問題</option>
            <option value="5">5.網站問題</option>
            <option value="6">6.我要投稿</option>
            <option value="7">7.其他</option>
          </select>
        </div>

        <div className="">
          <label className="" htmlFor="floatingTextarea2">
            內容<span className="red-word">*</span>
            <div className="sub-word">(字數150字以內)</div>
          </label>
          <textarea
            className="form-control form-comments"
            placeholder="Leave a comment here"
            id="floatingTextarea2"
          ></textarea>
        </div>

        <div className="">
          <label htmlFor="formFile" className="form-label">
            附件
            <span className="red-word">*</span>
            <div className="sub-word">(請上傳JPG圖檔)</div>
          </label>
          <input className="form-control" type="file" id="formFile"></input>
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

export const getServerSideProps = async () => {
  const siteMenu = await apiManager.getSiteMenu();
  return { props: { siteMenu } };
};



