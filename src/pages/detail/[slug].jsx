'use client'
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import apiManager from '@/pages/api/api';
// import { cache } from 'next';
import { useEffect, useRef,useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';

export async function generateMetadata({}) {
  // const data = await getData();
  // if (data) {
  //   const meta = getMetaData(data.metatagNormalized);
  //   return { ...meta, title: data.title };
  // }
  return { title: 'slud' };

}
    

// eslint-disable-next-line @next/next/no-async-client-component
export default function Detail() {

  const [item, setItem] = useState(null);
  const [categories, setCategories] = useState([]);


  const router = useRouter()
  const { id } = router.query;

  console.log('id', id);

  useEffect(() => {
    const getData = async () => {
      try {
        
        const data = await apiManager.getDetail(id);
        console.log('data.data', data.data);
        setItem(data.data);
      } catch (e) {
        console.log('error', e);
      }
    };

    if (id) {
      getData();
    }
  }, [id]);
  



  return(
    <div class="detail-page">
        <Head>
          <title>{title}</title>
        </Head>



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


      <div class="container-fluid">

        <nav class="breadcrumb" aria-label="breadcrumb">
          <li class="breadcrumb-item"><a href="/" class="">首頁</a></li>
          <li class="breadcrumb-item"><a href="/" class="">中文書</a></li>
          <li class="breadcrumb-item"><a href="/" class="">童書/青少年文學</a></li>
          <li class="breadcrumb-item"><a href="/" class="">知識學習漫畫</a></li>
          <li class="breadcrumb-item"><a href="/" class="">科學/生物/環境</a></li>    
          <li class="breadcrumb-item"><a href="/" class="">商品介紹</a></li>     
 
        </nav>

        <div class="main-body">


          <div class="content">
          {item && (
            <>
            <img src={`http://localhost:8055/assets/${item.PrimaryImage}`} className="" alt={item.title} />

              <div class="info">
                <h1>{item.Title}</h1>
                <ul>
                  <li>作者：<a href="">{item.Author}</a></li>
                  <li>繪者：<a href="//">{item.Illustrator}</a></li>
                  <li>出版社：<Link href="/singlepage"><span>大邑文化{item.Publisher}</span></Link></li>
                  <li>出版日期：{item.PublicationDate}</li>
                  <li>語言：繁體中文</li>
                  <li>定價：{item.Price}元</li>
                </ul>
              </div>
            </>      
          )}
            </div>

            <div class="share-block">
                <div class="title">買書GO</div>
                <div class="desc">誠品</div>
                <div class="desc">博客來</div>
                <div class="desc">金石堂</div>
                <div class="desc">誠品</div>
                <img class="" src="https://im1.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/087/86/0010878644.jpg&v=5fd89e3ek&w=348&h=348" alt=""></img>
              </div>
            
            </div>

              
          </div>



          <div class="container-fluid">

            <div class="dvSlider">
                <div class="swiper swiper-js booklist-carousel">
                  <div class="title">X萬獸探險隊</div>
                  <hr></hr>
                  <div class="swiper-wrapper booklist-carousel-inner">
                      <div class="swiper-slide">
                        <div class="book-item">
                          <img src="https://s2.eslite.dev/unsafe/s.eslite.dev/b2b/newItem/2023/10/12/155_143447327_126_mainCoverImage1.jpg" class="" alt="..."></img>
                          <div class="desc mt-2">X萬獸探險隊益智桌遊/ 算數王之戰</div>
                          <div class="price-num"> $ 300</div>
                        </div>

                      </div>
                      <div class="swiper-slide">
                        <div class="book-item">
                          <img src="https://s2.eslite.dev/unsafe/s.eslite.dev/b2b/newItem/2023/10/12/155_143447327_126_mainCoverImage1.jpg" class="" alt="..."></img>
                          <div class="desc mt-2">X萬獸探險隊益智桌遊/ 算數王之戰</div>
                          <div class="price-num"> $ 300</div>
                        </div>
                      </div>
                      <div class="swiper-slide">
                        <div class="book-item">
                          <img src="https://s2.eslite.dev/unsafe/s.eslite.dev/b2b/newItem/2023/10/12/155_143447327_126_mainCoverImage1.jpg" class="" alt="..."></img>
                          <div class="desc mt-2">X萬獸探險隊益智桌遊/ 算數王之戰</div>
                          <div class="price-num"> $ 300</div>
                        </div>

                      </div>
                      <div class="swiper-slide">
                        <div class="book-item">
                          <img src="https://s2.eslite.dev/unsafe/s.eslite.dev/b2b/newItem/2023/10/12/155_143447327_126_mainCoverImage1.jpg" class="" alt="..."></img>
                          <div class="desc mt-2">X萬獸探險隊益智桌遊/ 算數王之戰</div>
                          <div class="price-num"> $ 300</div>
                        </div>

                      </div>
                      <div class="swiper-slide">
                        <div class="book-item">
                          <img src="https://s2.eslite.dev/unsafe/s.eslite.dev/b2b/newItem/2023/10/12/155_143447327_126_mainCoverImage1.jpg" class="" alt="..."></img>
                          <div class="desc mt-2">X萬獸探險隊益智桌遊/ 算數王之戰</div>
                          <div class="price-num"> $ 300</div>
                        </div>

                      </div>
                      
                      
                  </div>
                
                  <div class="swiper-button-prev"></div>
                  <div class="swiper-button-next"></div>
                </div>
            </div>

          <div class="container-fluid">

            <nav>
              <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">內容簡介</button>
                <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">作者介紹</button>
                <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">目錄</button>
                <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">規格</button>
                <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">延伸內容</button>
              </div>
            </nav>
            <div class="tab-content" id="nav-tabContent">
              <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                百折不撓的小宇、誠實可靠的石頭、聰明冷靜的小尚，
                以及萬能微型機器人小Z和電腦高手艾美莉所組成的X科幻冒險隊，
                將帶領大家上天下地，一探大自然的奧祕！
 
              　　變種巨蜂襲擊！
              　　X探險隊正面迎戰，激烈對決即將展開！
              
              　　X探險隊和熱衷保育的山叔一起調查動物離奇傷亡的事件，此時，體型巨大的變種蜜蜂突然襲擊眾人，並抓走山叔的孩子！小宇等人在營救的過程中，也遭到巨蜂襲擊，還被關進有如迷宮的巨大蜂巢！這些巨蜂是從哪裡來的？探險隊要如何保護夥伴，逃出危機四伏的蜂巢？
              
              本書特色
              
              　　看漫畫學知識！
              　　只要學習3步驟，趣味漫畫＋驚險故事＝開啟知識之門，培養小小科學家！
              
              　　STEP 1情境學習∣教育性★★★★★
              　　圖像式漫畫結合生動可愛的人物和驚險刺激的故事編排，加深小朋友對於科學知識的理解和如何運用在生活中，激發他們對自然與科學的好奇心。而書中團隊合作的故事，則可培養小讀者們建立勇於挑戰與冒險的精神，藉此養成體貼他人的個性。  
              </div>
              <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                ISBN：9789863019732
                叢書系列：X科幻冒險隊
                規格：平裝 / 160頁 / 17 x 23 x 0.98 cm / 普通級 / 全彩印刷 / 初版
                出版地：台灣
                本書分類：童書/青少年文學 知識學習漫畫 科學/生物/環境
                本書分類：童書/青少年文學 10-12歲
              </div>
              <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">...</div>
            </div>
          </div>

        </div>




          

        

        </div>

  )

}
