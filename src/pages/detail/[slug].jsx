import apiManager from 'src/pages/api/api';
import { useEffect, useRef,useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useCalc from 'src/pages/components/atoms/useCalc';
import MobileCard from 'src/pages/components/MobileCard';
import DesktopCard from 'src/pages/components/DesktopCard';
import Desc from "./Desc";

import MenuBar from 'src/pages/components/molecules/MenuBar';
import Head from 'next/head';
import HomeTab from "src/pages/components/HomeTab";
import Navbar from "src/pages/components/molecules/Navbar";
import Breadcrumb from "src/pages/components/molecules/Breadcrumb";
import Modal from "react-bootstrap/Modal";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { FreeMode, Navigation, Thumbs } from "swiper/modules";


export default function Detail({ data }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { mobile } = useCalc();

  const books = data?.data?.pages?.[0]?.blocks?.[2]?.item?.cards;




  const [lgShow, setLgShow] = useState(false);

  const [categories, setCategories] = useState([]);

  const router = useRouter();
  const id = router.query.slug;

  const filteredBooks = books.filter((book) => {
    return book.image.id === id;
  });

  const item = Object.assign({}, ...filteredBooks);

  console.log("29", router.query.slug,books);

  return (
    <div class="detail-page">
      <Head>
        <title>detail page</title>
      </Head>
      <Navbar />
      <MenuBar />
      <div class="container-fluid fdc">
        <Breadcrumb />

        <div class="detail">
          <div class="content">
            <>
              <img
                onClick={() => setLgShow(true)}
                src={`https://directus-cms.vicosys.com.hk/${item.image.id}?access_token=${process.env.NEXT_PUBLIC_TOKEN}`}
                className="primary-img"
                alt={item.image.id}
              />

              <div class="info">
                <h1>{item.title}</h1>
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
                <div className="button-group">
                  <div className="btn button-radius">
                    <img src="/icons/heart.svg" alt="" />
                    收藏此書
                  </div>
                  <div className="btn button-radius view-detail-btn">
                    <img src="/icons/search.svg" alt="" />
                    查看內頁
                  </div>
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

            <Modal
              size="lg"
              show={lgShow}
              onHide={() => setLgShow(false)}
              aria-labelledby="example-modal-sizes-title-lg"
            >
              <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                  Large Modal
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <img
                  src={`https://directus-cms.vicosys.com.hk/assets/${item.image.id}?access_token=${process.env.NEXT_PUBLIC_TOKEN}`}
                  className="primary-img"
                />

                <div className="gallery"></div>

                <Swiper
                  style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                  }}
                  loop={true}
                  spaceBetween={10}
                  navigation={true}
                  thumbs={{ swiper: thumbsSwiper }}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper2"
                >
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-10.jpg" />
                  </SwiperSlide>
                </Swiper>
                <Swiper
                  onSwiper={setThumbsSwiper}
                  loop={true}
                  spaceBetween={10}
                  slidesPerView={4}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper"
                >
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-10.jpg" />
                  </SwiperSlide>
                </Swiper>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
      <div class="main-body">
        <HomeTab data={data} />
      </div>

      <div class="container-fluid fdc">
        {/* {item &&
          (mobile ? (
            <MobileCard category={item.Category} />
          ) : (
            <DesktopCard category={item.Category} />
          ))} */}

        <Desc />
      </div>
    </div>
  );
}


export const getServerSideProps = async () => {
  const result = await apiManager.getNew();

  // console.log("datadatadatadata", result);

  return { props: { data: result } };
};
