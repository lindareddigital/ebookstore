'use client';
import useSwiperFunc from 'src/hooks/useSwiperFunc';
import HomeTab from 'src/pages/components/HomeTab';
import MobileCard from 'src/pages/components/MobileCard';
import MediaBlock from 'src/pages/components/MediaBlock';
import SidebarWrapper from 'src/pages/components/SidebarWrapper';
import apiManager from 'src/pages/api/api';
import { cache } from 'react';
import { useEffect, useRef,useState } from 'react';
import Link from 'next/link';
import 'swiper/css';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import MenuBar from 'src/pages/components/molecules/MenuBar';
// import ListAside from 'src/pages/components/molecules/ListAside';
import useSWR from "swr";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);
  const swiperRef = useRef(null);

  const { next, previous } = useSwiperFunc(swiperRef);
  const containerRef = useRef(null);
  const [isSearchOn, setIsSearchOn] = useState(false);
  const [searchKeywords, setSearchKeywords] = useState("");

  const getAllCategory = async () => {
    try {
      const data = await apiManager.getAllCategory();
      console.log(data);
      setCategories(data.data);
      return data;
    } catch (e) {
      console.log("error", e);
    }
  };
  // `${url}/api/v1/sales?_start=${
  //   (pageNo - 1) * limitCount
  // }&_limit=${limitCount}`;

  //SWR 第一次抓取資料先將資料存至 cache (stale)，直到下一次 fetch 資料(revalidate)，才會再拿到最新的資料
  // SWR 決定要不要 refetch 取決於第一個參數 key 有沒有改變
  const fetcher = (url, params) => fetch(url + params.id).then((r) => r.json());


  const { data, error } = useSWR(categories, fetcher);
  console.log(data, error, "swr");

  const getAllBooks = async () => {
    try {
      const data = await apiManager.getAllBooks();
      setBooks(data.data);

      console.log(data, "books");
      return data;
    } catch (e) {
      console.log("error", e);
    }
  };

  const tabChange = async (id) => {
    const data = await apiManager.getCategoryList(id);
    console.log("CategoryList", data);
  };

  // to={`/?q=${keyWords}`}

  useEffect(() => {
    getAllCategory();
    getAllBooks();
    // getCategoryList()
  }, []);

  return (
    <div class="home-page" ref={containerRef}>
      <SidebarWrapper />

      <div class="sidebtn-container">
        <div id="fb-root"></div>
        <div
          class="fb-customerchat"
          attribution="setup_tool"
          page_id="101vision"
          theme_color="#6699cc"
          logged_in_greeting="Hi! How can we help you?"
          logged_out_greeting="Hi! How can we help you?"
        ></div>
        <div class="message-btn">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg"
            alt=""
          ></img>
        </div>
        <div class="">
          {/* <button onClick={topFunction()} id="topBtn">Top</button> */}
        </div>
      </div>
      <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <img src="/icons/close.svg" alt="" />
          </button>
          <Link class="navbar-brand" href="#">
            大邑文化
          </Link>
          <Link
            href="/member"
            class="span align-items-center icon-fa-user-circle icon face-icon face-icon-white"
            title=""
            target="_self"
            aria-label="會員中心"
          ></Link>
          <div class="nav-right">
            <button class="search-btn btn" type="submit">
              <img src="/icons/member.svg" alt="" />
            </button>
            <button class="search-btn btn" type="submit">
              <img src="/icons/cart.svg" alt="" />
            </button>
          </div>

          <form class="input-group">
            <input
              onChange={(e) => setSearchKeywords(e.target.value)}
              class="form-control header-search-input"
              type="text"
            ></input>
            <button
              onClick={() => {
                searchDataKeywords();
                setTimeout(() => {
                  setIsSearchOn(true);
                }, 300);
              }}
              class="search-btn"
              type="submit"
            >
              <img src="/icons/search.svg" alt="" />
            </button>
          </form>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" href="#">
                  全站分類
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" href="#">
                  童書
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" href="#">
                  成書
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" href="#">
                  益智產品
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" href="#">
                  買書GO
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div class="container-fluid header-main">
        <div class="header-search-bar">
          <Link href="/">
            <img class="logo" src="/images/logo.jpeg" alt=""></img>
          </Link>
          <div class="right-side">
            {/* <div class="label-group">
              <Link
                href={{
                  pathname: `/singlepage/`,
                  query: { page: "haibin" },
                }}
              >
                <button type="button" class="btn">
                  海濱
                </button>
              </Link>
              <Link
                href={{
                  pathname: `/singlepage`,
                  query: { page: "yidin" },
                }}
              >
                <button type="button" class="btn">
                  一丁
                </button>
              </Link>
            </div> */}
            <form class="input-group">
              <div class="dropdown">
                <Link
                  class="btn dropdown-toggle"
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  全站
                </Link>

                <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <li>
                    <Link class="dropdown-item" href="#">
                      Action
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" href="#">
                      Another action
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" href="#">
                      Something else here
                    </Link>
                  </li>
                </ul>
              </div>
              <input
                class="form-control header-search-input"
                type="text"
              ></input>
              <button class="search-btn" type="submit">
                <img src="/icons/search.svg"></img>
              </button>

              <div class="header-toolbar">
                <button type="button" class="btn">
                  購物車
                  <img
                    src="https://api.iconify.design/fa:shopping-cart.svg"
                    alt=""
                  ></img>
                </button>

                <button type="button" class="btn">
                  登入
                </button>
                <button type="button" class="btn">
                  註冊
                </button>
              </div>
            </form>
            <div class="keyword-block">
              <div className="pill">HOT</div>
              <Link href="">X星際探險隊</Link>
              <Link href="">成語-民間故事</Link>
              <Link href="">X極限挑戰王</Link>
              <Link href=""></Link>
            </div>
          </div>
        </div>
      </div>

      <MenuBar />

      <div class="home-banner">
        <div className="leftbox">
          <img class="topright" src="/icons/columnIcon.svg"></img>
          <div class="pin-title">最新消息</div>

          <div class="wrapper">
            <div class="e-banner-product">
              <div>
                <div class="desc">X萬獸探險隊特別篇5 11/15即將上市</div>
                <hr />
              </div>
            </div>
            <div class="e-banner-product">
              <div>
                <div class="desc">入選誠品TOP100書單</div>
                <hr />
              </div>
            </div>
          </div>

          <div className="read-more-btn">查看更多</div>
          <img class="newsbg" src="/icons/newsbg.svg"></img>
        </div>
        <div
          id="carouselExampleControls"
          class="home-banner-carousel carousel slide"
          data-bs-ride="carousel"
        >
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="/images/banner.jpeg" class="" alt="..."></img>
            </div>
            <div class="carousel-item">
              <img src="/images/banner.jpeg" class="" alt="..."></img>
            </div>
            <div class="carousel-item">
              <img src="/images/banner.jpeg" class="" alt="..."></img>
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div class="main-body">
        {/* <ListAside categories={categories} /> */}
        <HomeTab />
        {/* <HomeTabTwo /> */}

        {categories.map((item) => {
          return (
            <>
              <MobileCard props={item} />
            </>
          );
        })}
      </div>

      <MediaBlock />
    </div>
  );
}
