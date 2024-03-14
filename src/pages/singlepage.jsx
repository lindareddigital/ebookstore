import { cache } from 'react';
import { useEffect, useRef,useState } from 'react';
import MobileCard from 'src/pages/components/MobileCard';
import DesktopCard from 'src/pages/components/DesktopCard';
import MediaBlock from 'src/pages/components/MediaBlock';
import apiManager from 'src/pages/api/api';
import useCalc from 'src/pages/components/atoms/useCalc';
import Link from 'next/link';
import ListAside from 'src/pages/components/molecules/ListAside';
import GridList from "src/pages/listing/GridList";
import { useRouter } from "next/router";


export default function Singlepage({ data, detail }) {
  const { mobile } = useCalc();
  const [categories, setCategories] = useState([]);
  const [recipe, setRecipe] = useState([]);

  const router = useRouter();
  const page = router.query.page;

  return (
    <div class="single-page">
      <div class="sidebtn-container">
        <div class="message-btn">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg"
            alt=""
          ></img>
        </div>
        <div class="">
          <button onclick="topFunction()" id="topBtn">
            Top
          </button>
        </div>
      </div>

      <div class="container-fluid header-main">
        <div class="header-search-bar">
          <h3>{page === "haibin" ? "海濱圖書" : "一丁文化"}</h3>
          <div class="header-toolbar">
            <div className="navbar-link">
              <Link href={{ pathname: `/` }} type="button" class="btn ">
                <img src="/icons/home.svg" alt="" />
                大邑文化
              </Link>
              <hr class="nav-hr" />
              <Link href={{ pathname: `/login` }} type="button" class="btn ">
                <img src="/icons/member.svg" alt="" />
                登入
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div class="home-banner">
        {page === "haibin" ? (
          <img src="/images/haibin.svg" class="" alt="..."></img>
        ) : (
          <img src="/images/yidin.svg" class="" alt="..."></img>
        )}
      </div>

      <div className="top-area">
        {page === "haibin" ? (
          <img src="/images/habinlogo.svg" class="" alt="..."></img>
        ) : (
          <img src="/images/yidinlogo.svg" class="" alt="..."></img>
        )}
        <div className="banner-title">
          《海濱圖書》為新加坡大眾書局旗下出版品牌，2017年進軍台灣致力推廣多元化食譜，藉由食譜的簡單操作方法，告訴讀者即使沒有經驗，也能製作出一道道精緻美味的美食及飲品！
        </div>
      </div>
      <div className="single-separator">
        <img
          src="/images/single-separator.svg"
          class=""
          alt="single-separator"
        ></img>
      </div>

      <div class="container-fluid">
        <div class="main-body">
          <ListAside data={data} />

          <div class="right-side">
            <div class="block-title">系列：X萬獸探險隊</div>
            <div class="listing-toolbar">
              <div className="amount">
                商品清單共有<span>190</span>本
              </div>

              <div className="right-side">
                <ul class="view_type">
                  顯示模式
                  <li>
                    <div
                      onClick={() => handleViewChange("grid")}
                      class="type1"
                    ></div>
                  </li>
                  <li>
                    <div
                      onClick={() => handleViewChange("list")}
                      class="type2 here"
                    ></div>
                  </li>
                </ul>
                <div class="sortselect">
                  <p>排序依</p>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>上市日期(新→舊)</option>
                    <option value="1">上市日期(舊→新)</option>
                    <option value="2">暢銷度</option>
                    <option value="3">價格(高→低)</option>
                  </select>
                </div>
              </div>
            </div>

            <GridList props={"habin"} />
          </div>
        </div>
      </div>

      <div class="block-title">美味食譜</div>
      <div class="recipe-block">
        <div class="recipe-wrapper">
          {/* {recipe.map((item) => {
            return ( */}
          <div class="recipe-card">
            <img
              src={`https://s7d1.scene7.com/is/image/mcdonalds/sausage-mcmuffin-with-egg_832x822:nutrition-calculator-tile`}
              // alt={item.title}
            ></img>
            <div class="recipe-desc">item.Title</div>
          </div>
          <div class="recipe-card">
            <img
              src={`https://s7d1.scene7.com/is/image/mcdonalds/sausage-mcmuffin-with-egg_832x822:nutrition-calculator-tile`}
              // src={`https://directus-cms.vicosys.com.hk/assets/${item.block_hero_id.image.id}?access_token=${process.env.NEXT_PUBLIC_TOKEN}`}
            ></img>
            <div class="recipe-desc">item.Title</div>
          </div>
          <div class="recipe-card">
            <img
              src={`https://s7d1.scene7.com/is/image/mcdonalds/sausage-mcmuffin-with-egg_832x822:nutrition-calculator-tile`}
            ></img>
            <div class="recipe-desc">item.Title</div>
          </div>
          <div class="recipe-card">
            <img
              src={`https://s7d1.scene7.com/is/image/mcdonalds/sausage-mcmuffin-with-egg_832x822:nutrition-calculator-tile`}
            ></img>
            <div class="recipe-desc">item.Title</div>
          </div>
          {/* );
          })} */}
        </div>
      </div>

      <MediaBlock />
    </div>
  );
}


export const getServerSideProps = async () => {
  const data = await apiManager.getNew();
  const detail = await apiManager.getDetail();

  console.log("datadatadatadata", data);

  return { props: { data, detail } };
};
