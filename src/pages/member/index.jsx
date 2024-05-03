import Info from "./Info";
import Collection from "./collection";
import Notification from "./Notification";
import Message from "./message";
import Contribution from "./Contribution";
import Link from "next/link";
import { useRouter } from "next/router";
import { cache } from "react";
import { useEffect, useRef, useState } from "react";
import MenuBar from "src/pages/components/molecules/MenuBar";
import Navbar from "src/pages/components/molecules/Navbar";
import Breadcrumb from "src/pages/components/molecules/Breadcrumb";

export default function Manage({}) {
  const [tab, setTab] = useState("collection");
  const [info, setInfo] = useState(null);
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {

    if ((localStorage.getItem("email") != null)) {
      const loadInfo = async () => {
        const email = localStorage.getItem("email") || "";

        const response = await fetch(`/api/auth/getInfo`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          const data = await response.json();
          // console.log(data.data, "all data");
          const info = data?.data?.find((item) => {
            return item.email === email;
          });

          setInfo(info);
          console.log("info", info);

          localStorage.setItem("id", info?.id);

        }
      };
      loadInfo();
      setLogin(true)     
    }

    // const tokenExpiry = localStorage.getItem("tokenExpiry");

    // console.log("5566", tokenExpiry);
    // const currentTime = new Date().getTime();
    // if (currentTime >= parseInt(tokenExpiry, 10)) {
    //   localStorage.removeItem("token");
    //   localStorage.removeItem("tokenExpiry");
    //   console.log("logout");
    //   router.push(`/login`);
    // }
    
  }, []);

  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");
    localStorage.removeItem("email");

    router.push(`/`, undefined, {
      shallow: true,
    });
  };

  const renderContent = () => {
    if (tab === "info") {
      return <Info info={info} />;
    }
    //  || router.pathname === "/member/collection"
    if (tab === "collection") {
      return <Collection />;
    }

    if (tab === "notification") {
      return <Notification />;
    }
    //|| router.pathname === "/member/message"
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
        {isLogin && (
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
                  {/* router.push(`member/message`, undefined, {
                          shallow: true,
                        }); */}
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

                <div onClick={logout} className="read-more-btn">
                  登出
                  <img className="" src="/icons/viewmore.svg"></img>
                </div>
                <img className="newsbg" src="/icons/newsbg.svg"></img>
              </div>

              <div className="right-side">{renderContent()}</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}


