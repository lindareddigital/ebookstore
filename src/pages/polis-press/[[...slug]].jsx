'use client'
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
  const categoryIds = useRef([])
  const [myObject, setMyObject] = useState({
    sort: ["-date_created"],
    page: 1,
  });

  const isFirstRendering = useRef(true)
  const [currentView, setCurrentView] = useState("grid");
  const router = useRouter();

 

  useEffect(() => {
    console.log("myObject", myObject);
    if (isFirstRendering.current) {
      isFirstRendering.current = false;
      return;
    }
    filterByCategory();
  }, [myObject.page, myObject.limit, myObject.sort]);


  useEffect(() => {
    // const channel = router.query?.slug?.[0];
    // const slug = router.query?.slug?.[1];

    const fetchData = async () => {
      try {
        const res = await fetch("/api/sitemenu/publisher/polis-press");
        const response = await res.json();
        // console.log("sitemenu", response);
        const tempMenu = response.result.site_menu;
        setSiteMenu(tempMenu);
        
        const foundItem = tempMenu.find((menu) => {
          return menu.menu_items.some(
            (item) => item.site_menu_items_id.slug === router.query?.slug?.[1]
          );
        });

        console.log("foundItem", foundItem);

        if (foundItem) {
          var bb = foundItem.menu_items.find(
            (item) => item.site_menu_items_id.slug === router.query?.slug?.[1]
          ).site_menu_items_id;
          console.log("category arr", bb.category);
        } else {
          return null;
        }
        categoryIds.current = bb.category;
        filterByCategory();

        // getBooks();
      } catch (error) {
        console.error("获取数据时出错：", error);
      }
    };
    fetchData();
  }, [router]);

  const updatePage = (i) => {
    console.log("updatePage", i);
    setMyObject((prev) => ({
      ...prev,
      page: i,
    }));
  }

  const sendDataToParent = (data) => {
    console.log("Data from ListAside:", data);
    filterBooks(data);
  };

  const filterByCategory = async () => {
    console.log("arr filterByCategory", categoryIds.current);
    console.log("myObject", myObject);
    
    const result = categoryIds.current?.map((item) => item.category_id.id);
    console.log(result);
    const response = await fetch("/api/product/category/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sort_by: myObject.sort,
        // sort_by: ["-date_created"],
        // page_limit: 1,
        category_id: result,
        page: myObject.page,
      }),
    });
    const books = await response.json();
    setBooks(books?.result?.product);
    console.log("books", books?.result?.product);
    const length = books?.result?.product_aggregated?.[0].count?.id;
    // console.log("length", length);

    setLength(length);
  };

  const filterBySeries = async () => {
    console.log(myObject);
    
    // const response = await fetch("/api/product/series", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     sort: myObject.sort,
    //     page: myObject.page,
    //     series_tags: myObject.arr,
    //   }),
    // });
    // const books = await response.json();
    // setLength(books?.result?.product?.length);
    // setBooks(books?.result?.product);
  };



  const filterBooks = async (obj) => {
    const arr = obj.map((item) => item.category_id.id);
    const item = obj?.[0] && obj?.[0].hasOwnProperty("category_id") ? arr : obj
      setMyObject((prev) => ({
        ...prev,
        page: prev.page+1,
        arr: [item],
      }));
    // if(){
    //   console.log("filterBooks category_id ", arr);

    //   console.log("filterByCategory", myObject);

    // }else{
    //   setMyObject((prev) => ({
    //     ...prev,
    //     arr: [obj],
    //   }));
    //   console.log("filterBySeries", myObject);
    //   filterBySeries();
    // }
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



  const Paginations = ({ length }) => {
    const pageNumbers = [];
    // console.log("length", length);

    if (Number(length)) {
      for (let i = 1; i <= Math.ceil(length / 5); i++) {
        pageNumbers.push(
          <Pagination.Item
            onClick={() => {
              updatePage(i);
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
                    onChange={(event) => {
                      setMyObject((prev) => ({
                        ...prev,
                        sort: [event.target.value],
                      }));
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
              <Paginations length={length} />
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



