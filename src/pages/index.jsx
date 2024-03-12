// 'use client';
import apiManager from 'src/pages/api/api';
import HomeTab from 'src/pages/components/HomeTab';
import MediaBlock from 'src/pages/components/MediaBlock';
import SidebarWrapper from 'src/pages/components/SidebarWrapper';
import MenuBar from 'src/pages/components/molecules/MenuBar';
import Navbar from 'src/pages/components/molecules/Navbar';
import 'swiper/css';

export default function Home({data}) {
  // const swiperRef = useRef(null);

  // const { next, previous } = useSwiperFunc(swiperRef);
  // const containerRef = useRef(null);


  // `${url}/api/v1/sales?_start=${
  //   (pageNo - 1) * limitCount
  // }&_limit=${limitCount}`;

  //SWR 第一次抓取資料先將資料存至 cache (stale)，直到下一次 fetch 資料(revalidate)，才會再拿到最新的資料
  // SWR 決定要不要 refetch 取決於第一個參數 key 有沒有改變
  // const fetcher = (url, params) => fetch(url + params.id).then((r) => r.json());

  // const { data, error } = useSWR(categories, fetcher);
  // console.log(data, error, "swr");

  // to={`/?q=${keyWords}`}

  console.log('data',data);

  const posts = data.data.pages[0].blocks[0].item.posts;
  console.log("now", data.data.pages[0].blocks[0].item.posts);
  

  const block_hero = data.data.pages;
  console.log("block_hero", block_hero);




  return (
    <div class="home-page">
      <SidebarWrapper />

      <div class="sidebtn-container">
        <div id="fb-root"></div>
        <div
          class="fb-customerchat"
          attribution="setup_tool"
          page_id="101vision"
          theme_color="#6699cc"
          logged_in_greeting="Hi! How can we help you?"
          logged_out_greeting="Hi! How can we help you?"
        ></div>
        <div class="message-btn">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg"
            alt=""
          ></img>
        </div>
      </div>

      <Navbar />

      <MenuBar />


      <div class="home-banner">
        <div className="leftbox">
          <img class="topright" src="/icons/leftboxicon.svg"></img>
          <div className="">
            <div class="pin-title">最新消息</div>
            <div className="trangle"></div>
          </div>
          <div class="wrapper">
            
            {posts?.map((item) => {

              return (
                <>
                  <div class="e-banner-product">
                    <img
                      // src={`https://directus-cms.vicosys.com.hk/assets/${item.posts_id.key_image}`}
                      alt=""
                    />

                    <div class="desc">{item.posts_id.title}</div>
                    <div class="desc">{item.posts_id.tags}</div>
                  </div>
                </>
              );
            })}
          </div>

          <div className="read-more-btn">
            查看更多
            <img class="" src="/icons/viewmore.svg"></img>
          </div>
          <img class="newsbg" src="/icons/newsbg.svg"></img>
        </div>
        <div
          id="carouselExampleControls"
          class="home-banner-carousel carousel slide"
          data-bs-ride="carousel"
        >
          <div class="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              class="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="/images/banner.jpeg" class="" alt="..."></img>
            </div>
            <div class="carousel-item">
              <img src="/images/banner.jpeg" class="" alt="..."></img>
            </div>
            <div class="carousel-item">
              <img src="/images/banner.jpeg" class="" alt="..."></img>
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div class="main-body">
        {/* <ListAside categories={categories} /> */}
        <HomeTab data={data} />
        {/* <HomeTabTwo /> */}

        {/* {categories.map((item) => {
          return (
            <>
              <MobileCard props={item} />
            </>
          );
        })} */}
      </div>

      <MediaBlock data={data} />
    </div>
  );
}




const tabChange = async (id) => {
  const data = await apiManager.getCategoryList(id);
  console.log("CategoryList", data);
};


export const getServerSideProps = async () => {
  const result = await apiManager.getNew();
  // const books = await apiManager.getAllBooks();
  // const books = null;

  console.log("datadatadatadata", result);


  return { props: { data: result} };
};

