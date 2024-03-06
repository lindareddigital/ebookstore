import Navbar from "src/pages/components/molecules/Navbar";
import MenuBar from "src/pages/components/molecules/MenuBar";
import Breadcrumb from "src/pages/components/molecules/Breadcrumb";

export default function Download() {
  return (
    <div class="contactus-page">
      <Navbar />
      <MenuBar />
      <Breadcrumb />
      <form class="download form-area">
        <div className="block-title">書單下載</div>

        <div class="">
          <form class="input-group">
            <input
              placeholder="大邑文化書單"
              class="form-control"
              type="text"
            ></input>
            <button class="search-btn" type="submit">
              <img src="/icons/download.svg"></img>
              下載
            </button>
          </form>
        </div>
        <div class="">
          <form class="input-group">
            <input
              placeholder="海濱圖書書單"
              class="form-control"
              type="text"
            ></input>
            <button class="search-btn" type="submit">
              <img src="/icons/download.svg"></img>
              下載
            </button>
          </form>
        </div>
        <div class="">
          <form class="input-group">
            <input
              placeholder="海濱圖書書單"
              class="form-control"
              type="text"
            ></input>
            <button class="search-btn" type="submit">
              <img src="/icons/download.svg"></img>
              下載
            </button>
          </form>
        </div>

        <div className="block-title">教案下載</div>

        <div class="">
          <form class="input-group">
            <input
              placeholder="大邑文化書單"
              class="form-control"
              type="text"
            ></input>
            <button class="search-btn" type="submit">
              <img src="/icons/download.svg"></img>
              下載
            </button>
          </form>
        </div>
        <div class="">
          <form class="input-group">
            <input
              placeholder="海濱圖書書單"
              class="form-control"
              type="text"
            ></input>
            <button class="search-btn" type="submit">
              <img src="/icons/download.svg"></img>
              下載
            </button>
          </form>
        </div>
        <div class="">
          <form class="input-group">
            <input
              placeholder="海濱圖書書單"
              class="form-control"
              type="text"
            ></input>
            <button class="search-btn" type="submit">
              <img src="/icons/download.svg"></img>
              下載
            </button>
          </form>
        </div>
      </form>
    </div>
  );
}
