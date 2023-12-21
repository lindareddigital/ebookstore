'use client';


/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
// import {topFunction} from '../js/main';
import useSwiperFunc from '@/hooks/useSwiperFunc';
import HomeTab from './components/HomeTab';
import apiManager from '@/pages/api/api';
import { cache } from 'react';
import { useEffect, useRef,useState } from 'react';
import Link from 'next/link';
import 'swiper/css';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';


export default function Home() {
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);
  const swiperRef = useRef(null);

  const { next, previous } = useSwiperFunc(swiperRef);
  const containerRef = useRef(null);


  const getAllCategory = (async () => {
  try {
    const data = await apiManager.getAllCategory();
    console.log(data);
    setCategories(data.data)
    return data;
  } catch (e) {
    console.log('error', e);
  }
});

const getAllBooks = (async () => {
  try {
    const data = await apiManager.getAllBooks();
    setBooks(data.data)

    console.log(data, 'books');
    return data;
  } catch (e) {
    console.log('error', e);
  }
});

  const tabChange = (async(title) => {
    const data = await apiManager.getCategoryList(title);
    console.log('CategoryList',data);
  });



  const topFunction = () =>{
    // const top = el.getBoundingClientRect().top;

    containerRef.current?.scroll({
      top: 0
    });

    // document.body.scrollTop = 0; // For Safari
    // document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }


  useEffect( () => {
    getAllCategory()
    getAllBooks()
    // getCategoryList()
  }, []);


  return(
    <div class="home-page" ref={containerRef}>
    

       <div class="sidebar-wrapper scroll-cling-top">
        <div class="scroll-active"><div id="sidebar-menu-3-0" class="d-none d-lg-flex tab">
          <Link aria-current="page" href="" class="router-link-active router-link-exact-active">
            <span>【益智桌遊】10/31上市</span>
          </Link>
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
        <div onClick={topFunction} class="d-none d-lg-flex back-to-top">
          <span>返回頂端</span>
        </div>
      </div>


      <div class="sidebtn-container">
        <div id="fb-root"></div>
        <div class="fb-customerchat"
          attribution="setup_tool"
          page_id="101vision"
          theme_color="#6699cc"
          logged_in_greeting="Hi! How can we help you?"
          logged_out_greeting="Hi! How can we help you?">
        </div>
        <div class="message-btn">
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg" alt=""></img>
        </div>
        <div class="">
          <button onClick={topFunction()} id="topBtn">Top</button>
        </div>
      </div>
      <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <i class="fa fa-bars" aria-hidden="true"></i>
          </button>
          <a class="navbar-brand" href="#">            
            大邑文化
          </a>
          <a href="/member" class="span align-items-center icon-fa-user-circle icon face-icon face-icon-white" title="" target="_self" aria-label="會員中心"></a>
          <div class="nav-right">
           
            <button class="search-btn btn" type="submit">
              <i class="fa fa-user " aria-hidden="true"></i>
            </button>
            <button class="search-btn btn" type="submit">
              <i class="fa fa-shopping-cart " aria-hidden="true"></i>
            </button>
          </div>

          <form class="input-group">
            <input class="form-control header-search-input" type="text"></input>
            <button class="search-btn btn" type="submit" >
              <i class="fa fa-search " aria-hidden="true"></i>
            </button>
          </form>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Features</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Pricing</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

        <div class="container-fluid header-main">

          <div class="header-search-bar">
            <img class="logo" src="/images/logo.jpeg" alt=""></img>
            <div class="">
              <div class="label-group">
                <button type="button" class="btn">海濱</button>
                <button type="button" class="btn">一丁</button>
              </div>
              <form class="input-group">
                <div class="dropdown">
                  <a class="btn dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
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
                  <i class="fa fa-search" aria-hidden="true"></i>
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
                <a href="">HOT:X星際探險隊</a>
                <a href="">成語-民間故事</a>
                <a href="">X極限挑戰王</a>
                <a href=""></a>
              </div>
            </div>
          </div>            

        </div>

        <div class="menu-bar"></div>

        <div class="home-banner">

          <div class="leftbox">
            <div class="title">最新消息</div>
            <div class="e-banner-product">
              <img class="webp-image" src="https://s2.eslite.dev/unsafe/s.eslite.dev/upload/product/o/2682262815004/20220930032401652408.jpg"></img>
              <div class="text">
                <div class="desc">
                  .X萬獸探險隊特別篇5 11/15即將上市.入選誠品TOP100書單
                  .X萬獸探險隊 算數王之戰 遊戲玩法
                </div>
              </div>
            </div>
            <div class="e-banner-product">
              <img class="webp-image" src="https://s2.eslite.dev/unsafe/s.eslite.dev/upload/product/o/2682262815004/20220930032401652408.jpg"></img>
              <div class="text">
                <div class="desc">
                  .X萬獸探險隊特別篇5 11/15即將上市.入選誠品TOP100書單
                  .X萬獸探險隊 算數王之戰 遊戲玩法
                </div>
              </div>
            </div>
          </div>
          <div id="carouselExampleControls" class="home-banner-carousel carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="https://s2.eslite.dev/unsafe/s.eslite.dev/2uoe0qjpbv2fhogg4qtn09ramz1e" class="d-block w-100 h-100" alt="..."></img>
              </div>
              <div class="carousel-item">
                <img src="https://images.unsplash.com/photo-1701735173211-bc2375b0909d?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="d-block w-100 h-100" alt="..."></img>
              </div>
              <div class="carousel-item">
                <img src="https://images.unsplash.com/photo-1701735173211-bc2375b0909d?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="d-block w-100 h-100" alt="..."></img>
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>

        </div>

        <div class="container-fluid" >
          <div class="main-body">



          <aside class="list-aside">
            <ul>
              {categories.map((item) => (
                <li key={item.id}>
                  <a onClick={() => tabChange(item.Title)}>{item.Title}</a>
                </li>
              ))}
            </ul>



              <div class="accordion" id="accordionExample">
              <div class="accordion-item">
              <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  依類別搜尋
                </button>
              </h2>
              <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <ul>
                    <li>
                      <a href="">知識漫畫</a>
                    </li>
                    <li>
                      <a href="">兒童文學</a>
                    </li>
                    <li>
                      <a href="">益智桌遊</a>
                    </li>
                  
                  </ul>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                依系列搜尋
                </button>
              </h2>
              <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <ul>
                    <li>
                      <a href="">X星際探險隊</a>
                    </li>
                    <li>
                      <a href="">X萬獸探險隊</a>
                    </li>
                    <li>
                      <a href="">X恐龍探險隊</a>
                    </li>
                    <li>
                      <a href="">X科幻冒險隊</a>
                    </li>
                    <li>
                      <a href="">極限挑戰王</a>
                    </li>
                    <li>
                      <a href="">機器人戰隊</a>
                    </li>
                    <li>
                      <a href="">小公主成長學園</a>
                    </li>
                    <li>
                      <a href="">世界名著</a>
                    </li>
                    <li>
                      <a href="">超越極限</a>
                    </li>
                    <li>
                      <a href="">魔法學園</a>
                    </li>
                    <li>
                      <a href="">知識王</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div> 
          </aside>


          <div class="right-side">
           

            <div class="dvSlider">

            <HomeTab />

            <Swiper
              ref={swiperRef}
              rewind={false}
              className={`booklist-carousel`}
              slidesPerView={5}
            >
              <div class="title">slider</div>
              <hr></hr>
              <div class="swiper-wrapper booklist-carousel-inner">
                {books.map((item) => {
                  return (
                    <SwiperSlide
                      className="swiper-slide"
                      key={`${item.id}`}
                    >
                      <div class="book-item">
                        <img src={`http://localhost:8055/assets/${item.PrimaryImage}`} className="" alt={item.title} />
                        <div className="desc mt-2">{item.Title}</div>
                        <div className="price-num">{item.Price}</div>
                      </div>
                    </SwiperSlide>
                  );
                })}
                </div>
                <div onClick={previous} class="swiper-button-prev"></div>
                <div onClick={next} class="swiper-button-next"></div>
            </Swiper>
                <div class="swiper swiper-js booklist-carousel">
                  <div class="title">slider</div>
                  <hr></hr>
                  <div class="swiper-wrapper booklist-carousel-inner">

                     {
                       books.map((item) => (
                        <div key={item.id} className="swiper-slide">
                          <div class="book-item">
                            <img src={`http://localhost:8055/assets/${item.PrimaryImage}`} className="" alt={item.title} />
                            <div className="desc mt-2">{item.Title}</div>
                            <div className="price-num">{item.Price}</div>
                          </div>
                        </div>
                      ))
                     }

                      
                      
                  </div>
                
                  <div class="swiper-button-prev"></div>
                  <div class="swiper-button-next"></div>
                </div>
            </div>

            <div id="Controls" class="booklist-carousel carousel slide" data-bs-ride="carousel">
              <div class="title">X萬獸探險隊</div>
              <hr></hr>
              <div class="booklist-carousel-inner">
                <div class="book-item">
                  <img src="https://s2.eslite.dev/unsafe/s.eslite.dev/b2b/newItem/2023/10/12/155_143447327_126_mainCoverImage1.jpg" class="" alt="..."></img>
                  <div class="desc mt-2">X萬獸探險隊益智桌遊/ 算數王之戰</div>
                  <div class="price-num"> $ 300</div>
                </div>
                <div class="book-item">
                  <img src="https://s2.eslite.dev/unsafe/s.eslite.dev/upload/product/o/2681546322009/ec1429824.jpg" class="" alt="..."></img>
                  <div class="desc">X萬獸探險隊 12: 高原霸主大角羊VS大野牛 (附學習單)</div>
                  <div class="price-num"> $ 300</div>
                </div>
                <div class="book-item">
                    <img src="https://s2.eslite.dev/unsafe/s.eslite.dev/upload/product/o/2681520894003/ec1388694.jpg" class="" alt="..."></img>
                    <div class="desc">X萬獸探險隊 10: 巨蟲擂臺戰 蠍子VS螳螂 (附學習單)</div>
                    <div class="price-num"> $ 300</div>
                  </div>
                <div class="book-item">
                  <img src="https://s2.eslite.dev/unsafe/s.eslite.dev/upload/product/o/2681508088004/ec1357899.jpg" class="" alt="..."></img>
                  <div class="desc">X萬獸探險隊 9: 毒王之王眼鏡蛇VS響尾蛇 (附學習單)</div>
                  <div class="price-num"> $ 300</div>
                </div>
                <div class="book-item">
                  <img src="https://s2.eslite.dev/unsafe/s.eslite.dev/upload/product/o/2681494991005/ec1352472.jpg" class="" alt="..."></img>
                  <div class="desc">X萬獸探險隊 8: 最強獵手灰狼VS鬣狗 (附學習單)</div>
                  <div class="price-num"> $ 300</div>
                </div>   
              
              </div>
              
            </div>

            <div id="Controls" class="booklist-carousel carousel slide" data-bs-ride="carousel">
              <div class="title">X萬獸探險隊</div>
              <hr></hr>
              <div class="booklist-carousel-inner">
                <div class="book-item">
                  <img src="https://s2.eslite.dev/unsafe/s.eslite.dev/b2b/newItem/2023/10/12/155_143447327_126_mainCoverImage1.jpg" class="" alt="..."></img>
                  <div class="desc mt-2">X萬獸探險隊益智桌遊/ 算數王之戰</div>
                  <div class="price-num"> $ 300</div>
                </div>
                <div class="book-item">
                  <img src="https://s2.eslite.dev/unsafe/s.eslite.dev/upload/product/o/2681546322009/ec1429824.jpg" class="" alt="..."></img>
                  <div class="desc">X萬獸探險隊 12: 高原霸主大角羊VS大野牛 (附學習單)</div>
                  <div class="price-num"> $ 300</div>
                </div>
                <div class="book-item">
                  <img src="https://s2.eslite.dev/unsafe/s.eslite.dev/upload/product/o/2681520894003/ec1388694.jpg" class="" alt="..."></img>
                  <div class="desc">X萬獸探險隊 10: 巨蟲擂臺戰 蠍子VS螳螂 (附學習單)</div>
                  <div class="price-num"> $ 300</div>
                </div>
                <div class="book-item">
                  <img src="https://s2.eslite.dev/unsafe/s.eslite.dev/upload/product/o/2681508088004/ec1357899.jpg" class="" alt="..."></img>
                  <div class="desc">X萬獸探險隊 9: 毒王之王眼鏡蛇VS響尾蛇 (附學習單)</div>
                  <div class="price-num"> $ 300</div>
                </div>
                <div class="book-item">
                  <img src="https://s2.eslite.dev/unsafe/s.eslite.dev/upload/product/o/2681494991005/ec1352472.jpg" class="" alt="..."></img>
                  <div class="desc">X萬獸探險隊 8: 最強獵手灰狼VS鬣狗 (附學習單)</div>
                  <div class="price-num"> $ 300</div>
                </div>   
                
              </div>
              
            </div>

            <div id="Controls" class="booklist-carousel carousel slide" data-bs-ride="carousel">
              <div class="title">X萬獸探險隊</div>
              <hr></hr>
              <div class="booklist-carousel-inner">
                <div class="book-item">
                  <img src="https://s2.eslite.dev/unsafe/s.eslite.dev/b2b/newItem/2023/10/12/155_143447327_126_mainCoverImage1.jpg" class="" alt="..."></img>
                  <div class="desc mt-2">X萬獸探險隊益智桌遊/ 算數王之戰</div>
                  <div class="price-num"> $ 300</div>
                </div>
                <div class="book-item">
                  <img src="https://s2.eslite.dev/unsafe/s.eslite.dev/upload/product/o/2681546322009/ec1429824.jpg" class="" alt="..."></img>
                  <div class="desc">X萬獸探險隊 12: 高原霸主大角羊VS大野牛 (附學習單)</div>
                  <div class="price-num"> $ 300</div>
                </div>
                <div class="book-item">
                  <img src="https://s2.eslite.dev/unsafe/s.eslite.dev/upload/product/o/2681520894003/ec1388694.jpg" class="" alt="..."></img>
                  <div class="desc">X萬獸探險隊 10: 巨蟲擂臺戰 蠍子VS螳螂 (附學習單)</div>
                  <div class="price-num"> $ 300</div>
                </div>
                <div class="book-item">
                  <img src="https://s2.eslite.dev/unsafe/s.eslite.dev/upload/product/o/2681508088004/ec1357899.jpg" class="" alt="..."></img>
                  <div class="desc">X萬獸探險隊 9: 毒王之王眼鏡蛇VS響尾蛇 (附學習單)</div>
                  <div class="price-num"> $ 300</div>
                </div>
                <div class="book-item">
                  <img src="https://s2.eslite.dev/unsafe/s.eslite.dev/upload/product/o/2681494991005/ec1352472.jpg" class="" alt="..."></img>
                  <div class="desc">X萬獸探險隊 8: 最強獵手灰狼VS鬣狗 (附學習單)</div>
                  <div class="price-num"> $ 300</div>
                </div>   
               
              </div>
              
            </div>


          </div>


          </div>
        </div>

 


        <div class="container-fluid media-block">


          <div class="yt-block">


            <iframe width="560" height="334" src="https://www.youtube.com/embed/55R1KVI4h74?si=qr6If8TgjJ425APu" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
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
            <img class="" src="https://s2.eslite.dev/unsafe/s.eslite.dev/upload/product/o/2682262815004/20220930032401652408.jpg" alt=""></img>
          </div>



        </div>






        <ul class="social-links">
          <li><a href=""><img src="https://jci.book.com.tw/css/header/images/social-books-app.svg"></img><br/>誠品</a></li>
          <li><a href=""><img src="https://jci.book.com.tw/css/header/images/social-ebooks-app.svg"></img><br/>博客來</a></li>
          <li><a href=""><img src="https://jci.book.com.tw/css/header/images/social-fb.svg"></img><br/>金石堂</a></li>
          <li><a href=""><img src="https://jci.book.com.tw/css/header/images/social-yt.svg"></img><br/>PChome</a></li>
        </ul>



  </div>

  )

}
