import { cache } from 'react';
import { useEffect, useRef,useState } from 'react';
import apiManager from 'src/pages/api/api';
import Link from 'next/link';
import useCalc from 'src/pages/components/atoms/useCalc';




export default function MediaBlock(props) {

  const { width, mobile } = useCalc();

  const [items, setItems] = useState(null);


  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const data = await apiManager.getHaibinParams(`Haibin?filter[Category][_eq]=${props.category}`);

  //       setItems(data.data);
  //       // console.log('88', props,data.data);
  //       // return data.data;
  //     } catch (e) {
  //       console.log('error', e);
  //     }
  //   };
  //   getData();
  // }, [props]);


  return (
    <>
      <div class="container-fluid media-block">
        <div class="yt-block">
          <iframe
            width="871"
            height="490"
            src="https://www.youtube.com/embed/55R1KVI4h74?si=qr6If8TgjJ425APu"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          <div className="title">X萬獸探險隊益智桌遊：算數王之戰</div>
          <div className="desc">
            在使用帥氣的絕招卡時，可以吸收牌中的動物常識，利用數字加總及學到的知識，讓這場對戰贏得勝利。現在就來一場與朋友之間的精采對戰，看看哪個牌組才是真正的王者吧！
          </div>
          <div class="more">
            <iframe
              width="260"
              height="165"
              src="https://www.youtube.com/embed/H4uG7XiXf78?si=HUo2Q9ujcf2kAY8n"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <iframe
              width="260"
              height="165"
              src="https://www.youtube.com/embed/H4uG7XiXf78?si=HUo2Q9ujcf2kAY8n"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div class="share-block">
          <div class="title">分享專欄</div>
          <div class="desc"></div>
          <img class="" src="" alt=""></img>
        </div>
      </div>
      <ul class="social-links">
        <li>
          <Link href="">
            <img src="/icons/eslite.png"></img>
          </Link>
        </li>
        <li>
          <Link href="">
            <img src="https://jci.book.com.tw/css/header/images/books_logo_185x52.png"></img>
          </Link>
        </li>
        <li>
          <Link href="">
            <img src="/icons/stone.svg"></img>
          </Link>
        </li>
        <li>
          <Link href="">
            <img src="https://fs-e.ecimg.tw/img/h24/new/index/v1/images/logo/logo_pchome-xmas_newyear.gif"></img>
          </Link>
        </li>
      </ul>
    </>
  );

}
