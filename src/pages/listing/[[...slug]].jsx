import { cache } from 'react';
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Link from 'next/link';
import apiManager from 'src/pages/api/api';
import GridList from "./GridList";
import ListList from "./ListList";
import SidebarWrapper from 'src/pages/components/SidebarWrapper';
import MenuBar from 'src/pages/components/molecules/MenuBar';
import ListAside from 'src/pages/components/molecules/ListAside';
import Navbar from "src/pages/components/molecules/Navbar";
import Panel from "src/pages/components/atoms/Panel";
import { useRouter } from "next/router";
import { createDirectus, rest, graphql, readItems } from "@directus/sdk";
import { redirect } from "next/navigation";


export default function Listing({ data, detail, siteMenu, slugProduct }) {
  const [panel, setPanel] = useState(false);
  const [dataFromChild, setDataFromChild] = useState('');
  const [ans, setAns] = useState({title: 'all'});

  const [currentView, setCurrentView] = useState("grid");
  const router = useRouter();
  const books = detail.data;

  // const fetchData = async () => {
  //   try {
  //     const res = await apiManager.test();
  //     console.log('resresres',res);
  //   } catch (error) {
  //   }
  // };

  // fetchData();


  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = async () => {
    try {
      console.log("正在獲取數據...");

      const client = createDirectus(
        "https://directus-cms.vicosys.com.hk"
      ).with(graphql());

        const query = `
  query {
   product(filter: {
       tags: {
           category_id: {
               id: {
                  _in: ["c9b9c5dc-8513-4282-af5b-366fc912dc61", "59e8483c-019c-482f-b2a1-f9f3b6dcbe21"]
               }
           }
       }
   }) {
       id
       title
       keyword
       series
       tags {
           id
           category_id {
               id
           }
       }
   }
}
`;
        // Make the GraphQL query using the Directus client
        client.graphql
          .query(query)
          .then((response) => {
            const result = response.data;
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });

      // const result = await client.request(
      //   readItems("product", {
      //     filter: {
      //       tags: {
      //         category_id: {
      //           id: {
      //             _in: [
      //               "c9b9c5dc-8513-4282-af5b-366fc912dc61",
      //               "59e8483c-019c-482f-b2a1-f9f3b6dcbe21",
      //             ],
      //           },
      //         },
      //       },
      //     },
      //     fields: [
            
      //       'id',
      //       'title',
      //       'keyword',
      //       'series',
            
      //       // tags:[
      //       //   id:{
      //       //     category_id :[
      //       //       id
      //       //     ]
      //       //   }
      //       ],
      //   //},
      //   })
      // );

      // console.log("結果", result);
    } catch (error) {
      console.error("獲取數據時出錯:", error);
    }
  };



  const sendDataToParent = (data) => {
    console.log("Data from ListAside:", data);
    setDataFromChild(data);
  };

  const fetchSlug = () => {   
    console.log("slugProduct", slugProduct);

    const ans = slugProduct.data.find((item) => {
      // console.log("item",item)

      console.log("item", item.slug, " router", router.query?.slug);
      // console.log("", router.query.slug.includes(item.slug));
      
      return router.query?.slug?.includes(item.slug);
    });

    setAns(ans);

    console.log("ans", ans);
  };

  useEffect(() => {
    console.log("Query changed:", router.query);
    fetchSlug();
  }, [router.query]);

  const filterData = useMemo(() => {
    console.log("memo", router.query, router.query?.slug?.includes("all"));

    if (!books) {
      return [];
    } else if (router.query?.slug?.includes("all")) {
      setDataFromChild("");
      return books;
    } else {
      console.log(
        "change tab",
        // books,
        books.filter((item) => item.series === ans?.title)
      );
      return books.filter((item) => item.series === ans?.title);
    }
  }, [router.query, books]);

  const series = data.data.product.reduce((acc, item) => {
    return acc.concat(item.series);
  }, []);

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const closePanel = () => {
    setPanel(false);
  };

  const openPanel = () => {
    setPanel(true);
  };

  return (
    <div className="listing-page">
      <Navbar siteMenu={siteMenu} />
      <MenuBar siteMenu={siteMenu} sendDataToParent={sendDataToParent} />
      <div className="listing-banner">
        {/* <img
          src=""
          className="d-block w-100 h-100"
          alt="..."
        ></img> */}
      </div>

      <div className="container-fluid">
        <div className="main-body">
          <SidebarWrapper />
          <ListAside
            siteMenu={siteMenu}
            data={data}
            detail={detail}
            sendDataToParent={sendDataToParent}
          />
          <div className="right-side">
            {dataFromChild != "" && (
              <div className="block-title">系列： {dataFromChild}</div>
            )}
            <div className="listing-toolbar">
              <div className="amount">
                商品清單共有<span>{filterData.length}</span>本
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
                    defaultValue={"DEFAULT"}
                  >
                    <option value="DEFAULT">上市日期(新→舊)</option>
                    <option value="1">上市日期(舊→新)</option>
                    <option value="2">暢銷度</option>
                    <option value="3">價格(高→低)</option>
                  </select>
                </div>
              </div>
            </div>

            {currentView === "grid" && <GridList books={filterData} />}

            {currentView === "list" && <ListList books={filterData} />}
          </div>

          <div className={`pannel-container ${panel ? "back-filter" : ""}`}>
            {panel && (
              <div className="filter-area list-aside">
                <button className="btn" onClick={closePanel}>
                  <img src="/icons/close.svg" alt="" />
                </button>
                <ul className="">
                  <div className="title">依類別搜尋</div>
                  {series.map((item, index) => (
                    <li key={index}>
                      <div
                        onClick={() => sendDataToParent(item)}
                        key={`${index}`}
                      >
                        {item}
                      </div>
                    </li>
                  ))}
                </ul>

                <ul>
                  <div className="title">依系列搜尋</div>

                  <li>
                    <Link href="">X星際探險隊</Link>
                  </li>
                  <li>
                    <Link href="">X萬獸探險隊</Link>
                  </li>
                  <li>
                    <Link href="">X恐龍探險隊</Link>
                  </li>
                </ul>
              </div>
            )}

            <ul className="panel-btn">
              <li onClick={openPanel}>
                <img src="/icons/filter.svg" alt="" />
                篩選
              </li>
              <li>
                <img src="/icons/sort.svg" alt="" />
                排序
              </li>
              <li onClick={() => handleViewChange("grid")}>
                <img src="/icons/gridview.svg" alt="" />
                小圖
              </li>
              <li onClick={() => handleViewChange("list")}>
                <img src="/icons/listview.svg" alt="" />
                列表
              </li>
            </ul>
          </div>
          <Panel />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const result = await apiManager.getNew();
  const detail = await apiManager.getDetail();
  const siteMenu = await apiManager.getSiteMenu();
  const slugProduct = await apiManager.getSlugProduct();


  return { props: { data: result, detail, siteMenu, slugProduct } };
};


export const sdk = async () => {

 

  console.log("sdksdksdksdk", result);
  


};


