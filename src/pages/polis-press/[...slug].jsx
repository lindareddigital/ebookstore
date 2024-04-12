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
  const [panelView, setPanelView] = useState("");
  const [siteMenu, setSiteMenu] = useState(null);
  const [books, setBooks] = useState(null);
  const [length, setLength] = useState(0);
  // const obj = useGlobalStore((state) => state.obj);
  const categoryIds = useRef([]);
  const [myObject, setMyObject] = useState({
    sort: ["-date_created"],
    title: ""
  });
  const isFirstRendering = useRef(true);
  const [currentView, setCurrentView] = useState("grid");
  const router = useRouter();
  const [menu, setMenu] = useState(null);
  const channel = router.query.channel;
  const slug = router.query.slug?.[1];
  const page = router.query.page || 1;
  const limit = router.query.limit || 15;
  const [title, setTitle] = useState("");
  const [matchedMenuItem, setMatchedMenuItem] = useState(null);

  useEffect(() => {
    if (siteMenu && slug) {
      console.log("siteMenu && slug", slug);
      const matchedItem = findMenuItemBySlug(siteMenu, slug);
      setMatchedMenuItem(matchedItem);
    }
  }, [siteMenu, slug]);

  useEffect(() => {
    if (matchedMenuItem && matchedMenuItem.type === "product_by_category") {
      const categoryIds = matchedMenuItem.category.map(
        (category) => category.category_id.id
      );
      setMyObject((prev) => ({
        ...prev,
        // arr: categoryIds,
        title: matchedMenuItem.title,
      }));
      filterByCategory(categoryIds);
    } else if (
      matchedMenuItem?.type === "product_by_series" &&
      matchedMenuItem?.query_tags != null
    ) {
      console.log("matchedMenuItem.query_tags", matchedMenuItem);
      setMyObject((prev) => ({
        ...prev,
        // arr: matchedMenuItem?.query_tags,
        title: matchedMenuItem.title,
      }));
      filterBySeries(matchedMenuItem?.query_tags);
    }
  }, [matchedMenuItem]);

  const findMenuItemBySlug = (menu, slug) => {
    for (const menuItem of menu) {
      for (const menuItemData of menuItem.menu_items) {
        if (menuItemData.site_menu_items_id.slug === slug) {
          return menuItemData.site_menu_items_id;
        }
      }
    }
    return null;
  };

  useEffect(() => {
    console.log("myObject", myObject);
    if (isFirstRendering.current) {
      isFirstRendering.current = false;
      return;
    }
    filterBooks();
  }, [page, myObject.limit, myObject.sort]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch("/api/sitemenu/publisher/polis-press");
        const response = await res.json();
        const tempMenu = response.result.site_menu;
        setSiteMenu(tempMenu);

        const foundItem = tempMenu.find((menu) => {
          return menu.menu_items.some(
            (item) => item.site_menu_items_id.slug === router.query?.slug?.[1]
          );
        });
        setTitle(foundItem?.title);
        console.log("foundItem", foundItem?.title);

        if (router?.query?.slug?.length < 3) {
          console.log("length < 3", router?.query,router?.query?.slug?.length < 3);
          filterByPublisher();
        }

        if (foundItem) {
          var arr = foundItem.menu_items.find(
            (item) => item.site_menu_items_id.slug === router.query?.slug?.[1]
          ).site_menu_items_id;
          console.log(
            "category arr",
            slug,
            categoryIds?.current[0]?.category_id?.name
          );
        } else {
          return null;
        }
        categoryIds.current = arr.category;
      } catch (error) {
        console.error("获取数据时出错：", error);
      }
    };
    fetchMenu();
  }, [router, menu]);

  //預設首頁資料
  const filterByPublisher = async () => {
    const response = await fetch(`api/product/publisher/polis-press/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sort: myObject.sort,
        page: page,
        publisher: "polis-press",
        limit: limit,
      }),
    });
    const books = await response.json();
    const length = books?.result?.product_aggregated?.[0].countDistinct?.id;
    console.log("151", books?.result?.product);

    setLength(length);
    setBooks(books?.result?.product);
  };

  const updatePage = (i) => {
    console.log("updatePage", i);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: i },
    });
  };

  const filterByCategory = async (categoryIds) => {
    const response = await fetch("/api/product/category/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sort_by: myObject.sort,
        limit: limit,
        publisher_slug: "polis-press",
        category_id: categoryIds,
        page: page,
      }),
    });

    const books = await response.json();
    setBooks(books?.result?.product);
    console.log("books", books?.result?.product);
    const length = books?.result?.product_aggregated?.[0].countDistinct?.id;
    console.log("length", length);
    setLength(length);
  };

  const filterBySeries = async (query_tags) => {
    const response = await fetch("/api/product/series", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sort: myObject.sort,
        page: page,
        series_tags: query_tags,
        publisher_slug: "polis-press",
      }),
    });
    const books = await response.json();
    const length = books?.result?.product_aggregated?.[0].countDistinct?.id;
    setLength(length);
    setBooks(books?.result?.product);
  };

  const filterBooks = async (arr) => {
    if (router?.query?.slug?.length < 3) {
      console.log("length < 3", router?.query?.slug?.length < 3);
     filterByPublisher();
    }
    console.log("filterBooks");
    const categoryArr = arr?.map((item) => item?.category_id?.id);
    const check =
      arr?.[0] && arr?.[0].hasOwnProperty("category_id") ? categoryArr : arr;
    setMyObject((prev) => ({
      ...prev,
      arr: [check],
    }));
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

  const handleClick = (channel, item, publisher) => {
    console.log("item", item);
    if (item.type === "product_by_category") {
      filterByCategory(item.category);
    } else if (item.type === "product_by_series") {
      filterBySeries(item.query_tags);
    }
    router.push(`/${publisher}/${channel}/${item.slug}`, undefined, {
      shallow: true,
    });
  };

  const Paginations = ({ length }) => {
    const pageNumbers = [];
    console.log("Paginations length", length);

    if (Number(length)) {
      for (let i = 1; i <= Math.ceil(length / 15); i++) {
        pageNumbers.push(
          <Pagination.Item
            onClick={() => {
              updatePage(i);
            }}
            key={i}
            active={i == page}
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
      <MenuBar />
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
          <ListAside siteMenu={siteMenu} />
          <div className="right-side">
            <div className="block-title">
              <div className="dot"></div>
              {title} {myObject.title}
            </div>

            <div className="listing-toolbar">
              <div className="amount">
                <span>商品清單</span>共有<span>{length}</span>本
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
              {length > 15 && Math.ceil(length / 5) > 1 && (
                <Paginations length={length} />
              )}
            </div>
          </div>

          <div className={`pannel-container ${panel ? "back-filter" : ""}`}>
            {panel && (
              <div className="filter-area list-aside">
                <button className="btn" onClick={closePanel}>
                  <img src="/icons/close.svg" alt="" />
                </button>

                {panelView == "filter" &&
                  siteMenu?.map((item) => {
                    return (
                      <ul className="">
                        <div className="title">{item.title}</div>
                        {item.menu_items?.map((menuItem) => (
                          <li key={menuItem.site_menu_items_id.id}>
                            <div
                              onClick={() =>
                                handleClick(
                                  item.channel,
                                  menuItem.site_menu_items_id,
                                  item.publisher
                                )
                              }
                            >
                              {menuItem.site_menu_items_id.title}
                            </div>
                          </li>
                        ))}
                      </ul>
                    );
                  })}

                {panelView == "sort" && (
                  <div className="">
                    <li
                      data-value="-date_created"
                      onClick={(event) => {
                        const value = event.target.getAttribute("data-value");
                        setMyObject((prev) => ({
                          ...prev,
                          sort: [value],
                        }));
                      }}
                    >
                      上市日期(新→舊)
                    </li>
                    <li
                      data-value="date_created"
                      onClick={(event) => {
                        const value = event.target.getAttribute("data-value");
                        setMyObject((prev) => ({
                          ...prev,
                          sort: [value],
                        }));
                      }}
                    >
                      上市日期(舊→新)
                    </li>
                  </div>
                )}
              </div>
            )}

            <ul className="panel-btn">
              <li
                onClick={() => {
                  openPanel();
                  setPanelView("filter");
                }}
              >
                <img src="/icons/filter.svg" alt="" />
                篩選
              </li>
              <li
                onClick={() => {
                  openPanel();
                  setPanelView("sort");
                }}
              >
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




