
import Info from "./Info";
import Collection from "./Collection";
import Notification from "./Notification";
import Message from "./Message";
import Contribution from "./Contribution";
import Link from "next/link";
import MediaBlock from "src/pages/components/MediaBlock";
import { useRouter } from "next/router";

import { cache } from "react";
import { useEffect, useRef, useState } from "react";
import ListAside from "src/pages/components/molecules/ListAside";
import MenuBar from "src/pages/components/molecules/MenuBar";
import Navbar from "src/pages/components/molecules/Navbar";
import Breadcrumb from "src/pages/components/molecules/Breadcrumb";

export default function Manage({ params }) {
  const [tab, setTab] = useState("");

  useEffect(() => {
    console.log("tab", id.tab);
    
  }, [tab]);

  const router = useRouter();
  const id = router.query;
  // console.log(id.tab);
  


  const renderContent = () => {
    if (tab === "info") {
      return <Info />;
    }

    if (tab === "collection" || router.query.tab === "collection") {
      return <Collection />;
    }

    if (tab === "notification") {
      return <Notification />;
    }

    if (tab === "message") {
      return <Message />;
    }

    if (tab === "contribution") {
      return <Contribution />;
    }
  };

  return (
    <>
      <div className="manage-page">
        <Navbar />
        <MenuBar />
        <Breadcrumb data={"會員中心"} />

        <div className="container-fluid">
          <div className="content">
            <div className="leftbox">
              <img className="topright" src="/icons/leftboxicon.svg"></img>
              <div className="">
                <div className="pin-title">會員中心</div>
                <div className="trangle"></div>
              </div>
              <div className="wrapper">
                <div className="e-banner-product">
                  <div
                    onClick={() => {
                      setTab("info");
                    }}
                    className="desc"
                  >
                    會員資料管理
                  </div>
                </div>
                <div className="e-banner-product">
                  <div
                    onClick={() => {
                      setTab("collection");
                    }}
                  >
                    <div className="desc">收藏書籍</div>
                  </div>
                </div>
                <div className="e-banner-product">
                  <div
                    onClick={() => {
                      setTab("notification");
                    }}
                  >
                    <div className="desc">訂閱新書通知</div>
                  </div>
                </div>
                <div className="e-banner-product">
                  <div
                    onClick={() => {
                      setTab("message");
                    }}
                  >
                    <div className="desc">訊息管理</div>
                  </div>
                </div>
                <div className="e-banner-product">
                  <div
                    onClick={() => {
                      setTab("contribution");
                    }}
                  >
                    <div className="desc">我的投稿</div>
                  </div>
                </div>
              </div>

              <div className="read-more-btn">
                登出
                <img className="" src="/icons/viewmore.svg"></img>
              </div>
              <img className="newsbg" src="/icons/newsbg.svg"></img>
            </div>

            <div className="right-side">{renderContent()}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async () => {
 
  const siteMenu = await apiManager.getSiteMenu();

  return { props: { siteMenu } };
};
