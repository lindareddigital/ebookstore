import apiManager from 'src/pages/api/api';
import { useEffect, useRef, useState, useMemo } from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';
import useCalc from 'src/pages/components/atoms/useCalc';
import MobileCard from 'src/pages/components/MobileCard';
import DesktopCard from 'src/pages/components/DesktopCard';
import Desc from "./Desc";
import { NextIcon } from "src/pages/components/atoms/icons/NextIcon";
import { PrevIcon } from "src/pages/components/atoms/icons/PrevIcon";
import MenuBar from 'src/pages/components/molecules/MenuBar';
import Head from 'next/head';
import HomeTab from "src/pages/components/HomeTab";
import GalleryModal from "src/pages/components/GalleryModal";

import Navbar from "src/pages/components/molecules/Navbar";
import Breadcrumb from "src/pages/components/molecules/Breadcrumb";



export default function Detail({ data, detail }) {
  const { mobile } = useCalc();
  const [show, setShow] = useState(false);

  const books = data?.data?.pages?.[0]?.blocks?.[2]?.item?.cards;


  const router = useRouter();
  const id = router.query.slug;

  const item = detail.find((item) => {
    return item.id === id;
  });

   console.log("detaildetail", detail, item);


  


 

  return (
    <div class="detail-page">
      <Head>
        <title>{item.title}</title>
      </Head>
      <Navbar />
      <MenuBar />
      <div class="container-fluid fdc">
        <Breadcrumb />

        <div class="detail">
          <div class="content">
            <>
              <img
                onClick={() => setShow(true)}
                src={`https://directus-cms.vicosys.com.hk/assets/${item.cover_image}?access_token=${process.env.NEXT_PUBLIC_TOKEN}`}
                className="primary-img"
                alt={item.cover_image}
              />

              <div class="info">
                <h1>{item.title}</h1>
                <ul>
                  <li>
                    作者：<Link href="">{item.Author}</Link>
                  </li>
                  <li>
                    繪者：<Link href="/">{item.illustrator}</Link>
                  </li>
                  <li>出版日期：{item.publicationDate}</li>
                  <li>定價：{item.price}元</li>
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

                <li className="eslite">
                  <Link href="">
                    <img src="/icons/eslite.png"></img>
                  </Link>
                </li>
                <li className="bookstw">
                  <Link href="">
                    <img src="/icons/bookstw.svg"></img>
                  </Link>
                </li>
                <li className="stone">
                  <Link href="">
                    <img src="/icons/stone.svg"></img>
                  </Link>
                </li>
                <li className="pchome">
                  <Link href="">
                    <img src="/icons/pchome.svg"></img>
                  </Link>
                </li>
              </ul>
            </>

            <GalleryModal
              show={show}
              item={item}
              onHide={() => setShow(false)}
            />
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

        <Desc detail={detail} />
      </div>
    </div>
  );
}


export const getServerSideProps = async () => {
  const result = await apiManager.getNew();
  const detail = await apiManager.getDetail();


  console.log("detaildetail", detail);

  return { props: { data: result, detail: detail.data } };
};
