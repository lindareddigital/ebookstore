import { cache } from 'react';
import { useEffect, useRef,useState } from 'react';
import Link from 'next/link';
import SocialLinksBlock from "src/pages/components/molecules/SocialLinksBlock";
import {extractYouTubeId} from "src/utilities/tool.js";



export default function MediaBlock({ posts,video }) {

  // console.log("video", video?.item?.cards);
  const ytVideo = video?.item?.cards;
  const item = video?.item;

  return (
    <>
      {ytVideo?.length != 0 && ytVideo && ytVideo.length > 0 && ytVideo[0] && (
        <div className="container-fluid media-block">
          <div className="yt-block">
            <iframe
              width="871"
              height="490"
              src={`https://www.youtube.com/embed/${extractYouTubeId(
                ytVideo[0]?.youtube
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
                  ytVideo[1]?.youtube
                )}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
              <iframe
                width="322"
                height="181"
                src={`https://www.youtube.com/embed/${extractYouTubeId(
                  ytVideo[1]?.youtube
                )}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
              <Link
                target="_blank"
                href={{ pathname: `${item?.url}` }}
                className="ytIcon"
              >
                <img src="/icons/youtubeIcon.svg" alt="" />
                <div className="title">查看更多</div>
              </Link>
            </div>
          </div>
          <div className="share-block">
            <div className="">
              <div className="pin-title">分享專欄</div>
              <div className="trangle"></div>
            </div>
            <img className="topright" src="/icons/columnIcon.svg"></img>

            {posts?.map((item,index) => {
              return (
                <div key={index}>
                  <Link
                    href={`/columns/${item?.id}`}
                    key={index}
                    className="e-banner-product"
                  >
                    <img
                      src={`https://directus-cms.vicosys.com.hk/assets/${item?.key_image?.id}?access_token=${process.env.NEXT_PUBLIC_TOKEN}`}
                      alt=""
                    />

                    <div className="desc">{item.title}</div>
                    {/* <div className="desc">{item.posts_id.tags}</div> */}
                  </Link>
                </div>
              );
            })}

            <hr />

            <Link href="/columns" className="read-more-btn">
              查看更多 <img className="" src="/icons/viewmore.svg"></img>
            </Link>
            <img className="newsbg" src="/icons/nine.svg"></img>
          </div>
        </div>
      )}
      <SocialLinksBlock />
    </>
  );
}
