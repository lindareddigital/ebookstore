import { cache } from 'react';
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Link from 'next/link';
import GridList from "./GridList";
import ListList from "./ListList";
import SidebarWrapper from 'src/pages/components/SidebarWrapper';
import MenuBar from 'src/pages/components/molecules/MenuBar';
import ListAside from 'src/pages/components/molecules/ListAside';
import Navbar from "src/pages/components/molecules/Navbar";
import Panel from "src/pages/components/atoms/Panel";
import { useRouter } from "next/router";
import Pagination from "react-bootstrap/Pagination";
import { useGlobalStore } from "src/pages/store/global.store";

export default function Listing() {
  const [panel, setPanel] = useState(false);
  const [siteMenu, setSiteMenu] = useState(null);
  const [books, setBooks] = useState(null);
  const [length, setLength] = useState(30);
  // const obj = useGlobalStore((state) => state.obj);
  const [myObject, setMyObject] = useState({
    sort: ["-date_created"],
    page: 1,
    arr: []
  });

  const [currentView, setCurrentView] = useState("grid");
  const router = useRouter();
  const { query } = router;

  if (query) {
    // console.log(query.slug);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/sitemenu/publisher/polis-press");
        const siteMenu = await res.json();
        setSiteMenu(siteMenu.result.site_menu);
        // console.log("siteMenu", siteMenu);

        getBooks();
      } catch (error) {
        console.error("获取数据时出错：", error);
      }
    };

    fetchData();
  }, []);

  const Paginations = () => {
    // console.log('length',length);

    const pageNumbers = [];
    const length = books?.result?.product_aggregated[0]?.count?.id;

    if (Number(length)) {
      for (let i = 1; i <= Math.ceil(length / 10); i++) {
        pageNumbers.push(
          <Pagination.Item
            onClick={() => {
              setMyObject((prev) => ({
                ...prev,
                page: i,
              }));
              filterBooks();
            }}
            key={i}
            active={i === myObject.page}
          >
            {i}
          </Pagination.Item>
        );
      }
      return (
        <Pagination>
          <Pagination.Prev />
          {pageNumbers}
          <Pagination.Next />
        </Pagination>
      );
    }
  };

  // const paginate = async (page) => {
  //   const publisher = "大邑文化";
  //   const params = new URLSearchParams();
  //   params.append("page", page);

  //   const url = `${window.location.href}?${params.toString()}`;



  //   const response = await fetch(url);

  //   const books = await response.json();
  //   setBooks(books.result.product);
  //   console.log("books", books);
  // };

  const sendDataToParent = (data) => {
    console.log("Data from ListAside:", data);
    filterBooks(data);
  };

  const getBooks = async () => {
    // console.log(event.target.value);

    const response = await fetch("/api/product/publisher/大邑文化");
    const books = await response.json();
    setBooks(books.result.product);
    console.log("books", books);
    const length = books.result.product_aggregated[0].count.id;
    setLength(length);
  };

  const filterByCategory = async (arr) => {
    console.log("arr filterByCategory", arr, myObject);
    const response = await fetch("/api/product/category/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sort: myObject.sort,
        page: myObject.page,
        category_id: myObject.arr,
      }),
    });
    const books = await response.json();
    setBooks(books?.result?.product);
    console.log("filterByCategory", books?.result?.product);
  };

  const filterBySeries = async () => {
    console.log(myObject);
    
    const response = await fetch("/api/product/series", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sort: myObject.sort,
        page: myObject.page,
        series_tags: myObject.arr,
      }),
    });
    const books = await response.json();
    setBooks(books?.result?.product);
  };

  const filterBooks = async (obj) => {

    console.log('obj',obj);
    
    
    if(obj?.[0] && obj?.[0].hasOwnProperty("category_id")){
      const arr = obj.map((item) => item.category_id.id);
      console.log("arr", arr);

      setMyObject((prev) => ({
        ...prev,
        arr: [arr],
      }));
      console.log("myObject", myObject);
      filterByCategory();
    }else{
      setMyObject((prev) => ({
        ...prev,
        arr: [obj],
      }));
      console.log("filterBySeries", myObject);
      filterBySeries(); 
    }

  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const closePanel = () => {
    setPanel(false);
  };

  const openPanel = () => {
    setPanel(true);
  };

  // return null

  return (
    <div className="listing-page">
      <Navbar />
      <MenuBar sendDataToParent={sendDataToParent} />
      <div className="listing-banner">
        {/* <img
          src=""
          className="d-block w-100 h-100"
          alt="..."
        ></img> */}
      </div>

      <div className="container-fluid">
        <div className="main-body">
          <SidebarWrapper />
          <ListAside siteMenu={siteMenu} sendDataToParent={sendDataToParent} />
          <div className="right-side">
            <div className="block-title">系列：</div>

            <div className="listing-toolbar">
              <div className="amount">
                {/* 商品清單共有<span>{filterData.length}</span>本 */}
              </div>

              <div className="right-side">
                <ul className="view_type">
                  顯示模式
                  <li>
                    <div
                      onClick={() => handleViewChange("grid")}
                      className="type1"
                    ></div>
                  </li>
                  <li>
                    <div
                      onClick={() => handleViewChange("list")}
                      className="type2 here"
                    ></div>
                  </li>
                </ul>
                <div className="sortselect">
                  <p>排序依</p>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    defaultValue={"DEFAULT"}
                    onChange={(event) =>{
                      setMyObject((prev) => ({
                        ...prev,
                        sort: [event.target.value],
                      }))
                      filterBooks();
                    }}
                  >
                    <option value="-date_created">上市日期(新→舊)</option>
                    <option value="date_created">上市日期(舊→新)</option>
                    <option value="2">暢銷度</option>
                    <option value="3">價格(高→低)</option>
                  </select>
                </div>
              </div>
            </div>

            {currentView === "grid" && <GridList books={books} />}

            {currentView === "list" && <ListList books={books} />}

            <div className="">
              <Paginations />
            </div>
          </div>

          <div className={`pannel-container ${panel ? "back-filter" : ""}`}>
            {panel && (
              <div className="filter-area list-aside">
                <button className="btn" onClick={closePanel}>
                  <img src="/icons/close.svg" alt="" />
                </button>
                <ul className="">
                  <div className="title">依類別搜尋</div>
                  {series.map((item, index) => (
                    <li key={index}>
                      <div
                        onClick={() => sendDataToParent(item)}
                        key={`${index}`}
                      >
                        {item}
                      </div>
                    </li>
                  ))}
                </ul>

                <ul>
                  <div className="title">依系列搜尋</div>

                  <li>
                    <Link href="">X星際探險隊</Link>
                  </li>
                  <li>
                    <Link href="">X萬獸探險隊</Link>
                  </li>
                  <li>
                    <Link href="">X恐龍探險隊</Link>
                  </li>
                </ul>
              </div>
            )}

            <ul className="panel-btn">
              <li onClick={openPanel}>
                <img src="/icons/filter.svg" alt="" />
                篩選
              </li>
              <li>
                <img src="/icons/sort.svg" alt="" />
                排序
              </li>
              <li onClick={() => handleViewChange("grid")}>
                <img src="/icons/gridview.svg" alt="" />
                小圖
              </li>
              <li onClick={() => handleViewChange("list")}>
                <img src="/icons/listview.svg" alt="" />
                列表
              </li>
            </ul>
          </div>
          <Panel />
        </div>
      </div>
    </div>
  );
}




