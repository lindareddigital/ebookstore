import { cache } from 'react';
import { useEffect, useRef,useState } from 'react';
import apiManager from 'src/pages/api/api';
import Link from 'next/link';
import useCalc from 'src/pages/components/atoms/useCalc';
import SocialLinksBlock from "src/pages/components/molecules/SocialLinksBlock";
import {extractYouTubeId} from "src/utilities/tool.js";



export default function MediaBlock({ posts,video }) {

  console.log("video", video?.item?.cards);
  const ytVideo = video?.item?.cards;

  return (
    <>
      <div className="container-fluid media-block">
        <div className="yt-block">
          <iframe
            width="871"
            height="490"
            src={`https://www.youtube.com/embed/${extractYouTubeId(
              ytVideo[0].youtube
            )}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          <div className="title">{ytVideo[0].title}</div>
          <div className="desc">{ytVideo[0].description}</div>
          <div className="more">
            <iframe
              width="322"
              height="181"
              src={`https://www.youtube.com/embed/${extractYouTubeId(
                ytVideo[1].youtube
              )}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <iframe
              width="322"
              height="181"
              src={`https://www.youtube.com/embed/${extractYouTubeId(
                ytVideo[2].youtube
              )}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <div className="ytIcon">
              <img src="/icons/youtubeIcon.svg" alt="" />
              <div className="title">查看更多</div>
            </div>
          </div>
        </div>
        <div className="share-block">
          <div className="">
            <div className="pin-title">分享專欄</div>
            <div className="trangle"></div>
          </div>
          <img className="topright" src="/icons/columnIcon.svg"></img>

          {posts?.map((item) => {
            return (
              <>
                <div className="e-banner-product">
                  {/* <img
                    src={`https://directus-cms.vicosys.com.hk/assets/${item.posts_id.key_image.id}?access_token=${process.env.NEXT_PUBLIC_TOKEN}`}
                    alt=""
                  /> */}

                  <div className="desc">{item.posts_id.title}</div>
                  {/* <div className="desc">{item.posts_id.tags}</div> */}
                </div>
              </>
            );
          })}

          <hr />

          <div className="read-more-btn">
            查看更多 <img className="" src="/icons/viewmore.svg"></img>
          </div>
          <img className="newsbg" src="/icons/nine.svg"></img>
        </div>
      </div>
      <SocialLinksBlock />
    </>
  );
}
