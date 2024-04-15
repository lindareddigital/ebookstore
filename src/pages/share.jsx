
import Link from 'next/link';
import { cache } from 'react';
import { useEffect, useRef,useState } from 'react';
import Navbar from "src/pages/components/molecules/Navbar";
import MenuBar from "src/pages/components/molecules/MenuBar";
import Pagination from "react-bootstrap/Pagination";
import Breadcrumb from "src/pages/components/molecules/Breadcrumb";

export default function Share({}) {
  const [data, setData] = useState(null);
  const [media, setMedia] = useState(null);

  const [column, setColumn] = useState(null);
  const [news, setNew] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/page/home`);
        const result = await response.json();
        setData(result?.result?.pages[0].blocks);
        const media = data?.find((item) => {
          return item?.id == "3";
        });

        setMedia(media);

        // setColumn(media);
        // setNew(media[1]?.item?.posts);

        console.log("Share", media);
        console.log("ddata", data, result?.result?.pages[0].blocks);
      } catch (error) {
        console.error("获取数据时出错：", error);
      }
    };

    

    fetchData();
  }, []);

  // const allTags = column.reduce((acc, post) => {
  //   return acc.concat(post.posts_id.tags);
  // }, []);

  // console.log(allTags);
  // return null

  const Paginations = ({ length }) => {
    const pageNumbers = [];
    console.log("Paginations length", length);

    if (Number(length)) {
      for (let i = 1; i <= Math.ceil(length / 15); i++) {
        pageNumbers.push(
          <Pagination.Item
            onClick={() => {
              updatePage(i);
            }}
            key={i}
            active={i == page}
          >
            {i}
          </Pagination.Item>
        );
      }
      return (
        <Pagination>
          <Pagination.Prev
            onClick={() => {
              const prevPage = Math.max(1, Number(page) - 1);
              updatePage(prevPage);
            }}
          />
          {pageNumbers}
          <Pagination.Next
            onClick={() => {
              const nextPage = Math.min(
                Math.ceil(length / 5),
                Number(page) + 1
              );
              updatePage(nextPage);
            }}
          />
        </Pagination>
      );
    }
  };

  return (
    <div className="share-page">
      <Navbar />
      <MenuBar />
      <Breadcrumb data={"分享專欄"} />

      <div className="container-fluid">
        <div className="">
          <div className="news-tabs">
            <nav className="container-fluid">
              <div
                className="nav nav-tabs more-nav-tabs"
                id="nav-tab"
                role="tablist"
              >
                <img className="topright" src="/icons/leftboxicon.svg"></img>
                <button
                  className="nav-link active"
                  id="nav-home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-home"
                  type="button"
                  role="tab"
                  aria-controls="nav-home"
                  aria-selected="true"
                >
                  焦點新訊
                </button>
                <button
                  className="nav-link"
                  id="nav-profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-profile"
                  type="button"
                  role="tab"
                  aria-controls="nav-profile"
                  aria-selected="false"
                >
                  分享專欄
                </button>
              </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
              <div
                className="tab-pane fade show active"
                id="nav-home"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
              >
                <div className="select-bar">
                  <label className="">篩選類別</label>
                  <select className="form-select" id="floatingSelect">
                    <option value="1">請選擇</option>
                    <option value="2">2.異業合作</option>
                    <option value="3">3.帳號問題</option>
                    <option value="4">4.購書問題</option>
                  </select>
                </div>

                {media &&
                  media?.item?.posts?.map((item) => {
                    return (
                      <>
                        <div className="share-list-item overflow-hidden">
                          <Link href="/" className="post-thumb">
                            <img
                              className="q-img__image"
                              src={`https://directus-cms.vicosys.com.hk/assets/${item.posts_id.key_image.id}?access_token=${process.env.NEXT_PUBLIC_TOKEN}`}
                              alt=""
                            ></img>
                          </Link>
                          <div className="post-info">
                            <h4 className="post-title">
                              <Link href="/" className="">
                                {item.posts_id.title}
                              </Link>
                            </h4>
                            <p className="post-excerpt">專欄主題:</p>
                            <div className="post-meta">
                              {item.posts_id.tags?.map((item) => {
                                return (
                                  <Link
                                    href="/posts/events"
                                    className="post-meta-tag category"
                                  >
                                    {item}
                                  </Link>
                                );
                              })}
                              <div className="post-meta-date">
                                2023/09/22
                                <div className="dot"></div>
                                小編
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
              </div>

              <div className="posts-categories">
                <div className="posts-category">
                  <div className="">新知分享</div>
                  <div className="">0</div>
                </div>
                <Link href="" className="posts-category">
                  <div className="">文學分享</div>
                  <div className="">17</div>
                </Link>
                <Link href="" className="posts-category">
                  <div className="">趣聞分享</div>
                  <div className="">9</div>
                </Link>
                <Link href="/" className="posts-category">
                  <div className="">開放自由投稿</div>
                  <div className="">3</div>
                </Link>
              </div>

              <div
                className="tab-pane fade"
                id="nav-profile"
                role="tabpanel"
                aria-labelledby="nav-profile-tab"
              >
                {media &&
                  media?.item?.posts?.map((item) => {
                    return (
                      <>
                        <div className="share-list-item overflow-hidden">
                          <Link href="/" className="post-thumb">
                            <img
                              className="q-img__image"
                              src={`https://directus-cms.vicosys.com.hk/assets/${item.posts_id.key_image.id}?access_token=${process.env.NEXT_PUBLIC_TOKEN}`}
                              alt=""
                            ></img>
                          </Link>
                          <div className="post-info">
                            <h4 className="post-title">
                              <Link href="/" className="">
                                {item.posts_id.title}
                              </Link>
                            </h4>
                            <p className="post-excerpt">專欄主題:</p>
                            <div className="post-meta">
                              {item.posts_id.tags?.map((item) => {
                                return (
                                  <Link
                                    href="/posts/events"
                                    className="post-meta-tag category"
                                  >
                                    {item}
                                  </Link>
                                );
                              })}
                              <div className="post-meta-date">
                                2023/09/22
                                <div className="dot"></div>
                                小編
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>

            <div className="">
              <Pagination>
                <Pagination.Prev />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Item>{2}</Pagination.Item>
                <Pagination.Next />
              </Pagination>

              {/* {Math.ceil(productTotalCount / 5) > 1 && (
                <Paginations length={productTotalCount} />
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

