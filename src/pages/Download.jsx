import Navbar from "src/pages/components/molecules/Navbar";
import MenuBar from "src/pages/components/molecules/MenuBar";
import Breadcrumb from "src/pages/components/molecules/Breadcrumb";

export default function Download({}) {
  return (
    <div className="contactus-page">
      <Navbar />
      <MenuBar />
      <Breadcrumb data={"書單下載"} />
      <div className="">
        <div className="download form-area">
          <div className="block-title">
            <div className="dot"></div>書單下載
          </div>

          <div className="">
            <div className="input-group">
              <input
                placeholder="大邑文化書單"
                className="form-control"
                type="text"
              ></input>
              <button className="search-btn" type="submit">
                <img src="/icons/download.svg"></img>
                下載
              </button>
            </div>
          </div>
          <div className="">
            <div className="input-group">
              <input
                placeholder="海濱圖書書單"
                className="form-control"
                type="text"
              ></input>
              <button className="search-btn" type="submit">
                <img src="/icons/download.svg"></img>
                下載
              </button>
            </div>
          </div>
          <div className="">
            <div className="input-group">
              <input
                placeholder="海濱圖書書單"
                className="form-control"
                type="text"
              ></input>
              <button className="search-btn" type="submit">
                <img src="/icons/download.svg"></img>
                下載
              </button>
            </div>
          </div>

          <div className="block-title">
            <div className="dot"></div>教案下載
          </div>

          <div className="">
            <div className="input-group">
              <input
                placeholder="大邑文化書單"
                className="form-control"
                type="text"
              ></input>
              <button className="search-btn" type="submit">
                <img src="/icons/download.svg"></img>
                下載
              </button>
            </div>
          </div>
          <div className="">
            <div className="input-group">
              <input
                placeholder="海濱圖書書單"
                className="form-control"
                type="text"
              ></input>
              <button className="search-btn" type="submit">
                <img src="/icons/download.svg"></img>
                下載
              </button>
            </div>
          </div>
          <div className="">
            <div className="input-group">
              <input
                placeholder="海濱圖書書單"
                className="form-control"
                type="text"
              ></input>
              <button className="search-btn" type="submit">
                <img src="/icons/download.svg"></img>
                下載
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
