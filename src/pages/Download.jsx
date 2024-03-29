import Navbar from "src/pages/components/molecules/Navbar";
import MenuBar from "src/pages/components/molecules/MenuBar";
import Breadcrumb from "src/pages/components/molecules/Breadcrumb";

export default function Download({ siteMenu }) {
  return (
    <div className="contactus-page">
      <Navbar siteMenu={siteMenu} />
      <MenuBar siteMenu={siteMenu} />
      <Breadcrumb data={"書單下載"} />
      <form className="download form-area">
        <div className="block-title">書單下載</div>

        <div className="">
          <form className="input-group">
            <input
              placeholder="大邑文化書單"
              className="form-control"
              type="text"
            ></input>
            <button className="search-btn" type="submit">
              <img src="/icons/download.svg"></img>
              下載
            </button>
          </form>
        </div>
        <div className="">
          <form className="input-group">
            <input
              placeholder="海濱圖書書單"
              className="form-control"
              type="text"
            ></input>
            <button className="search-btn" type="submit">
              <img src="/icons/download.svg"></img>
              下載
            </button>
          </form>
        </div>
        <div className="">
          <form className="input-group">
            <input
              placeholder="海濱圖書書單"
              className="form-control"
              type="text"
            ></input>
            <button className="search-btn" type="submit">
              <img src="/icons/download.svg"></img>
              下載
            </button>
          </form>
        </div>

        <div className="block-title">教案下載</div>

        <div className="">
          <form className="input-group">
            <input
              placeholder="大邑文化書單"
              className="form-control"
              type="text"
            ></input>
            <button className="search-btn" type="submit">
              <img src="/icons/download.svg"></img>
              下載
            </button>
          </form>
        </div>
        <div className="">
          <form className="input-group">
            <input
              placeholder="海濱圖書書單"
              className="form-control"
              type="text"
            ></input>
            <button className="search-btn" type="submit">
              <img src="/icons/download.svg"></img>
              下載
            </button>
          </form>
        </div>
        <div className="">
          <form className="input-group">
            <input
              placeholder="海濱圖書書單"
              className="form-control"
              type="text"
            ></input>
            <button className="search-btn" type="submit">
              <img src="/icons/download.svg"></img>
              下載
            </button>
          </form>
        </div>
      </form>
    </div>
  );
}

export const getServerSideProps = async () => {

  const siteMenu = await apiManager.getSiteMenu();

  return { props: { siteMenu } };
};
