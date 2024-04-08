import { cache } from 'react';
import { useEffect, useRef,useState } from 'react';
import SeashoreMediaBlock from "src/pages/components/SeashoreMediaBlock";
import Link from 'next/link';
import ListAside from 'src/pages/components/molecules/ListAside';
import GridList from "src/pages/polis-press/GridList";
import ListList from "src/pages/polis-press/ListList";
import SidebarWrapper from "src/pages/components/SidebarWrapper";
import { useRouter } from "next/router";
import SinglePageTab from "src/pages/components/SinglePageTab";
import Pagination from "react-bootstrap/Pagination";
import SocialLinksBlock from "src/pages/components/molecules/SocialLinksBlock";
import Error from "next/error";

export default function Singlepage() {
  const router = useRouter();
  const channel = router.query.slug?.[1];
  const publisher = router.query.slug?.[0];
  const slug = router.query.slug?.[2];
  const page = router.query.page || 1;
  const limit = router.query.limit || 5;
  const [menu, setMenu] = useState(null);
  const [matchedMenuItem, setMatchedMenuItem] = useState(null);
  const [products, setProducts] = useState(null);
  const [productTotalCount, setProductTotalCount] = useState(null);
  const [currentView, setCurrentView] = useState("grid");
  const [myObject, setMyObject] = useState({
    sort: ["-date_created"],
  });

  console.log("router", publisher, channel,limit);

  useEffect(() => {
    if (!publisher) {
      return;
    }
    const fetchMenu = async () => {
      try {
        const res = await fetch(`/api/sitemenu/publisher/${publisher}`);

        const result = await res.json();
        // console.log("res", result, result?.result?.site_menu);
        const tempMenu = result?.result?.site_menu;
        setMenu(tempMenu);
      } catch (error) {
        console.error("获取数据时出错：", error);
      }
    };

    fetchMenu();
  }, [publisher, channel, slug]);

  //預設首頁資料
  const filterByPublisher = async () => {
    const response = await fetch(`api/product/publisher/${publisher}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sort: myObject.sort,
        page: page,
        publisher: publisher,
        limit: limit,
      }),
    });
    const books = await response.json();
    const length = books?.result?.product_aggregated?.[0].countDistinct?.id;
    setProductTotalCount(length);
    setProducts(books?.result?.product);
  };

  useEffect(() => {
    if (router?.query?.slug?.length < 3) {
      console.log(
        "router?.query?.slug?.length < 3",
        router?.query?.slug?.length < 3
      );
      filterByPublisher();
    }
  }, [router]);

  useEffect(() => {
    if (menu && slug) {
      const matchedItem = findMenuItemBySlug(menu, slug);
      console.log("matchedItem", matchedItem, menu, slug);
      setMatchedMenuItem(matchedItem);
    }
  }, [menu, slug]);

  useEffect(() => {
    if (matchedMenuItem && matchedMenuItem.type === "product_by_category") {
      const categoryIds = matchedMenuItem.category.map(
        (category) => category.category_id.id
      );
      getProductsByCategory(categoryIds);
    } else if (
      matchedMenuItem &&
      matchedMenuItem.type === "product_by_series"
    ) {
      filterBySeries(matchedMenuItem?.query_tags);
    } else if (matchedMenuItem && matchedMenuItem.type === "url") {
      window.open(matchedMenuItem.landing, "_blank");
    } else {
      filterByPublisher();
    }
  }, [matchedMenuItem, page, limit, myObject.sort]);

  //  const sendDataToParent = (data) => {
  //    console.log("Data from ListAside:", data);
  //  };

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

  const getProductsByCategory = async (categoryIds) => {
    console.log("", categoryIds);
    try {
      const response = await fetch(`/api/product/category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sort_by: myObject.sort,
          publisher_slug: publisher,
          category_id: categoryIds,
          page: page,
          limit: limit,
        }),
      });
      const books = await response.json();
      setProducts(books?.result?.product);
      setProductTotalCount(
        books?.result?.product_aggregated[0]?.countDistinct?.id
      );
      console.log("productTotalCount", productTotalCount);
      console.log("page", page);
    } catch (error) {
      console.error("Error fetching products by category:", error);
    }
  };

  const filterBySeries = async (query_tags) => {
    console.log("filterBySeries", myObject.sort, page, query_tags, publisher);

    const response = await fetch("/api/product/series", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sort: myObject.sort,
        page: page,
        series_tags: query_tags,
        publisher_slug: publisher,
        limit: limit,
      }),
    });
    const books = await response.json();
    const length = books?.result?.product_aggregated?.[0].countDistinct?.id;
    setProductTotalCount(length);
    setProducts(books?.result?.product);
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const updatePage = (i) => {
    console.log("updatePage", i);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: i },
    });
  };

  const Paginations = ({ length }) => {
    const pageNumbers = [];
    console.log("Paginations length", length);

    if (Number(length)) {
      for (let i = 1; i <= Math.ceil(length / 5); i++) {
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
          <Pagination.Prev
            onClick={() => {
              const prevPage = Math.max(1, Number(page) - 1);
              updatePage(prevPage);
            }}
          />
          {pageNumbers}
          <Pagination.Next
            onClick={() => {
              const nextPage = Math.min(
                Math.ceil(length / 5),
                Number(page) + 1
              );
              updatePage(nextPage);
            }}
          />
        </Pagination>
      );
    }
  };

  if (publisher != "seashore" && publisher != "ichiban") {
    return <Error statusCode={404} />;
  }

  return (
    <div className="single-page">
      {publisher !== "" && (
        <div className="">
          <SidebarWrapper />
          <div className="sidebtn-container">
            <div className="message-btn">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg"
                alt=""
              ></img>
            </div>
            <div className="">
              <button onclick="topFunction()" id="topBtn">
                Top
              </button>
            </div>
          </div>

          <div className="container-fluid header-main">
            <div className="header-search-bar">
              <h3>{publisher === "seashore" ? "海濱圖書" : "一丁文化"}</h3>
              <div className="header-toolbar">
                <div className="navbar-link">
                  <Link href={{ pathname: `/` }} type="button" className="btn ">
                    <img src="/icons/home.svg" alt="" />
                    大邑文化
                  </Link>
                  <hr className="nav-hr" />
                  <Link
                    href={{ pathname: `/login` }}
                    type="button"
                    className="btn "
                  >
                    <img src="/icons/member.svg" alt="" />
                    登入
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="home-banner">
            {publisher === "seashore" ? (
              <img src="/images/haibin.svg" className="" alt="..."></img>
            ) : (
              <img src="/images/yidin.svg" className="" alt="..."></img>
            )}
          </div>

          <div className="top-area">
            {publisher === "seashore" ? (
              <img src="/images/habinlogo.svg" className="" alt="..."></img>
            ) : (
              <img src="/images/yidinlogo.svg" className="" alt="..."></img>
            )}
            <div className="banner-title">
              《海濱圖書》為新加坡大眾書局旗下出版品牌，2017年進軍台灣致力推廣多元化食譜，藉由食譜的簡單操作方法，告訴讀者即使沒有經驗，也能製作出一道道精緻美味的美食及飲品！
            </div>
          </div>
          <div className="single-separator">
            <img
              src="/images/single-separator.svg"
              className=""
              alt="single-separator"
            ></img>
          </div>

          <div className="container-fluid">
            <div className="main-body content">
              <ListAside
                siteMenu={menu}
                // sendDataToParent={sendDataToParent}
                publisher={publisher}
              />

              <div className="right-side">
                {/* <div className="block-title">系列：X萬獸探險隊</div> */}
                <div className="listing-toolbar">
                  <div className="amount">
                    商品清單共有<span>{productTotalCount}</span>本
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
                {currentView === "grid" && <GridList books={products} />}
                {currentView === "list" && <ListList books={products} />}
                <div className="">
                  {Math.ceil(productTotalCount / 5) > 1 && (
                    <Paginations length={productTotalCount} />
                  )}
                </div>{" "}
              </div>
            </div>
          </div>

          <SeashoreMediaBlock />
          <SinglePageTab />
          <SocialLinksBlock />
        </div>
      )}
    </div>
  );
}



