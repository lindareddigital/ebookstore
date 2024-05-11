import { cache } from 'react';
import { useEffect, useRef,useState } from 'react';
import SeashoreMediaBlock from "src/components/SeashoreMediaBlock";
import Link from 'next/link';
import ListAside from 'src/components/molecules/ListAside';
import GridList from "src/components/GridList";
import ListList from "src/components/ListList";
import SidebarWrapper from "src/components/SidebarWrapper";
import { useRouter } from "next/router";
import SinglePageTab from "src/components/SinglePageTab";
import Pagination from "react-bootstrap/Pagination";
import SocialLinksBlock from "src/components/molecules/SocialLinksBlock";
import Error from "next/error";
import { getPageColor, getPageBg } from "src/utilities/tool.js";
import { NextIcon } from "src/components/atoms/icons/NextIcon";
import { PrevIcon } from "src/components/atoms/icons/PrevIcon";
import General from "src/pages/General";


export default function Singlepage() {
  const router = useRouter();
  const channel = router.query.slug?.[1];
  const publisher = router.query.slug?.[0];
  const slug = router.query.slug?.[2];
  const page = router.query.page || 1;
  const limit = router.query.limit || 15;
  const [menu, setMenu] = useState(null);
  const [video, setVideo] = useState(null);
  const [banner, setBanner] = useState("");
  const [matchedMenuItem, setMatchedMenuItem] = useState(null);
  const [products, setProducts] = useState(null);
  const [productTotalCount, setProductTotalCount] = useState(null);
  const [currentView, setCurrentView] = useState("grid");
  const [myObject, setMyObject] = useState({
    sort: ["-date_created"],
  });

  // console.log("router", publisher, channel,limit);

  useEffect(() => {
    if (!publisher) {
      return;
    }
    const fetchMenu = async () => {
      try {
        const res = await fetch(`/api/page/${publisher}`);

        const result = await res.json();
        const filteredMenu = result?.result?.pages?.[0].blocks?.filter(
          (item) => item.collection === "site_menu"
        );

        setMenu(filteredMenu);
        
      } catch (error) {
        console.error(error);
      }
    };

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/page/${publisher}`);
        const result = await response.json();

        // console.log(result?.result?.pages[0]?.blocks);

        const heroBanner = result?.result?.pages[0]?.blocks?.find((item) => {
          return item.collection === "block_hero";
        });
        const video = result?.result?.pages[0]?.blocks?.find((item) => {
          return item?.collection === "block_cardgroup";
        });
        // console.log(video);

        setVideo(video);
        setBanner(heroBanner?.item?.image?.id);
      } catch (error) {
        console.error( error);
      }
    };

    fetchData();
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
    if (menu && slug) {
      const matchedItem = findMenuItemBySlug(menu, slug);
      // console.log("matchedItem", matchedItem, menu, slug);
      setMatchedMenuItem(matchedItem);
    }
  }, [menu, slug]);

  useEffect(() => {
    // console.log(matchedMenuItem?.type);

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
  }, [matchedMenuItem, page, limit, myObject.sort, router]);

  const findMenuItemBySlug = (menu, slug) => {
    const menuItemArray = Object.values(menu);

    for (const menuItem of menu) {
      // console.log("77", menuItem);
      
      for (const menuItemData of menuItem.item.menu_items) {
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
      // console.log("productTotalCount", productTotalCount);
      // console.log("page", page);
    } catch (error) {
      console.error("Error fetching products by category:", error);
    }
  };

  const filterBySeries = async (query_tags) => {
    // console.log("filterBySeries", myObject.sort, page, query_tags, publisher);

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

  const handleClick = (channel, slug, publisher) => {
    router.push(`/${publisher}/${channel}/${slug}`, undefined, {
      shallow: true,
    });
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
    // console.log("Paginations length", length);

    if (Number(length)) {
      for (let i = 1; i <= Math.ceil(length / 15); i++) {
        pageNumbers.push(
            <li
              onClick={() => {
                updatePage(i);
              }}
              className={` page-item ${i == page ? "active" : ""}`}
              key={`li-${i}`}
            >
              <div className={`${i == page ? getPageBg(publisher) : ""} page-link`}>
                {i}
                <span className="visually-hidden">(current)</span>
              </div>
            </li>
        );
      }
      return (
        <Pagination>
          <div
            onClick={() => {
              const prevPage = Math.max(1, Number(page) - 1);
              updatePage(prevPage);
            }}
            className="pagination"
          >
            <PrevIcon />
          </div>
          {pageNumbers}
          <div
            onClick={() => {
              const nextPage = Math.min(
                Math.ceil(length / 5),
                Number(page) + 1
              );
              updatePage(nextPage);
            }}
            className="pagination"
          >
            <NextIcon />
          </div>
        </Pagination>
      );
    }
  };

  if (
    publisher === "about" ||
    publisher === "terms" ||
    publisher === "privacy-policy"
  ) {
    return <General />;
  }

  if (
    publisher != "seashore" &&
    publisher != "ichiban"
    // &&
    // publisher != "posts"
  ) {
    return <Error statusCode={404} />;
  }

  return (
    <div className="single-page">
      {publisher !== "" && (
        <div className="">
          <SidebarWrapper />
          <div className={` header-main ${getPageBg(publisher)}`}>
            <div className={`header-search-bar `}>
              <h3>{publisher === "seashore" ? "海濱圖書" : "一丁文化"}</h3>
              <div className={`header-toolbar ${getPageBg(publisher)}`}>
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
            {banner != "" && (
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}/assets/${banner}?access_token=${process.env.NEXT_PUBLIC_TOKEN}`}
                className=""
                alt="banner"
              ></img>
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
          <div className="container-fluid">
            <div className="single-separator">
              <img
                src="/images/single-separator.svg"
                className=""
                alt="single-separator"
              ></img>
            </div>
          </div>

          <div className="container-fluid">
            <div className="main-body content">
              <ListAside siteMenu={menu} publisher={publisher} />

              <div className="right-side">
                <div className="listing-toolbar">
                  <div className="wrapper">
                    <div className={`amount`}>
                      <span className={`amount ${getPageColor(publisher)}`}>
                        商品清單{" "}
                      </span>
                      共有
                      <span className={`amount ${getPageColor(publisher)}`}>
                        {productTotalCount}
                      </span>
                      本
                    </div>

                    <ul className="view_type social-mobile">
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
                  </div>

                  <div className="right-side">
                    <ul className="view_type show-desktop">
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
                    <div className="sortselect social-mobile">
                      <p>篩選類別</p>

                      {/* <select
                        className="form-select"
                        onChange={(event) =>
                          handleClick(
                            item.channel,
                            event.target.value,
                            item.publisher
                          )
                        }
                      >
                        {menu?.map((item) => (
                          <optgroup label={item.title} key={item.title}>
                            {item?.menu_items?.map((menuItem) => (
                              <option
                                value={menuItem?.site_menu_items_id?.slug}
                                key={menuItem?.site_menu_items_id?.id}
                              >
                                {menuItem?.site_menu_items_id?.title}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select> */}
                      {menu?.map((item, index) => (
                        <select
                          key={`select-${index}`}
                          className="form-select"
                          onChange={(event) =>
                            handleClick(
                              item.channel,
                              event.target.value,
                              item.publisher
                            )
                          }
                        >
                          <optgroup label={item.title}>
                            {item?.menu_items?.map((menuItem, index) => (
                              <option
                                value={menuItem?.site_menu_items_id?.slug}
                                key={`optgroup-${index}`}
                              >
                                {menuItem?.site_menu_items_id?.title}
                              </option>
                            ))}
                          </optgroup>
                        </select>
                      ))}
                    </div>
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
                  {productTotalCount > 15 &&
                    Math.ceil(productTotalCount / 5) > 1 && (
                      <Paginations length={productTotalCount} />
                    )}
                </div>{" "}
              </div>
            </div>
          </div>

          {video != null && <SeashoreMediaBlock video={video} />}
          {publisher === "seashore" && <SinglePageTab />}
          <SocialLinksBlock />
        </div>
      )}
    </div>
  );
}



