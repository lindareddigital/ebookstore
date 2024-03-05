
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
import NextAuth from "next-auth";
import MenuBar from "src/pages/components/molecules/MenuBar";
import Navbar from "src/pages/components/molecules/Navbar";
import Breadcrumb from "src/pages/components/molecules/Breadcrumb";

export default function Manage({ params }) {
  const [tab, setTab] = useState("");

  useEffect(() => {
    console.log('tab',tab);
    
    
  }, [tab]);

  const router = useRouter();
  const id = router.query;
  console.log(id.tab);
  


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
      <div class="manage-page">
        <Navbar />
        <MenuBar />
        <Breadcrumb />

        <div class="container-fluid">
          <div class="content">
            <div className="leftbox">
              <img class="topright" src="/icons/leftboxicon.svg"></img>
              <div className="">
                <div class="pin-title">最新消息</div>
                <div className="trangle"></div>
              </div>
              <div class="wrapper">
                <div class="e-banner-product">
                  <div
                    onClick={() => {
                      setTab("info");
                    }}
                    class="desc"
                  >
                    會員資料管理
                  </div>
                </div>
                <div class="e-banner-product">
                  <div
                    onClick={() => {
                      setTab("collection");
                    }}
                  >
                    <div class="desc">收藏書籍</div>
                  </div>
                </div>
                <div class="e-banner-product">
                  <div
                    onClick={() => {
                      setTab("notification");
                    }}
                  >
                    <div class="desc">訂閱新書通知</div>
                  </div>
                </div>
                <div class="e-banner-product">
                  <div
                    onClick={() => {
                      setTab("message");
                    }}
                  >
                    <div class="desc">訊息管理</div>
                  </div>
                </div>
                <div class="e-banner-product">
                  <div
                    onClick={() => {
                      setTab("contribution");
                    }}
                  >
                    <div class="desc">我的投稿</div>
                  </div>
                </div>
              </div>

              <div className="read-more-btn">
                登出
                <img class="" src="/icons/viewmore.svg"></img>
              </div>
              <img class="newsbg" src="/icons/newsbg.svg"></img>
            </div>

            <div class="right-side">{renderContent()}</div>
          </div>
        </div>
      </div>
    </>
  );
}
