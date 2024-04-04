import { cache } from 'react';
import { useEffect, useRef,useState } from 'react';
import apiManager from 'src/pages/api/api';
import Link from 'next/link';
import useCalc from 'src/pages/components/atoms/useCalc';




export default function MediaBlock({ data }) {
  const { width, mobile } = useCalc();

  const posts = data?.data?.pages[0]?.blocks[3]?.item?.posts;
  // console.log("post", data.data.pages[0]?.blocks);

  return (
    <>
      <div className="container-fluid seashore-media-block">
        <div className="single-separator">
          <img
            src="/images/single-separator.svg"
            className=""
            alt="single-separator"
          ></img>
        </div>
        <div className="yt-block">
          <div className="wrap">
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
          </div>
          <div className="more">
            <iframe
              width="322"
              height="181"
              src="https://www.youtube.com/embed/H4uG7XiXf78?si=HUo2Q9ujcf2kAY8n"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <iframe
              width="322"
              height="181"
              src="https://www.youtube.com/embed/H4uG7XiXf78?si=HUo2Q9ujcf2kAY8n"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <div className="ytIcon">
              <img src="/icons/youtubeIcon.svg" alt="" />
              <div className="title">查看更多</div>
            </div>
          </div>
        </div>
        <div className="single-separator">
          <img
            src="/images/single-separator.svg"
            className=""
            alt="single-separator"
          ></img>
        </div>
      </div>
    </>
  );
}
