'use client';
import React from 'react';
// import {topFunction} from '../js/main';
import useSwiperFunc from '@/hooks/useSwiperFunc';
import HomeTab from '@/pages/components/HomeTab';
import MobileCard from '@/pages/components/MobileCard';
import SidebarWrapper from '@/pages/components/SidebarWrapper';
import apiManager from '@/pages/api/api';
import { cache } from 'react';
import { useEffect, useRef,useState } from 'react';
import Link from 'next/link';
import 'swiper/css';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';


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

  const tabChange = (async(id) => {
    const data = await apiManager.getCategoryList(id);
    console.log('CategoryList',data);
  });



  


  useEffect( () => {
    getAllCategory()
    getAllBooks()
    // getCategoryList()
  }, []);


  return(
    <div class="home-page" ref={containerRef}>
    

      
      <SidebarWrapper/>



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
          {/* <button onClick={topFunction()} id="topBtn">Top</button> */}
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
                <Link href={{
                  pathname:`/singlepage/`,
                  // query: {id: item.id},                 
                }}>
                  <button type="button" class="btn">海濱</button>
                </Link>
                <Link href={{
                  pathname:`/singlepage`,
                  // query: {id: item.id},                 
                }}>
                <button type="button" class="btn">一丁</button>
                </Link>
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

          <Swiper pagination={true} modules={[Pagination]} className="leftbox">
            <SwiperSlide class="">
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
            </SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            
          </Swiper>
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
                  <Link 
                    key={`${item.id}`}
                    href={{
                      pathname:`/listing/${item.id}`,
                      query: {id: item.id},                 
                    }}>
                    {item.Title}
                  </Link>
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
            <div class="swiper all-swiper booklist-carousel">

              <div class="title">All</div>
              <hr></hr>
              <Swiper
                ref={swiperRef}
                rewind={false}
                className={`booklist-carousel`}
                slidesPerView={5}
              >
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
            </div>
            </div>

            
            {categories.map((item) => {
              return (
              <>
                <MobileCard props={item}/>
              </>
              );
            })}

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
