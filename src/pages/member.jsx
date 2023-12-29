/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import {getCategory} from './api/api';
import {topFunction} from '../js/main';

import { cache } from 'react';
import { useEffect, useRef,useState } from 'react';


// const getData = cache(async () => {
//   try {
//     const result = await getCategory();
//     return result;
//   } catch (e) {
//     console.log('error', e);
//   }
// });





export default function Home() {

  
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategory().then(data => {
      setCategories(data);
    });
  }, []);


  return(
    <div class="home-page">

  


        <div class="container-fluid header-main">

          <div class="header-search-bar">
            <img class="logo" src="./images/logo.jpeg" alt=""></img>
            <div class="">
              <div class="label-group">
                <button type="button" class="btn btn-outline-secondary">海濱</button>
                <button type="button" class="btn btn-outline-secondary">一丁</button>
              </div>
              <form class="input-group">
                <div class="dropdown">
                  <a class="btn btn-outline-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                    全站
                  </a>

                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </div>
                <input class="form-control header-search-input" type="text"></input>
                <button class="search-btn btn" type="submit" >
                  <img src="https://api.iconify.design/fa:search.svg" alt=""></img>
                </button>

                <div class="header-toolbar">
                  <button type="button" class="btn ">購物車
                    <img src="https://api.iconify.design/fa:shopping-cart.svg" alt=""></img>
                  </button>

                  <button type="button" class="btn ">登入</button>
                  <button type="button" class="btn">註冊</button>  
                </div>
              </form>
              <div class="keyword-block">
                <a href="">全站滿額現折</a>
                <a href="">斜槓文具5折起</a>
                <a href="">下單抽香奈兒</a>
                <a href=""></a>
              </div>
            </div>
          </div>            

        </div>

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


        <div class="container-fluid" >
          <div class="main-body">



          <aside class="list-aside">
            <ul>
              <li>
                <a href="">會員資料管理</a>
              </li>
              <li>
                <a href="">收藏書籍</a>
              </li>
              <li>
                <a href="">訂閱新書通知</a>
              </li>
              <li>
                <a href="">訊息管理</a>
              </li>
              <li>
                <a href="">我的投稿</a>
              </li>
            </ul>

             
          </aside>


          <div class="right-side">
            <form class="contact-us">
              <div class="mb-3">
                <label htmlFor="exampleInputEmail1" class="form-label">姓名*</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
              </div>
              <div class="mb-3">
                <label htmlFor="exampleInputPassword1" class="form-label">暱稱</label>
                <input type="password" class="form-control" id="exampleInputPassword1"></input>
              </div>
              <div class="mb-3">
                <label htmlFor="exampleInputEmail1" class="form-label">Email *</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
              </div>
              <div class="mb-3">
                <label htmlFor="exampleInputEmail1" class="form-label">電話*</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
              </div>
              <div class="mb-3">
                <div class="">
                  <label class="mb-3" htmlFor="floatingSelect">Category</label>

                  <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
                    <option selected>1.書籍意見</option>
                    <option value="2">2.異業合作</option>
                    <option value="3">3.帳號問題</option>
                    <option value="4">4.購書問題</option>
                    <option value="5">5.網站問題</option>
                    <option value="6">6.我要投稿</option>
                    <option value="7">7.其他</option>
                  </select>
                </div>
              </div>


              <div class="mb-3">
                <label class="mb-3" htmlFor="floatingTextarea2">內容*(字數150字以內)</label>
                <textarea class="form-control form-comments" placeholder="Leave a comment here" id="floatingTextarea2"></textarea>
              </div>


              <div class="mb-3">
                <label htmlFor="formFile" class="form-label">附件*(請上傳JPG圖檔)</label>
                <input class="form-control" type="file" id="formFile"></input>
              </div>

              <button type="submit" class="btn btn-primary">確認傳送</button>
            </form>
          </div>


          </div>
        </div>

 


        <div class="container-fluid media-block">


          <div class="yt-block">


            <iframe width="560" height="315" src="https://www.youtube.com/embed/55R1KVI4h74?si=qr6If8TgjJ425APu" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            <div class="more">
              <iframe width="260" height="165" src="https://www.youtube.com/embed/H4uG7XiXf78?si=HUo2Q9ujcf2kAY8n" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
              <iframe width="260" height="165" src="https://www.youtube.com/embed/H4uG7XiXf78?si=HUo2Q9ujcf2kAY8n" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>
         
          </div>
          <div class="share-block">
            <div class="title">分享專欄</div>
            <div class="desc">
              由獨角獸計畫與500輯共同舉辦的「閱讀與思考派對」第四場由李惠貞主講「人生的解答」，以自身經驗與觀點，交融《在深夜遇見薩古魯》與《一個瑜伽士的內在喜悅工程》中薩古魯的超脫見解分享給所有讀者。
              ◎ 講座報導紀錄 → https://reurl.cc/zbrDVk​
              ◎ 場地協力 → Daily by Draft Land
              ◎ 𝗙𝗢𝗟𝗟𝗢𝗪 🅘🅖 → www.instagram.com/500times_tw
            </div>
            <img class="" src="https://s2.eslite.dev/unsafe/s.eslite.dev/b2b/vendor/12_220231122172115/mainCoverImage1_1183130.jpg" alt=""></img>
          </div>



        </div>




        <ul class="social-links">
          <li><a href=""><img src="https://jci.book.com.tw/css/header/images/social-books-app.svg"></img><br/>誠品</a></li>
          <li><a href=""><img src="https://jci.book.com.tw/css/header/images/social-ebooks-app.svg"></img><br/>博客來</a></li>
          <li><a href=""><img src="https://jci.book.com.tw/css/header/images/social-fb.svg"></img><br/>金石堂</a></li>
          <li><a href=""><img src="https://jci.book.com.tw/css/header/images/social-yt.svg"></img><br/>PChome</a></li>
        </ul>

        <footer>
          <div class="container-fluid">
            <div class="box">
              <li><a href="">關於我們</a></li>
              <li><a href="">關於大邑</a></li>
              <li><a href="">隱私/服務條款</a></li>
            </div>
            <div class="box">
              <li><a href="">會員中心</a></li>
              <li><a href="">會員專區</a></li>
              <li><a href="">我的收藏</a></li>
              <li><a href="">訂閱新書通知</a></li>
              <li><a href="">查詢帳密</a></li>
              <li><a href=""></a></li>

            </div>
            <div class="box">
              <li><a href="">書單下載</a></li>
              <li><a href="">常見問題</a></li>
              <li><a href="">聯絡我們</a></li>
            </div>
            <div class="box">
              社群
              <li><a href="">大邑</a></li>
              <li><a href="">海濱</a></li>
            </div>
          </div>
        </footer>

    </div>

  )

}
