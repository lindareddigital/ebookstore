import Link from 'next/link';
import apiManager from 'src/pages/api/api';
import { useEffect, useRef,useState } from 'react';

export default function Footer() {
  
  return (
    <>
      <footer>
        <div class="container-fluid">
          <div class="box">
            <li class="title">
              <Link href="">關於我們</Link>
            </li>
            <li>
              <Link href="">關於大邑</Link>
            </li>
            <li>
              <Link href="">隱私/服務條款</Link>
            </li>
          </div>
          <div class="box">
            <li class="title">
              <Link href="/member">會員中心</Link>
            </li>
            <li>
              <Link href="">會員專區</Link>
            </li>
            <li>
              <Link href="">我的收藏</Link>
            </li>
            <li>
              <Link href="">訂閱新書通知</Link>
            </li>
            <li>
              <Link href="">查詢帳密</Link>
            </li>
            <li>
              <Link href=""></Link>
            </li>
          </div>
          <div class="box">
            <li class="title">
              <Link href="/share">書單下載</Link>
            </li>
            <li>
              <Link href="">常見問題</Link>
            </li>
            <li>
              <Link href="">聯絡我們</Link>
            </li>
          </div>
          <div class="box">
            <li class="title">
              <Link target="_blank" href="">
                社群
              </Link>
            </li>
            <div className="social-sqare-container">
              <li class="social-sqare">
                <img src="/icons/fb.svg"></img>
                <Link
                  target="_blank"
                  href="https://www.facebook.com/polispresstw"
                >
                  大邑
                </Link>
              </li>
              <li class="social-sqare">
                <img src="/icons/fb.svg"></img>
                <Link
                  target="_blank"
                  href="https://www.facebook.com/seashoretaiwan/"
                >
                  海濱
                </Link>
              </li>
              <li class="social-sqare">
                <img src="/icons/ig.svg"></img>
                <Link
                  target="_blank"
                  href="https://www.facebook.com/seashoretaiwan/"
                ></Link>
              </li>
              <li class="social-sqare">
                <img src="/icons/yt.svg"></img>
                <Link
                  target="_blank"
                  href="https://www.facebook.com/seashoretaiwan/"
                ></Link>
              </li>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
