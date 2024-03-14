import { cache } from 'react';
import { useEffect, useRef, useState, useCallback } from "react";
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
    <div class="listing-page">
      <Navbar />
      <MenuBar />
      <div class="listing-banner">
        <img
          src="https://s2.eslite.dev/unsafe/s.eslite.dev/fh52vnwp5754krpirafuxlm81fgw"
          class="d-block w-100 h-100"
          alt="..."
        ></img>
      </div>

      <Breadcrumb />
      <div class="container-fluid">
        <div class="main-body">
          <SidebarWrapper />

          <ListAside data={data} detail={detail} />
          <div class="right-side">
            <div class="block-title">系列：X萬獸探險隊</div>
            <div class="listing-toolbar">
              <div className="amount">
                商品清單共有<span>{books.length}</span>本
              </div>

              <div className="right-side">
                <ul class="view_type">
                  顯示模式
                  <li>
                    <div
                      onClick={() => handleViewChange("grid")}
                      class="type1"
                    ></div>
                  </li>
                  <li>
                    <div
                      onClick={() => handleViewChange("list")}
                      class="type2 here"
                    ></div>
                  </li>
                </ul>
                <div class="sortselect">
                  <p>排序依</p>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>上市日期(新→舊)</option>
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
                <ul class="">
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
