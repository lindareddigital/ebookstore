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
        <div class="share-block">
          <div className="">
            <div class="pin-title">分享專欄</div>
            <div className="trangle"></div>
          </div>
          <img class="topright" src="/icons/columnIcon.svg"></img>
          <div class="e-banner-product">
            <img src="/images/bgi.svg" alt="" />
            <div class="desc">
              《X萬獸探險隊III 11
              戰螯大盜》搶先看。安娜為大森特製的藥水，應該可以幫助能力恢復。
            </div>
          </div>
          <hr />
          <div class="e-banner-product">
            <img src="/images/bgi.svg" alt="" />
            <div>
              <div class="desc">入選誠品TOP100書單</div>
            </div>
          </div>
          <div class="e-banner-product">
            <img src="/images/bgi.svg" alt="" />
            <div>
              <div class="desc">入選誠品TOP100書單</div>
            </div>
          </div>
          <div class="e-banner-product">
            <img src="/images/bgi.svg" alt="" />
            <div>
              <div class="desc">入選誠品TOP100書單</div>
            </div>
          </div>

          <div className="read-more-btn">
            查看更多 <img class="" src="/icons/viewmore.svg"></img>
          </div>
          <img class="newsbg" src="/icons/nine.svg"></img>
        </div>
      </div>
      <div class="social-links">
        <div className="">
          <div className="block-title">買書GO</div>
          <ul className="container-fluid">
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
        </div>
      </div>
    </>
  );

}
