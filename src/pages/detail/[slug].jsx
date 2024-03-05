// 'use client'
import apiManager from 'src/pages/api/api';
// import { cache } from 'next';
import { useEffect, useRef,useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useCalc from 'src/pages/components/atoms/useCalc';
import MobileCard from 'src/pages/components/MobileCard';
import DesktopCard from 'src/pages/components/DesktopCard';
import MenuBar from 'src/pages/components/molecules/MenuBar';
import Head from 'next/head';
import HomeTab from "src/pages/components/HomeTab";
import Navbar from "src/pages/components/molecules/Navbar";

export default function Detail() {
  
  const { mobile } = useCalc();

  const [item, setItem] = useState({});
  const [categories, setCategories] = useState([]);


  const router = useRouter()
  const id = router.query.slug;



  console.log('29',router.query.slug,id);
  
  const getData = async () => {
    try {
      const data = await apiManager.getDetail(id);
      setItem(data.data);
      console.log("item", item);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(() => {
    if (id) {
      getData(id);
    }
  }, [id]);

  return (
    <div class="detail-page">
      <Head>
        <title>detail page</title>
      </Head>

      <Navbar />

      <MenuBar />

      <div class="container-fluid fdc">
        {item && (
          <>
            <nav class="breadcrumb" aria-label="breadcrumb">
              <li class="breadcrumb-item">
                <Link href="/" class="">
                  首頁
                </Link>
              </li>
              {/* <li class="breadcrumb-item"><Link href="/" class="">{item}</Link></li>     */}
              <li class="breadcrumb-item">
                <Link href="/" class="">
                  {/* 童書{item.Category.Title} */}
                </Link>
              </li>
            </nav>
          </>
        )}

        <div class="detail">
          <div class="content">
            {/* {item && ( */}
              <>
                <img
                  src={`http://localhost:8055/assets/${item.PrimaryImage}`}
                  className="primary-img"
                  alt={item.title}
                />

                <div class="info">
                  <h1>{item.Title}</h1>
                  <ul>
                    <li>
                      作者：<Link href="">{item.Author}</Link>
                    </li>
                    <li>
                      繪者：<Link href="/">{item.Illustrator}</Link>
                    </li>
                    <li>出版日期：{item.PublicationDate}</li>
                    <li>定價：{item.Price}元</li>
                  </ul>
                  <div className="btn button-radius">
                    <img src="/icons/heart.svg" alt="" />
                    收藏此書
                  </div>
                  <div className="btn button-radius view-detail-btn">
                    <img src="/icons/search.svg" alt="" />
                    查看內頁
                  </div>
                </div>

                <ul class="buy-book">
                  <img class="topright" src="/icons/leftboxicon.svg"></img>
                  <div className="">
                    <div class="pin-title">買書GO</div>
                    <div className="trangle"></div>
                  </div>

                  <li>
                    <Link href="">
                      <img src="/icons/eslite.png"></img>
                    </Link>
                  </li>
                  <li>
                    <Link href="">
                      <img src="/icons/bookstw.svg"></img>
                    </Link>
                  </li>
                  <li>
                    <Link href="">
                      <img src="/icons/stone.svg"></img>
                    </Link>
                  </li>
                  <li>
                    <Link href="">
                      <img src="/icons/pchome.svg"></img>
                    </Link>
                  </li>
                </ul>
              </>
            {/* )} */}
          </div>
        </div>
      </div>
      <div class="main-body">
        <HomeTab />
      </div>

      <div class="container-fluid fdc">
        {/* {item &&
          (mobile ? (
            <MobileCard category={item.Category} />
          ) : (
            <DesktopCard category={item.Category} />
          ))} */}

        {/* <div class="dvSlider">
          <div class="swiper swiper-js booklist-carousel">
            <div class="title">X萬獸探險隊</div>
            <hr></hr>
            <div class="swiper-wrapper booklist-carousel-inner">
              <div class="swiper-slide">
                <div class="book-item">
                  <img
                    src="https://s2.eslite.dev/unsafe/s.eslite.dev/b2b/newItem/2023/10/12/155_143447327_126_mainCoverImage1.jpg"
                    class=""
                    alt="..."
                  ></img>
                  <div class="desc mt-2">X萬獸探險隊益智桌遊/ 算數王之戰</div>
                  <div class="price-num"> $ 300</div>
                </div>
              </div>
              <div class="swiper-slide">
                <div class="book-item">
                  <img
                    src="https://s2.eslite.dev/unsafe/s.eslite.dev/b2b/newItem/2023/10/12/155_143447327_126_mainCoverImage1.jpg"
                    class=""
                    alt="..."
                  ></img>
                  <div class="desc mt-2">X萬獸探險隊益智桌遊/ 算數王之戰</div>
                  <div class="price-num"> $ 300</div>
                </div>
              </div>
              <div class="swiper-slide">
                <div class="book-item">
                  <img
                    src="https://s2.eslite.dev/unsafe/s.eslite.dev/b2b/newItem/2023/10/12/155_143447327_126_mainCoverImage1.jpg"
                    class=""
                    alt="..."
                  ></img>
                  <div class="desc mt-2">X萬獸探險隊益智桌遊/ 算數王之戰</div>
                  <div class="price-num"> $ 300</div>
                </div>
              </div>
              <div class="swiper-slide">
                <div class="book-item">
                  <img
                    src="https://s2.eslite.dev/unsafe/s.eslite.dev/b2b/newItem/2023/10/12/155_143447327_126_mainCoverImage1.jpg"
                    class=""
                    alt="..."
                  ></img>
                  <div class="desc mt-2">X萬獸探險隊益智桌遊/ 算數王之戰</div>
                  <div class="price-num"> $ 300</div>
                </div>
              </div>
              <div class="swiper-slide">
                <div class="book-item">
                  <img
                    src="https://s2.eslite.dev/unsafe/s.eslite.dev/b2b/newItem/2023/10/12/155_143447327_126_mainCoverImage1.jpg"
                    class=""
                    alt="..."
                  ></img>
                  <div class="desc mt-2">X萬獸探險隊益智桌遊/ 算數王之戰</div>
                  <div class="price-num"> $ 300</div>
                </div>
              </div>
            </div>

            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
          </div>
        </div> */}

        <div class="container-fluid fdc">
          <nav class="container-fluid">
            <div class="nav nav-tabs more-nav-tabs" id="nav-tab" role="tablist">
              <img class="topright" src="/icons/leftboxicon.svg"></img>
              <button
                class="nav-link active"
                id="nav-home-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-home"
                type="button"
                role="tab"
                aria-controls="nav-home"
                aria-selected="true"
              >
                內容簡介
              </button>
              <button
                class="nav-link"
                id="nav-profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-profile"
                type="button"
                role="tab"
                aria-controls="nav-profile"
                aria-selected="false"
              >
                作者介紹
              </button>
              <button
                class="nav-link"
                id="nav-contact-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-contact"
                type="button"
                role="tab"
                aria-controls="nav-contact"
                aria-selected="false"
              >
                目錄
              </button>
              <button
                class="nav-link"
                id="nav-contact-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-contact"
                type="button"
                role="tab"
                aria-controls="nav-contact"
                aria-selected="false"
              >
                規格
              </button>
              <button
                class="nav-link"
                id="nav-contact-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-contact"
                type="button"
                role="tab"
                aria-controls="nav-contact"
                aria-selected="false"
              >
                延伸內容
              </button>
            </div>
          </nav>
          <div class="tab-content" id="nav-tabContent">
            <div
              class="tab-pane fade show active"
              id="nav-home"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
            >
              百折不撓的小宇、誠實可靠的石頭、聰明冷靜的小尚，
              以及萬能微型機器人小Z和電腦高手艾美莉所組成的X科幻冒險隊，
              將帶領大家上天下地，一探大自然的奧祕！ 　　變種巨蜂襲擊！
              　　X探險隊正面迎戰，激烈對決即將展開！
              　　X探險隊和熱衷保育的山叔一起調查動物離奇傷亡的事件，此時，體型巨大的變種蜜蜂突然襲擊眾人，並抓走山叔的孩子！小宇等人在營救的過程中，也遭到巨蜂襲擊，還被關進有如迷宮的巨大蜂巢！這些巨蜂是從哪裡來的？探險隊要如何保護夥伴，逃出危機四伏的蜂巢？
              本書特色 　　看漫畫學知識！
              　　只要學習3步驟，趣味漫畫＋驚險故事＝開啟知識之門，培養小小科學家！
              　　STEP 1情境學習∣教育性★★★★★
              　　圖像式漫畫結合生動可愛的人物和驚險刺激的故事編排，加深小朋友對於科學知識的理解和如何運用在生活中，激發他們對自然與科學的好奇心。而書中團隊合作的故事，則可培養小讀者們建立勇於挑戰與冒險的精神，藉此養成體貼他人的個性。
            </div>
            <div
              class="tab-pane fade"
              id="nav-profile"
              role="tabpanel"
              aria-labelledby="nav-profile-tab"
            >
              ISBN：9789863019732 叢書系列：X科幻冒險隊 規格：平裝 / 160頁 / 17
              x 23 x 0.98 cm / 普通級 / 全彩印刷 / 初版 出版地：台灣
              本書分類：童書/青少年文學 知識學習漫畫 科學/生物/環境
              本書分類：童書/青少年文學 10-12歲
            </div>
            <div
              class="tab-pane fade"
              id="nav-contact"
              role="tabpanel"
              aria-labelledby="nav-contact-tab"
            >
              ...
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}
