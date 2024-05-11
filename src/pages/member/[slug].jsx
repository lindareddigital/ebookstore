import Info from "../../components/member/Info";
import Collection from "../../components/member/Collection";
import Notification from "../../components/member/Notification";
import Message from "../../components/member/Message";
import Contribution from "../../components/member/Contribution";
import Link from "next/link";
import { useRouter } from "next/router";
import { cache } from "react";
import { useEffect, useRef, useState } from "react";
import MenuBar from "src/components/molecules/MenuBar";
import Navbar from "src/components/molecules/Navbar";
import Breadcrumb from "src/components/molecules/Breadcrumb";

export default function slug({}) {
  const router = useRouter();
  const [info, setInfo] = useState(null);
  const [isLogin, setLogin] = useState(false);
  const tab = router.query.slug;

  // console.log('tab',tab);
  

  useEffect(() => {
    if (localStorage.getItem("email") != null) {
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
          const res = await response.json();
          // console.log(data.data, "all data");
          const info = res?.data?.find((item) => {
            return item.email === email;
          });

          setInfo(info);
          console.log("info", info);

          localStorage.setItem("id", info?.id);
        }
      };
      loadInfo();
      setLogin(true);
    }
  }, []);

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
    if (tab === "collection") {
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
                    <Link href="/member/info" className="desc">
                      會員資料管理
                    </Link>
                  </div>
                  <div className="e-banner-product">
                    <Link href="/member/collection">
                      <div className="desc">收藏書籍</div>
                    </Link>
                  </div>
                  <div className="e-banner-product">
                    <Link href="/member/notification">
                      <div className="desc">訂閱新書通知</div>
                    </Link>
                  </div>
                  <div className="e-banner-product">
                    <Link href="/member/message">
                      <div className="desc">訊息管理</div>
                    </Link>
                  </div>
                  <div className="e-banner-product">
                    <Link href="/member/contribution">
                      <div className="desc">我的投稿</div>
                    </Link>
                  </div>
                </div>

                <div onClick={logout} className="read-more-btn">
                  登出
                  <img className="" src="/icons/viewmore.svg"></img>
                </div>
                <img className="newsbg" src="/icons/newsbg.svg"></img>
              </div>

              <div className="right-side">
                {renderContent()}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
