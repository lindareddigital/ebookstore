import Navbar from "src/pages/components/molecules/Navbar";
import MenuBar from "src/pages/components/molecules/MenuBar";
import Breadcrumb from "src/pages/components/molecules/Breadcrumb";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Download() {
  const router = useRouter();

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/page/download");

        const result = await response.json();
          setData(result?.result?.pages?.[0]);
        // console.log("ddata", data, data?.blocks);
      } catch (error) {
        console.error("获取数据时出错：", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="contactus-page">
      <Navbar />
      <MenuBar />
      <Breadcrumb data={"書單下載"} />
      <div className="">
        <div className="download form-area">
          {data?.blocks?.map((block) => (
            <>
              <div key={block.id} className="block-title">
                <div className="dot"></div>
                {block?.item?.title}
              </div>

              {block?.item?.download_item?.map((item) => (
                <div key={item.id} className="">
                  <div className="input-group">
                    <input
                      placeholder={item?.title}
                      className="form-control"
                      type="text"
                    ></input>
                    <Link
                      target="_blank"
                      href={
                        !item?.external_url
                          ? `https://directus-cms.vicosys.com.hk/assets/${item?.file?.id}?access_token=${process.env.NEXT_PUBLIC_TOKEN}`
                          : item?.external_url
                      }
                      button
                      className="search-btn"
                    >
                      <img src="/icons/download.svg"></img>
                      下載
                    </Link>
                  </div>
                </div>
              ))}
            </>
          ))}

          {/* <div className="">
            <div className="input-group">
              <input
                placeholder="大邑文化書單"
                className="form-control"
                type="text"
              ></input>
              <button className="search-btn" type="submit">
                <img src="/icons/download.svg"></img>
                下載
              </button>
            </div>
          </div>
          <div className="">
            <div className="input-group">
              <input
                placeholder="海濱圖書書單"
                className="form-control"
                type="text"
              ></input>
              <button className="search-btn" type="submit">
                <img src="/icons/download.svg"></img>
                下載
              </button>
            </div>
          </div>
          <div className="">
            <div className="input-group">
              <input
                placeholder="海濱圖書書單"
                className="form-control"
                type="text"
              ></input>
              <button className="search-btn" type="submit">
                <img src="/icons/download.svg"></img>
                下載
              </button>
            </div>
          </div>

          <div className="block-title">
            <div className="dot"></div>教案下載
          </div> */}

          {/* <div className="">
            <div className="input-group">
              <input
                placeholder="大邑文化書單"
                className="form-control"
                type="text"
              ></input>
              <button className="search-btn" type="submit">
                <img src="/icons/download.svg"></img>
                下載
              </button>
            </div>
          </div>
          <div className="">
            <div className="input-group">
              <input
                placeholder="海濱圖書書單"
                className="form-control"
                type="text"
              ></input>
              <button className="search-btn" type="submit">
                <img src="/icons/download.svg"></img>
                下載
              </button>
            </div>
          </div>
          <div className="">
            <div className="input-group">
              <input
                placeholder="海濱圖書書單"
                className="form-control"
                type="text"
              ></input>
              <button className="search-btn" type="submit">
                <img src="/icons/download.svg"></img>
                下載
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
