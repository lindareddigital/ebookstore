import Link from 'next/link';
import MenuBar from './components/molecules/MenuBar';
import MediaBlock from 'src/pages/components/MediaBlock';

import { cache } from 'react';
import { useEffect, useRef,useState } from 'react';
import ListAside from 'src/pages/components/molecules/ListAside';
import NextAuth from "next-auth";


export default function Member() {

  
  const [categories, setCategories] = useState([]);

  // useEffect(() => {
  //   getCategory().then(data => {
  //     setCategories(data);
  //   });
  // }, []);


  return(
    <div class="home-page">


        <div class="container-fluid header-main">

          <div class="header-search-bar">
            <Link href="/">
              <img class="logo" src="./images/logo.jpeg" alt=""></img>
            </Link>
            <div class="">
              <div class="label-group">
                <button type="button" class="btn btn-outline-secondary">海濱</button>
                <button type="button" class="btn btn-outline-secondary">一丁</button>
              </div>
              <form class="input-group">
                <div class="dropdown">
                  <Link class="btn btn-outline-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                    全站
                  </Link>

                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <li><Link class="dropdown-item" href="#">Action</Link></li>
                    <li><Link class="dropdown-item" href="#">Another action</Link></li>
                    <li><Link class="dropdown-item" href="#">Something else here</Link></li>
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
                <Link href="">全站滿額現折</Link>
                <Link href="">斜槓文具5折起</Link>
                <Link href="">下單抽香奈兒</Link>
                <Link href=""></Link>
              </div>
            </div>
          </div>            

        </div>

        <MenuBar />

        


        <div class="container-fluid" >
          <div class="main-body">


          <ListAside categories={categories}/>

          <aside class="list-aside">
            <ul>
              <li>
                <Link href="">會員資料管理</Link>
              </li>
              <li>
                <Link href="">收藏書籍</Link>
              </li>
              <li>
                <Link href="">訂閱新書通知</Link>
              </li>
              <li>
                <Link href="">訊息管理</Link>
              </li>
              <li>
                <Link href="">我的投稿</Link>
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

 

        <MediaBlock/>
        


        

    </div>

  )

}
