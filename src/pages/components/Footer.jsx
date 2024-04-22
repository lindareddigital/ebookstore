import Link from 'next/link';
import apiManager from 'src/pages/api/api';
import { useEffect, useRef,useState } from 'react';

export default function Footer() {
  
  return (
    <>
      <footer>
        <div className="container-fluid">
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
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
                className="accordion-collapse collapse"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <li>
                    <Link href="">關於大邑</Link>
                  </li>
                  <li>
                    <Link href="/terms">隱私/服務條款</Link>
                  </li>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button collapsed"
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
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <li>
                    <Link
                      href={{
                        pathname: `/member/`,
                        query: { tab: "info" },
                      }}
                    >
                      會員專區
                    </Link>
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
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button
                  className="accordion-button collapsed"
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
                className="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <li>
                    <Link href="/Download">書單下載</Link>
                  </li>
                  <li>
                    <Link href="">常見問題</Link>
                  </li>
                  <li>
                    <Link href="/ContactUs">聯絡我們</Link>
                  </li>
                </div>
              </div>
            </div>
          </div>
          <div className="box">
            <li className="title">關於我們</li>
            <li>
              <Link href="">關於大邑</Link>
            </li>
            <li>
              <Link href="/terms">隱私/服務條款</Link>
            </li>
          </div>
          <div className="box">
            <li className="title">會員中心</li>
            <li>
              <Link
                href={{
                  pathname: `/member/`,
                  query: { tab: "info" },
                }}
              >
                會員專區
              </Link>
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
          <div className="box">
            <li className="title">客戶服務</li>
            <li>
              <Link href="/Download">書單下載</Link>
            </li>
            <li>
              <Link href="">常見問題</Link>
            </li>
            <li>
              <Link href="/ContactUs">聯絡我們</Link>
            </li>
          </div>
          <div className="box">
            <li className="title">社群</li>
            <div className="social-sqare-container">
              <li className="social-sqare">
                <img src="/icons/footerfb.svg"></img>
                <Link
                  target="_blank"
                  href="https://www.facebook.com/polispresstw"
                >
                  大邑
                </Link>
              </li>
              <li className="social-sqare">
                <img src="/icons/footerfb.svg"></img>
                <Link
                  target="_blank"
                  href="https://www.facebook.com/seashoretaiwan/"
                >
                  海濱
                </Link>
              </li>
              <li className="social-sqare">
                <img src="/icons/footerig.svg"></img>
                <Link
                  target="_blank"
                  href="https://www.facebook.com/seashoretaiwan/"
                ></Link>
              </li>
              <li className="social-sqare">
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
              <li className="social-sqare">
                <img src="/icons/footerfb.svg"></img>
                <Link
                  target="_blank"
                  href="https://www.facebook.com/polispresstw"
                >
                  大邑
                </Link>
              </li>
              <li className="social-sqare">
                <img src="/icons/footerfb.svg"></img>
                <Link
                  target="_blank"
                  href="https://www.facebook.com/seashoretaiwan/"
                >
                  海濱
                </Link>
              </li>
              <li className="social-sqare">
                <img src="/icons/footerig.svg"></img>
                <Link
                  target="_blank"
                  href="https://www.facebook.com/seashoretaiwan/"
                ></Link>
              </li>
              <li className="social-sqare">
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
