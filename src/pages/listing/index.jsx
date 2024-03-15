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
import Breadcrumb from "src/pages/components/molecules/Breadcrumb";

export default function Listing({ data, detail }) {
  const [panel, setPanel] = useState(false);

  const [currentView, setCurrentView] = useState("grid");

  // const books = data?.data?.pages?.[0]?.blocks?.[2]?.item?.cards;
  const books = detail.data;

  const currentValue = "DEFAULT";



  // const filterData = useMemo(() => {
  //   if (!books) {
  //     return [];
  //   }
  //   const newData = filter.find((item) => {
  //     return item.series === query;
  //   });

  //   return newData;
  // }, [query]);

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const closePanel = () => {
    setPanel(false);
  };

  const openPanel = () => {
    setPanel(true);
  };

  

  return (
    <div className="listing-page">
      <Navbar />
      <MenuBar />
      <div className="listing-banner">
        {/* <img
          src=""
          className="d-block w-100 h-100"
          alt="..."
        ></img> */}
      </div>

      <Breadcrumb />
      <div className="container-fluid">
        <div className="main-body">
          <SidebarWrapper />
          {/* query={query} */}
          <ListAside data={data} detail={detail} />
          <div className="right-side">
            <div className="block-title">系列：X萬獸探險隊</div>
            <div className="listing-toolbar">
              <div className="amount">
                商品清單共有<span>{books.length}</span>本
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

            {currentView === "grid" && <GridList books={books} />}

            {currentView === "list" && <ListList books={books} />}
          </div>

          <div className={`pannel-container ${panel ? "back-filter" : ""}`}>
            {panel && (
              <div className="filter-area list-aside">
                <button className="btn" onClick={closePanel}>
                  <img src="/icons/close.svg" alt="" />
                </button>
                <ul className="">
                  <div className="title">依類別搜尋</div>
                  <li>
                    <Link href="">知識漫畫</Link>
                  </li>
                  <li>
                    <Link href="">兒童文學</Link>
                  </li>
                  <li>
                    <Link href="">益智桌遊</Link>
                  </li>
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
                  <li>
                    <Link href="">X科幻冒險隊</Link>
                  </li>
                  <li>
                    <Link href="">極限挑戰王</Link>
                  </li>
                  <li>
                    <Link href="">機器人戰隊</Link>
                  </li>
                  <li>
                    <Link href="">小公主成長學園</Link>
                  </li>
                  <li>
                    <Link href="">世界名著</Link>
                  </li>
                  <li>
                    <Link href="">超越極限</Link>
                  </li>
                  <li>
                    <Link href="">魔法學園</Link>
                  </li>
                  <li>
                    <Link href="">知識王</Link>
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

export const getServerSideProps = async () => {
  const result = await apiManager.getNew();
  const detail = await apiManager.getDetail();


  return { props: { data: result, detail } };
};
