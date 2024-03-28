import { cache } from 'react';
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Link from 'next/link';
import apiManager from 'src/pages/api/api';
import GridList from "./GridList";
import ListList from "./ListList";
import SidebarWrapper from 'src/pages/components/SidebarWrapper';
import MenuBar from 'src/pages/components/molecules/MenuBar';
import ListAside from 'src/pages/components/molecules/ListAside';
import Navbar from "src/pages/components/molecules/Navbar";
import Panel from "src/pages/components/atoms/Panel";
import { useRouter } from "next/router";
import { useGlobalStore } from "src/pages/store/global.store";
import Pagination from "react-bootstrap/Pagination";

export default function Listing({
  data,
  // siteMenu,
  filterBooks,
  filterCat,
}) {
  const [panel, setPanel] = useState(false);
  const [dataFromChild, setDataFromChild] = useState("");
  // const query = useWhatsOnStore((state) => state.query);
  const [ddata, setData] = useState(null);
  const [books, setBooks] = useState(null);

  const [currentView, setCurrentView] = useState("grid");
  const router = useRouter();
  // console.log("filterBooks", filterBooks);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/sitemenu/sidemenu");

        const result = await response.json();
        setData(result);

        

        const series = await fetch(`/api/product/series`);

        const resul = await res.json();
        console.log("22resul", resul);

        setBooks(resul);

        console.log("ddata", ddata);
      } catch (error) {
        console.error("获取数据时出错：", error);
      }
    };

    fetchData();
  }, []);


  let active = 0;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }

  const getCategory = async(arr) => {
    console.log('arr',arr);
    
    const category = await fetch(`/api/product/category/`,);

  };

  const paginationBasic = () => {
    return (
      <div>
        {/* <Pagination>
          <Pagination.Prev />
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Ellipsis />
          <Pagination.Item>{2}</Pagination.Item>
          <Pagination.Next />
        </Pagination> */}
        <Pagination>
          <Pagination.Prev />
          {items}
          <Pagination.Next />
        </Pagination>
        <br />
      </div>
    );
  };

  // const polis_press = siteMenu.data.filter((item) => {
  //   return item.menu_items[0].site_menu_id.publisher === "polis_press";
  // });

  // console.log(
  //   "polis_press",
  //   router.query.slug[1],
  //   filterCat?.site_menu[0].menu_items
  // );

   const cat = filterCat?.site_menu[0].menu_items
     .filter(
       (menuItem) =>
         menuItem.site_menu_items_id.slug === router.query.slug[1] &&
         menuItem.site_menu_items_id.category.length > 0
     )
     .map((menuItem) => menuItem.site_menu_items_id.category);
;


  console.log("cat", cat?.[0]);
  

  const sendDataToParent = (data) => {
    console.log("Data from ListAside:", data);
    setDataFromChild(data);
    router.replace(router.asPath);
  };

  
  const filterData = useMemo(() => {
    // console.log("memo", router.query, router.query?.slug?.includes("all"));

    if (!books) {
      return [];
    } else if (router.query?.slug?.includes("all")) {
      setDataFromChild("");
      return books;
    } else {
      return filterBooks;
    }
  }, [router.query, books]);

  const series = data?.data?.product?.reduce((acc, item) => {
    return acc.concat(item.series);
  }, []);

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const closePanel = () => {
    setPanel(false);
  };

  const openPanel = () => {
    setPanel(true);
  };

  return null

  return (
    <div className="listing-page">
      <Navbar siteMenu={siteMenu} />
      <MenuBar siteMenu={siteMenu} sendDataToParent={sendDataToParent} />
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
          <ListAside
            siteMenu={siteMenu}
            data={data}
            sendDataToParent={sendDataToParent}
          />
          <div className="right-side">
            {dataFromChild != "" && (
              <div className="block-title">系列： {dataFromChild}</div>
            )}
            <div className="listing-toolbar">
              <div className="amount">
                商品清單共有<span>{filterData.length}</span>本
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
                  >
                    <option value="DEFAULT">上市日期(新→舊)</option>
                    <option value="1">上市日期(舊→新)</option>
                    <option value="2">暢銷度</option>
                    <option value="3">價格(高→低)</option>
                  </select>
                </div>
              </div>
            </div>

            {currentView === "grid" && <GridList books={filterData} />}

            {currentView === "list" && <ListList books={filterData} />}

            <div className="">
              
              {paginationBasic()}
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

export const getServerSideProps = async ({ resolvedUrl }) => {
  // const data = await apiManager.getPageBySlug();
  // // const siteMenu = await apiManager.getSiteMenu();

  // console.log("refresh url", resolvedUrl);
  // let filterBooks
  // let filterCat
  // if( resolvedUrl != "/listing/all"){
  //   const parts = resolvedUrl.split("/");
  //   function extract(resolvedUrl) {
  //     return resolvedUrl.split("/");
  //   }
  //   const slug = extract(resolvedUrl)[parts.length - 1];
  //   const channel = extract(resolvedUrl)[parts.length - 2];

  //   console.log("channel", channel, slug, extract(resolvedUrl));

  //   // filterCat = await apiManager.getProductByCategory(channel, slug);
  //   // console.log("filterCat", filterCat);

  //   const cat = filterCat?.site_menu[0]?.menu_items
  //     .filter(
  //       (menuItem) =>
  //         menuItem.site_menu_items_id.slug === slug &&
  //         menuItem.site_menu_items_id.category.length > 0
  //     )
  //     .map((menuItem) => menuItem.site_menu_items_id.category) || [];

  //   console.log("cat", cat?.[0]);

  //   const arr = cat?.[0];

  //   const idsArray = arr?.map((item) => item.category_id.id);
  //   console.log("idsArray", idsArray);


  //   const query = cat?.site_menu_items_id?.id;
  //   // console.log("catcatcat id", query);  
  //   filterBooks = await apiManager.getFilterBooks(idsArray);
  // }else{
  //   console.log("/listing/all");
  //   filterBooks = await apiManager.getAllBooks();
    
  // }


  return {
    props: {
      // data,
      // siteMenu,
      // filterBooks: filterBooks?.product,
      // filterCat: filterCat || null,
    },
  };
};



