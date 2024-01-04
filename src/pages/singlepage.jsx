/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { cache } from 'react';
import { useEffect, useRef,useState } from 'react';
import MobileCard from '@/pages/components/MobileCard';
import DesktopCard from '@/pages/components/DesktopCard';
import MediaBlock from '@/pages/components/MediaBlock';
import apiManager from '@/pages/api/api';
import useCalc from '@/pages/components/atoms/useCalc';
import Link from 'next/link';






export default function Singlepage() {
  const { mobile } = useCalc();
  const [categories, setCategories] = useState([]);
  const [recipe, setRecipe] = useState([]);

  const getCategory = (async () => {
    try {
      const data = await apiManager.getHaibinCategory();
     
      const uniqueCategories = data.data.reduce((acc, current) => {
      const x = acc.find(item => item.Category === current.Category);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
      console.log(uniqueCategories,'7788');
      setCategories(uniqueCategories)
      return data;
    } catch (e) {
      console.log('error', e);
    }
  });

  // const getAllCategory = (async () => {
  //   try {
  //     const data = await apiManager.getAllCategory();
  //     console.log(data);
  //     setCategories(data.data)
  //     return data;
  //   } catch (e) {
  //     console.log('error', e);
  //   }
  // });

  const getRecipe = (async () => {
    try {
      const data = await apiManager.getRecipe();
      console.log(data.data,'66');
      setRecipe(data.data)
      // return data;
    } catch (e) {
      console.log('error', e);
    }
  });

  

  useEffect(() => {
    // getAllCategory()
    getCategory()
    getRecipe()
  }, []);


  return(
    <div class="single-page">


      <div class="sidebtn-container">
        <div class="message-btn">
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg" alt=""></img>
        </div>
        <div class="">
          <button onclick="topFunction()" id="topBtn">Top</button>
        </div>
      </div>
      <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Navbar</a>
          <a href="/member" class="span align-items-center icon-fa-user-circle icon face-icon face-icon-white" title="" target="_self" aria-label="會員中心"></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
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
            <img class="logo" src="./images/logo.jpeg" alt=""></img>
            <div class="">
             
              <form class="input-group">
                
              

                <div class="header-toolbar">
                  <Link href={{pathname:`/`}} type="button" class="btn ">
                    <i class="fa fa-home mr-2" aria-hidden="true"></i>
                    回首頁(大邑)
                  </Link>

                  <div class="">XXX,您好</div>  
                </div>
              </form>
              
            </div>
          </div>   
         

        </div>

        


        <div class="home-banner">

          <div id="carouselExampleControls" class="home-banner-carousel carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="https://s2.eslite.dev/unsafe/s.eslite.dev/2uoe0qjpbv2fhogg4qtn09ramz1e" class="d-block w-100 h-100" alt="..."></img>
              </div>
              <div class="carousel-item">
                <img src="https://s2.eslite.dev/unsafe/s.eslite.dev/2uoe0qjpbv2fhogg4qtn09ramz1e" class="d-block w-100" alt="..."></img>
              </div>
              <div class="carousel-item">
                <img src="https://s2.eslite.dev/unsafe/s.eslite.dev/2uoe0qjpbv2fhogg4qtn09ramz1e" class="d-block w-100" alt="..."></img>
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
              <li>
                <a href="">知識漫畫</a>
              </li>
              <li>
                <a href="">兒童文學</a>
              </li>
              <li>
                <a href="">益智桌遊</a>
              </li>
              <li>
                <a href="">美妝贈品</a>
              </li>
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
                    <li>
                      <a href=""></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div> 
          </aside>


          <div class="right-side">

            {categories.map((item) => {
              console.log(item,'item');
              if(mobile)
              return (<MobileCard category={item.Category}/>);
              return (<DesktopCard category={item.Category} />);
            })}




          </div>


          </div>
        </div>

 

        <MediaBlock/>

        <div class="container-fluid media-block">


          <div class="yt-block">


            <iframe width="560" height="334" src="https://www.youtube.com/embed/55R1KVI4h74?si=qr6If8TgjJ425APu" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            <div class="more">
              <iframe width="260" height="165" src="https://www.youtube.com/embed/H4uG7XiXf78?si=HUo2Q9ujcf2kAY8n" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
              <iframe width="260" height="165" src="https://www.youtube.com/embed/H4uG7XiXf78?si=HUo2Q9ujcf2kAY8n" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
         
          </div>
        
        </div>


          <div class="recipe-title">美味食譜</div>
          <div class="recipe-block">
            <div class="container-fluid recipe-wrapper">
                  {recipe.map((item) => {
                    return (
                      <div class="recipe-card">

                        <img src={`http://localhost:8055/assets/${item.PrimaryImage}`} alt={item.title}></img>
                        <div class="recipe-desc">{item.Title}</div>
                      </div>
                      );
                  })}
                
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
