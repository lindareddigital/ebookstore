import Link from 'next/link';
import InnerHTML from "src/components/atoms/InnerHTML";

export default function Desc({ item }) {
  // console.log("678", item);
  
  return (
    <>
      <div className="container-fluid fdc">
        <nav className="container-fluid">
          <div
            className="nav nav-tabs more-nav-tabs"
            id="nav-tab"
            role="tablist"
          >
            <img className="topright" src="/icons/leftboxicon.svg"></img>
            <button
              className="nav-link active"
              id="nav-description-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-description"
              type="button"
              role="tab"
              aria-controls="nav-description"
              aria-selected="true"
            >
              內容簡介
            </button>
            <button
              className="nav-link"
              id="nav-Author-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-Author"
              type="button"
              role="tab"
              aria-controls="nav-Author"
              aria-selected="false"
            >
              作者介紹
            </button>
            <button
              className="nav-link"
              id="nav-list-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-list"
              type="button"
              role="tab"
              aria-controls="nav-list"
              aria-selected="false"
            >
              目錄
            </button>
            <button
              className="nav-link"
              id="nav-format-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-format"
              type="button"
              role="tab"
              aria-controls="nav-format"
              aria-selected="false"
            >
              規格
            </button>
            <button
              className="nav-link"
              id="nav-more-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-more"
              type="button"
              role="tab"
              aria-controls="nav-more"
              aria-selected="false"
            >
              延伸內容
            </button>
          </div>
        </nav>
        <div className="detail-area" id="nav-tabContent">
          <div
            className="tab-pane show active"
            id="nav-description"
            role="tabpanel"
            aria-labelledby="nav-description-tab"
          >
            <InnerHTML text={item.description} className="" />
          </div>
          <div
            className="tab-pane"
            id="nav-Author"
            role="tabpanel"
            aria-labelledby="nav-Author-tab"
          >
            {item.Author}
          </div>
          <div
            className="tab-pane"
            id="nav-list"
            role="tabpanel"
            aria-labelledby="nav-list-tab"
          >
            <InnerHTML text={item.table_of_contents} className="" />
          </div>
          <div
            className="tab-pane"
            id="nav-format"
            role="tabpanel"
            aria-labelledby="nav-format-tab"
          >
            規格:{item.format}
            <br />
            書號:{item.book_number}
            <br />
            語言:{item.Language}
            <br />
            ISBN:{item.isbn}
            <br />
            規格:{item.binding_layout}
            <br />
          </div>
          <div
            className="tab-pane"
            id="nav-more"
            role="tabpanel"
            aria-labelledby="nav-more-tab"
          >
            {item.Author}
            {/* <InnerHTML text={item.Author} className="" /> */}
          </div>
        </div>
      </div>
    </>
  );
}
