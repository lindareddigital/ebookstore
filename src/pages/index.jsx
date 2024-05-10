import HomeTab from 'src/pages/components/HomeTab';
import MediaBlock from 'src/pages/components/MediaBlock';
import SidebarWrapper from 'src/pages/components/SidebarWrapper';
import Popup from "src/pages/components/Popup";
import MenuBar from 'src/pages/components/molecules/MenuBar';
import Navbar from 'src/pages/components/molecules/Navbar';
import 'swiper/css';
import Link from "next/link";
import { useEffect, useLayoutEffect, useState, useRef } from "react";
import { useRouter } from "next/router";


export default function Home() {
  const [show, setShow] = useState(true);
  const [data, setData] = useState(null);
  const [siteMenu, setSiteMenu] = useState(null);
  const [books, setBooks] = useState(null);
  const [homeTab, setHomeTab] = useState(null); 
  const router = useRouter();


  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await fetch("/api/page/home");
        const result = await response.json();    
        setData(result?.result?.pages[0].blocks);
        return result
      } catch (error) {
        console.error(error);
      }
    };

    const fetchMenu = async () => {
      try {
        const res = await fetch("/api/sitemenu/publisher/polis-press");
        const response = await res.json();
        const tempMenu = response?.result?.site_menu;
        setSiteMenu(tempMenu);
      } catch (error) {
        console.error(error);
      }
    };

    const messagenger = async () => {
      const response = await fetch("/api/webHook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mode: "subscribe",
          token: "mytoken",
          challenge: "1158201444",
        }),
      });

      const result = await response.json();
      setData(result?.result?.pages[0].blocks);
      // console.log("ddata", data);
    };

    const getProductsByCategory = async (categoryIds, order_by,limit) => {
      // console.log(
      //   [`${order_by}`],
      //   categoryIds,
      //   limit
      // );

      try {
        const response = await fetch(`/api/product/category`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sort_by: [`${order_by}`],
            publisher_slug: "polis-press",
            category_id: categoryIds,
            page: 1,
            limit: limit,
          }),
        });
        const books = await response.json();

        return books;
      } catch (error) {
        console.error(error);
      }
    };


    const getHomeData = async () => {
      const result = await fetchData();

      const homeTab = result?.result?.pages[0].blocks?.find((item) => {
        return item.collection === "block_product_query";
      });

      const categoryIds = homeTab?.item?.category?.map((item) => item.id);

      if (categoryIds) {
        const result = await getProductsByCategory(
          categoryIds,
          homeTab?.item?.order_by,
          homeTab?.item?.limit
        );
        
      setBooks(result?.result?.product);

      }
    };

    getHomeData();
    messagenger();
    fetchMenu();

  }, []);

  const blocks = data;

  const posts = blocks?.find((item) => {
    return (
      item.collection === "block_cardgroup" &&
      item.item.headline === "最新消息(posts)"
    );
  });

  // console.log("posts", posts?.item?.posts);

  // console.log("block", blocks);

  const heroBanner = blocks?.find((item) => {
    return item.collection === "block_hero_group";
  });

  const column = blocks?.find((item) => {
    return (
      item.item.headline === "分享專欄(posts)" &&
      item.collection === "block_cardgroup"
    );
  });

  // console.log("column", column?.item?.posts);

  const video = blocks?.find((item) => {
    return (
      item.item.headline === "影片(custom)" &&
      item.collection === "block_cardgroup"
    );
  });

  const promotion = blocks?.find((item) => {
    return item.collection === "promotion";
  });

  // console.log("video", video);
  // console.log("heroBanner", heroBanner?.item.hero_cards);

  return (
    <div className="home-page">
      <SidebarWrapper />
      {posts?.item?.posts && (
        <Popup
          promotion={promotion}
          show={show}
          onHide={() => setShow(false)}
        />
      )}
      <div className="sidebtn-container">
        <div id="fb-root"></div>
        <div
          className="fb-customerchat"
          attribution="setup_tool"
          page_id="101vision"
          theme_color="#6699cc"
          logged_in_greeting="Hi! How can we help you?"
          logged_out_greeting="Hi! How can we help you?"
        ></div>
        <div className="message-btn">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg"
            alt=""
          ></img>
        </div>
      </div>
      <Navbar />
      <MenuBar />
      <div className="home-banner">
        <div className="leftbox">
          <img className="topright" src="/icons/leftboxicon.svg"></img>
          <div className="">
            <div className="pin-title">最新消息</div>
            <div className="trangle"></div>
          </div>
          <div className="wrapper">
            {posts?.item?.posts?.map((item,index) => {
              return (
                  <Link
                    href={`/posts/news/${item?.id}`}
                    className="e-banner-product"
                    key={index}
                  >
                    {/* <img
                      src={`https://directus-cms.vicosys.com.hk/assets/${item?.key_image?.id}?access_token=${process.env.NEXT_PUBLIC_TOKEN}`}
                      alt={item.title}
                    /> */}

                    <div className="desc">{item.title}</div>
                    <div className="desc">{item.tags}</div>
                  </Link>
              );
            })}
          </div>
          <Link href="/posts/news" className="read-more-btn">
            查看更多
            <img className="" src="/icons/viewmore.svg"></img>
          </Link>
          <img className="newsbg" src="/icons/newsbg.svg"></img>
        </div>
        <div
          id="carouselExampleControls"
          className="home-banner-carousel carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            {heroBanner?.item.hero_cards?.map((item, index) => {
              return (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to={index}
                  // className="active"
                  aria-current={index === 0 ? "true" : ""}
                  aria-label="Slide 1"
                  className={`${index === 0 ? "active" : ""}`}
                ></button>
              );
            })}
            {/* <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button> */}
          </div>
          <div className="carousel-inner">
            {heroBanner?.item.hero_cards?.map((item, index) => {
              return (
                <div key={index}>
                  <Link
                    href={item.block_hero_id?.url || ""}
                    className={`carousel-item ${index === 1 ? "active" : ""}`}
                    key={index}
                  >
                    <img
                      src={`https://directus-cms.vicosys.com.hk/assets/${item.block_hero_id.image.id}?access_token=${process.env.NEXT_PUBLIC_TOKEN}`}
                      className=""
                      alt={item.block_hero_id.headline}
                    ></img>
                  </Link>
                </div>
              );
            })}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="main-body">
        {books && <HomeTab books={books} />}
        {/* <HomeTabTwo /> */}
      </div>
      <MediaBlock posts={column?.item?.posts} video={video} />
    </div>
  );
}

