/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import {getCategory} from './api/api';
import {topFunction} from '../js/main';

import { cache } from 'react';
import { useEffect, useRef,useState } from 'react';



export default function Home() {

  
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategory().then(data => {
      setCategories(data);
    });
  }, []);


  return(
    <div class="listing-page">

        <div class="menu-bar">
          <div class="">
            <a href="" class="link">全站分類</a>
          </div>
          <div class="">
            <a href="" class="link">童書</a>
          </div>
          <div class="">
            <a href="" class="link">成書</a>
          </div>
          <div class="">
            <a href="" class="link">益智產品</a>
          </div>
          <div class="">
            <a href="" class="link">買書GO</a>
          </div>

        </div>


      <div class="listing-banner">      
        <img src="https://s2.eslite.dev/unsafe/s.eslite.dev/fh52vnwp5754krpirafuxlm81fgw" class="d-block w-100 h-100" alt="..."></img>
      </div>

      <div class="container-fluid">

        <nav class="breadcrumb" aria-label="breadcrumb">
          <li class="breadcrumb-item"><a href="/" class="">首頁</a></li>
          <li class="breadcrumb-item"><a aria-current="page" href="/category/1/3" class="router-link-active router-link-exact-active" >中文出版</a></li>
        </nav>

        <div class="main-body">


          <div class="sidebar-wrapper scroll-cling-top">
              <div class="scroll-active"><div id="sidebar-menu-3-0" class="d-none d-lg-flex tab">
                <a aria-current="page" href="" class="router-link-active router-link-exact-active">
                  <span>【益智桌遊】10/31上市</span>
                </a>
              </div>
              <div class="d-none d-lg-flex tab active">
                <a aria-current="page" href="" class="router-link-active router-link-exact-active"><span>X萬獸探險隊</span></a>
              </div>
              <div id="sidebar-menu-4-1" class="d-none d-lg-flex tab">
                <a href="" class="router-link-active router-link-exact-active"><span>X萬獸探險隊 II</span></a>
              </div>
              <div class="d-none d-lg-flex tab">
                <a href="/" class="router-link-active router-link-exact-active"><span>X萬獸探險隊 III</span></a>
              </div>
              <div id="sidebar-menu-4-3" class="d-none d-lg-flex tab">
                <a aria-current="page" href="" class="router-link-active router-link-exact-active"><span>X萬獸探險隊-4冊合輯</span></a>
              </div>
              <div class="d-none d-lg-flex tab">
                <a aria-current="page" href="/" class="router-link-active router-link-exact-active" ><span >X萬獸探險隊-特別篇</span></a>
              </div>
            </div>
            <div class="d-none d-lg-flex back-to-top">
              <span>返回頂端</span>
            </div>
          </div>


          

          <aside class="list-aside">
            <ul>
              <li>
                <a href="">雜誌嚴選</a>
              </li>
              <li>
                <a href="">重點新刊</a>
              </li>
              <li>
                <a href="">焦點話題</a>
              </li>
              <li>
                <a href="">美妝贈品</a>
              </li>
            </ul>


             
          </aside>

          <div class="right-side">
            <div class="listing-toolbar">
              <ul class="view_type">
                顯示模式 
                <li>                               
                  <span class="type1"><a href=""></a></span>
                </li>
                <li>                               
                  <span class="type2 here"><a></a></span>
                </li>
              </ul>
              <div class="sortselect">
                <form action="" method="" name="">
                <p>排序依</p>
                </form>
              </div>

              <select class="form-select" aria-label="Default select example">
                <option selected>上市日期(新→舊)</option>
                <option value="1">上市日期(舊→新)</option>
                <option value="2">暢銷度</option>
                <option value="3">價格(高→低)</option>
              </select>

            </div>

            <div id="Controls" class="booklist-carousel slide" data-bs-ride="carousel">
              <div class="title">新品推薦</div>
              <hr></hr>
              <div class="booklist-carousel-inner">         
                <div class="book-item">
                  <button class="wish-btn">
                    <i class="fa fa-heart-o"></i>
                  </button>
                  <img src="https://s2.eslite.dev/unsafe/s.eslite.dev/b2b/newItem/2023/11/29/225_142846839_632_mainCoverImage1.jpg" class="" alt="..."></img>
                  <div class="desc">【8項練習洞察心理】重新思考面對衝突的方式</div>
                  <div class="price-num"> $ 300</div>
                </div>
                <div class="book-item">
                  <button class="wish-btn">
                    <i class="fa fa-heart-o"></i>
                  </button>
                  <img src="https://s2.eslite.dev/unsafe/s.eslite.dev/b2b/vendor/12_220231122172115/mainCoverImage1_1183119.jpg" class="" alt="..."></img>
                  <div class="desc">【8項練習洞察心理】重新思考面對衝突的方式</div>
                  <div class="price-num"> $ 300</div>
                </div>
                <div class="book-item">
                  <button class="wish-btn">
                    <i class="fa fa-heart-o"></i>
                  </button>
                  <img src="https://s2.eslite.dev/unsafe/s.eslite.dev/b2b/newItem/2023/12/01/288_133650440_200_mainCoverImage1.jpg" class="" alt="..."></img>
                  <div class="desc">【8項練習洞察心理】重新思考面對衝突的方式</div>
                  <div class="price-num"> $ 300</div>
                </div>
                <div class="book-item">
                  <button class="wish-btn">
                    <i class="fa fa-heart-o"></i>
                  </button>
                  <img src="https://s2.eslite.dev/unsafe/s.eslite.dev/b2b/vendor/112420231109111238/mainCoverImage1_1176964.jpg" class="" alt="..."></img>
                  <div class="desc">【8項練習洞察心理】重新思考面對衝突的方式</div>
                  <div class="price-num"> $ 300</div>
                </div>
                <div class="book-item">
                  <button class="wish-btn">
                    <i class="fa fa-heart-o"></i>
                  </button>
                  <img src="https://s2.eslite.dev/unsafe/s.eslite.dev/b2b/newItem/2023/12/01/288_133650440_200_mainCoverImage1.jpg" class="" alt="..."></img>
                  <div class="desc">【8項練習洞察心理】重新思考面對衝突的方式</div>
                  <div class="price-num"> $ 300</div>
                </div>      
              </div>
            </div>

            <div id="Controls" class="booklist-carousel slide" data-bs-ride="carousel">
              <div class="title">新品推薦</div>
              <hr></hr>
              <div class="booklist-carousel-inner">
                <div class="book-item">
                  <button class="wish-btn">
                    <i class="fa fa-heart-o"></i>
                  </button>
                  <img src="https://s2.eslite.dev/unsafe/s.eslite.dev/b2b/newItem/2023/11/29/225_142846839_632_mainCoverImage1.jpg" class="" alt="..."></img>
                  <div class="desc">【8項練習洞察心理】重新思考面對衝突的方式</div>
                  <div class="price-num"> $ 300</div>
                </div>
                <div class="book-item">
                  <button class="wish-btn">
                    <i class="fa fa-heart-o"></i>
                  </button>
                  <img src="https://s2.eslite.dev/unsafe/s.eslite.dev/b2b/vendor/12_220231122172115/mainCoverImage1_1183119.jpg" class="" alt="..."></img>
                  <div class="desc">【8項練習洞察心理】重新思考面對衝突的方式</div>
                  <div class="price-num"> $ 300</div>
                </div>
                <div class="book-item">
                  <button class="wish-btn">
                    <i class="fa fa-heart-o"></i>
                  </button>
                  <img src="https://s2.eslite.dev/unsafe/s.eslite.dev/b2b/newItem/2023/12/01/288_133650440_200_mainCoverImage1.jpg" class="" alt="..."></img>
                  <div class="desc">【8項練習洞察心理】重新思考面對衝突的方式</div>
                  <div class="price-num"> $ 300</div>
                </div>
                <div class="book-item">
                  <button class="wish-btn">
                    <i class="fa fa-heart-o"></i>
                  </button>
                  <img src="https://s2.eslite.dev/unsafe/s.eslite.dev/b2b/vendor/112420231109111238/mainCoverImage1_1176964.jpg" class="" alt="..."></img>
                  <div class="desc">【8項練習洞察心理】重新思考面對衝突的方式</div>
                  <div class="price-num"> $ 300</div>
                </div>
                <div class="book-item">
                  <button class="wish-btn">
                    <i class="fa fa-heart-o"></i>
                  </button>
                  <img src="https://s2.eslite.dev/unsafe/s.eslite.dev/b2b/newItem/2023/12/01/288_133650440_200_mainCoverImage1.jpg" class="" alt="..."></img>
                  <div class="desc">【8項練習洞察心理】重新思考面對衝突的方式</div>
                  <div class="price-num"> $ 300</div>
                </div>      
              </div>
            </div>

            <div id="Controls" class="booklist-carousel slide" data-bs-ride="carousel">
              <div class="title">新品推薦</div>
              <hr></hr>
              <div class="booklist-carousel-inner">
                <div class="book-item">
                  <button class="wish-btn">
                    <i class="fa fa-heart-o"></i>
                  </button>
                  <img src="https://s2.eslite.dev/unsafe/s.eslite.dev/b2b/newItem/2023/11/29/225_142846839_632_mainCoverImage1.jpg" class="" alt="..."></img>
                  <div class="desc">【8項練習洞察心理】重新思考面對衝突的方式</div>
                  <div class="price-num"> $ 300</div>
                </div>
                <div class="book-item">
                  <button class="wish-btn">
                    <i class="fa fa-heart-o"></i>
                  </button>
                  <img src="https://s2.eslite.dev/unsafe/s.eslite.dev/b2b/vendor/12_220231122172115/mainCoverImage1_1183119.jpg" class="" alt="..."></img>
                  <div class="desc">【8項練習洞察心理】重新思考面對衝突的方式</div>
                  <div class="price-num"> $ 300</div>
                </div>
                <div class="book-item">
                  <button class="wish-btn">
                    <i class="fa fa-heart-o"></i>
                  </button>
                  <img src="https://s2.eslite.dev/unsafe/s.eslite.dev/b2b/newItem/2023/12/01/288_133650440_200_mainCoverImage1.jpg" class="" alt="..."></img>
                  <div class="desc">【8項練習洞察心理】重新思考面對衝突的方式</div>
                  <div class="price-num"> $ 300</div>
                </div>
                <div class="book-item">
                  <button class="wish-btn">
                    <i class="fa fa-heart-o"></i>
                  </button>
                  <img src="https://s2.eslite.dev/unsafe/s.eslite.dev/b2b/vendor/112420231109111238/mainCoverImage1_1176964.jpg" class="" alt="..."></img>
                  <div class="desc">【8項練習洞察心理】重新思考面對衝突的方式</div>
                  <div class="price-num"> $ 300</div>
                </div>
                <div class="book-item">
                  <button class="wish-btn">
                    <i class="fa fa-heart-o"></i>
                  </button>
                  <img src="https://s2.eslite.dev/unsafe/s.eslite.dev/b2b/newItem/2023/12/01/288_133650440_200_mainCoverImage1.jpg" class="" alt="..."></img>
                  <div class="desc">【8項練習洞察心理】重新思考面對衝突的方式</div>
                  <div class="price-num"> $ 300</div>
                </div>      
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>

  )

}
