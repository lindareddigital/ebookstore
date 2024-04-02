import { cache } from 'react';
import { useEffect, useRef,useState } from 'react';
import MobileCard from 'src/pages/components/MobileCard';
import DesktopCard from 'src/pages/components/DesktopCard';
import MediaBlock from 'src/pages/components/MediaBlock';
import apiManager from 'src/pages/api/api';
import useCalc from 'src/pages/components/atoms/useCalc';
import Link from 'next/link';
import ListAside from 'src/pages/components/molecules/ListAside';
import GridList from "src/pages/polis-press/GridList";
import { useRouter } from "next/router";
import SinglePageTab from "src/pages/components/SinglePageTab";


export default function Singlepage() {
  const [recipe, setRecipe] = useState([]);
  const publisher = "ichiban";

  const router = useRouter();
  const channel = router.query.channel;
  const slug = router.query.slug;
  const page = router.query.page || 1; // Default page number is 1
  const [menu, setMenu] = useState(null);
  const [matchedMenuItem, setMatchedMenuItem] = useState(null);
  const [products, setProducts] = useState(null);
  const [productTotalCount, setProductTotalCount] = useState(null);

  console.log("", router.query);
  

 useEffect(() => {
   const fetchData = async () => {
     try {
       const res = await fetch(`/api/sitemenu/${publisher}`);

      //  const result = await res.json();
      //  console.log("res", result.data);
      setMenu(res.data.result.site_menu);

     } catch (error) {
       console.error("获取数据时出错：", error);
     }
   };

   fetchData();
 }, []);



  return (
    <div className="single-page">
      <div className="sidebtn-container">
        <div className="message-btn">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg"
            alt=""
          ></img>
        </div>
        <div className="">
          <button onclick="topFunction()" id="topBtn">
            Top
          </button>
        </div>
      </div>

      <div className="container-fluid header-main">
        <div className="header-search-bar">
          <h3>{page === "seashore" ? "海濱圖書" : "一丁文化"}</h3>
          <div className="header-toolbar">
            <div className="navbar-link">
              <Link href={{ pathname: `/` }} type="button" className="btn ">
                <img src="/icons/home.svg" alt="" />
                大邑文化
              </Link>
              <hr className="nav-hr" />
              <Link
                href={{ pathname: `/login` }}
                type="button"
                className="btn "
              >
                <img src="/icons/member.svg" alt="" />
                登入
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="home-banner">
        {publisher === "seashore" ? (
          <img src="/images/haibin.svg" className="" alt="..."></img>
        ) : (
          <img src="/images/yidin.svg" className="" alt="..."></img>
        )}
      </div>

      <div className="top-area">
        {publisher === "seashore" ? (
          <img src="/images/habinlogo.svg" className="" alt="..."></img>
        ) : (
          <img src="/images/yidinlogo.svg" className="" alt="..."></img>
        )}
        <div className="banner-title">
          《海濱圖書》為新加坡大眾書局旗下出版品牌，2017年進軍台灣致力推廣多元化食譜，藉由食譜的簡單操作方法，告訴讀者即使沒有經驗，也能製作出一道道精緻美味的美食及飲品！
        </div>
      </div>
      <div className="single-separator">
        <img
          src="/images/single-separator.svg"
          className=""
          alt="single-separator"
        ></img>
      </div>

      <div className="container-fluid">
        <div className="main-body">
          <ListAside menu={menu} />

          <div className="right-side">
            <div className="block-title">系列：X萬獸探險隊</div>
            <div className="listing-toolbar">
              <div className="amount">
                商品清單共有<span>190</span>本
              </div>

              <div className="right-side">
                <ul className="view_type">
                  顯示模式
                  <li>
                    <div
                      onClick={() => handleViewChange("grid")}
                      className="type1"
                    ></div>
                  </li>
                  <li>
                    <div
                      onClick={() => handleViewChange("list")}
                      className="type2 here"
                    ></div>
                  </li>
                </ul>
                <div className="sortselect">
                  <p>排序依</p>
                  <select
                    className="form-select"
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

      <SinglePageTab />

      <MediaBlock />
    </div>
  );
}



