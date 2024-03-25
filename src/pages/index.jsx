import apiManager from 'src/pages/api/api';
import HomeTab from 'src/pages/components/HomeTab';
import MediaBlock from 'src/pages/components/MediaBlock';
import SidebarWrapper from 'src/pages/components/SidebarWrapper';
import MenuBar from 'src/pages/components/molecules/MenuBar';
import Navbar from 'src/pages/components/molecules/Navbar';
import 'swiper/css';
import Link from "next/link";
import handler from "src/pages/api/page.js";

export default function Home({ data, siteMenu }) {
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

  // console.log('data',data);

  const posts = data.data.pages[0].blocks[0].item.posts;
  console.log("now", data.data);

  const blocks = data.data.pages[0];
  console.log("block_hero", blocks);

  const heroBanner = blocks.blocks.find((item) => {
    return item.collection === "block_hero_group";
  });

  console.log("heroBanner", heroBanner.item.hero_cards);

  return (
    <div className="home-page">
      <SidebarWrapper />

      <div className="sidebtn-container">
        <div id="fb-root"></div>
        <div
          className="fb-customerchat"
          attribution="setup_tool"
          page_id="101vision"
          theme_color="#6699cc"
          logged_in_greeting="Hi! How can we help you?"
          logged_out_greeting="Hi! How can we help you?"
        ></div>
        <div className="message-btn">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg"
            alt=""
          ></img>
        </div>
      </div>

      <Navbar siteMenu={siteMenu} />

      <MenuBar siteMenu={siteMenu} />

      <div className="home-banner">
        <div className="leftbox">
          <img className="topright" src="/icons/leftboxicon.svg"></img>
          <div className="">
            <div className="pin-title">最新消息</div>
            <div className="trangle"></div>
          </div>
          <div className="wrapper">
            {posts?.map((item, index) => {
              return (
                <>
                  <div className="e-banner-product">
                    <img
                      // src={`https://directus-cms.vicosys.com.hk/assets/${item.posts_id.key_image}`}
                      alt=""
                    />

                    <div className="desc">{item.posts_id.title}</div>
                    <div className="desc">{item.posts_id.tags}</div>
                  </div>
                </>
              );
            })}
          </div>
          <Link href="/share" className={``}>
            <div className="read-more-btn">
              查看更多
              <img className="" src="/icons/viewmore.svg"></img>
            </div>
          </Link>
          <img className="newsbg" src="/icons/newsbg.svg"></img>
        </div>
        <div
          id="carouselExampleControls"
          className="home-banner-carousel carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            {heroBanner.item.hero_cards?.map((item, index) => {
              return (
                <>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to={index}
                    // className="active"
                    aria-current={index === 0 ? "true" : ""}
                    aria-label="Slide 1"
                    className={`${index === 0 ? "active" : ""}`}
                  ></button>
                </>
              );
            })}
            {/* <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
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
            ></button> */}
          </div>
          <div className="carousel-inner">
            {heroBanner.item.hero_cards?.map((item, index) => {
              return (
                <>
                  <Link
                    href={item.block_hero_id?.url || ""}
                    className={`carousel-item ${index === 1 ? "active" : ""}`}
                  >
                    <img
                      src={`https://directus-cms.vicosys.com.hk/assets/${item.block_hero_id.image.id}?access_token=${process.env.NEXT_PUBLIC_TOKEN}`}
                      className=""
                      alt={item.block_hero_id.headline}
                    ></img>
                  </Link>
                </>
              );
            })}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="main-body">
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
  console.log("CategoryList", data);
};


export const getServerSideProps = async () => {
  // const data = handler();
  const data = await fetch('/api/page');
  const detail = await apiManager.getProductDetail();
  const siteMenu = await apiManager.getSiteMenu();
 

  return { props: { data, detail, siteMenu } };
};

