import { cache } from 'react';
import { useEffect, useRef,useState } from 'react';
import apiManager from 'src/pages/api/api';
import Link from 'next/link';
import useCalc from 'src/pages/components/atoms/useCalc';
import { extractYouTubeId } from "src/utilities/tool.js";

export default function MediaBlock({ video }) {
  console.log("video", video?.item?.cards);

  const ytVideo = video?.item?.cards;

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
              src={`https://www.youtube.com/embed/${extractYouTubeId(
                ytVideo[0].youtube
              )}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <div className="title">{ytVideo[0].title}</div>
            <div className="desc">{ytVideo[0].description}</div>
          </div>
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
