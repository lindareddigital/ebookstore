import Link from 'next/link';
import apiManager from 'src/pages/api/api';
import { useEffect, useRef,useState } from 'react';

export default function Footer() {
  
  return (
    <>
      <footer>
        <div class="container-fluid">
          <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingOne">
                <button
                  class="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  關於我們
                </button>
              </h2>
              <div
                id="collapseOne"
                class="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <li>
                    <Link href="">關於大邑</Link>
                  </li>
                  <li>
                    <Link href="">隱私/服務條款</Link>
                  </li>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingTwo">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  會員中心
                </button>
              </h2>
              <div
                id="collapseTwo"
                class="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <li>
                    <Link href="/member">會員專區</Link>
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
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingThree">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  客戶服務
                </button>
              </h2>
              <div
                id="collapseThree"
                class="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <li>
                    <Link href="">常見問題</Link>
                  </li>
                  <li>
                    <Link href="/contactus">聯絡我們</Link>
                  </li>
                </div>
              </div>
            </div>
          </div>
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
              <Link href="/">會員中心</Link>
            </li>
            <li>
              <Link href="/member">會員專區</Link>
            </li>
            <li>
              <Link
                href={{
                  pathname: `/member/`,
                  query: { tab: "collection" },
                }}
              >
                我的收藏
              </Link>
            </li>
            <li>
              <Link href="">訂閱新書通知</Link>
            </li>
            <li>
              <Link href="">查詢帳密</Link>
            </li>
          </div>
          <div class="box">
            <li class="title">
              <Link href="/share">客戶服務</Link>
            </li>
            <li>
              <Link href="/download">書單下載</Link>
            </li>
            <li>
              <Link href="">常見問題</Link>
            </li>
            <li>
              <Link href="/contactus">聯絡我們</Link>
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
                <img src="/icons/footerfb.svg"></img>
                <Link
                  target="_blank"
                  href="https://www.facebook.com/polispresstw"
                >
                  大邑
                </Link>
              </li>
              <li class="social-sqare">
                <img src="/icons/footerfb.svg"></img>
                <Link
                  target="_blank"
                  href="https://www.facebook.com/seashoretaiwan/"
                >
                  海濱
                </Link>
              </li>
              <li class="social-sqare">
                <img src="/icons/footerig.svg"></img>
                <Link
                  target="_blank"
                  href="https://www.facebook.com/seashoretaiwan/"
                ></Link>
              </li>
              <li class="social-sqare">
                <img src="/icons/footeryt.svg"></img>
                <Link
                  target="_blank"
                  href="https://www.facebook.com/seashoretaiwan/"
                ></Link>
              </li>
            </div>
          </div>
          <div className="social-mobile">
            <li className="">社群</li>
            <div className="social-sqare-container">
              <li class="social-sqare">
                <img src="/icons/footerfb.svg"></img>
                <Link
                  target="_blank"
                  href="https://www.facebook.com/polispresstw"
                >
                  大邑
                </Link>
              </li>
              <li class="social-sqare">
                <img src="/icons/footerfb.svg"></img>
                <Link
                  target="_blank"
                  href="https://www.facebook.com/seashoretaiwan/"
                >
                  海濱
                </Link>
              </li>
              <li class="social-sqare">
                <img src="/icons/footerig.svg"></img>
                <Link
                  target="_blank"
                  href="https://www.facebook.com/seashoretaiwan/"
                ></Link>
              </li>
              <li class="social-sqare">
                <img src="/icons/footeryt.svg"></img>
                <Link
                  target="_blank"
                  href="https://www.facebook.com/seashoretaiwan/"
                ></Link>
              </li>
            </div>
          </div>
        </div>
        <div className="copyright">
          Copyright © Polis Press All Rights Reserved.
        </div>
      </footer>
    </>
  );
}
