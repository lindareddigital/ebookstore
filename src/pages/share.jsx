
import Link from 'next/link';
import { cache } from 'react';
import { useEffect, useRef,useState } from 'react';
import Navbar from "src/pages/components/molecules/Navbar";
import MenuBar from "src/pages/components/molecules/MenuBar";
import Pagination from "react-bootstrap/Pagination";
import Breadcrumb from "src/pages/components/molecules/Breadcrumb";
import { useRouter } from "next/router";

export default function Share({}) {
  const [data, setData] = useState(null);
  const [media, setMedia] = useState(null);

  const [column, setColumn] = useState(null);
  const [news, setNew] = useState(null);
  const router = useRouter();
  const page = router.query.page || 1;
  const tag = router.query.tag || "";
  const limit = router.query.limit || 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch(`/api/posts`);

        const response = await fetch("/api/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            page: page,
            tag: tag,
            limit: limit,
          }),
        });

        const data = await response.json();
        setData(data?.data?.posts);

        setMedia(data?.data?.posts);

        console.log("ddata", data?.data?.posts);

        // setColumn(media);
        // setNew(media[1]?.item?.posts);

        console.log("Share", media);
      } catch (error) {
        console.error("获取数据时出错：", error);
      }
    };

    fetchData();
  }, [router]);

  const handleClick = (tag) => {
    router.push(`/share/?tag=${tag}`, undefined, {
      shallow: true,
    });
  };

  const allTags = [
    ...new Set(media?.flatMap((post) => post?.tags).filter((tag) => tag)),
  ];

  const tagsWithLength = allTags.map((tag) => {
    return {
      tag: tag,
      length: media?.filter((post) => post?.tags?.includes(tag)).length,
    };
  });

  console.log(tagsWithLength);

  console.log(allTags);
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

                {data?.map((item) => {
                  return (
                    <>
                      <div className="share-list-item overflow-hidden">
                        <Link href="/" className="post-thumb">
                          <img
                            className="q-img__image"
                            src={`https://directus-cms.vicosys.com.hk/assets/${item?.key_image?.id}?access_token=${process.env.NEXT_PUBLIC_TOKEN}`}
                            alt=""
                          ></img>
                        </Link>
                        <div className="post-info">
                          <h4 className="post-title">
                            <Link href="/" className="">
                              {item?.title}
                            </Link>
                          </h4>
                          <p className="post-excerpt">專欄主題:</p>
                          <div className="post-meta">
                            {item?.tags?.map((item) => {
                              return (
                                <div
                                  onClick={() => handleClick(item)}
                                  className="post-meta-tag category"
                                >
                                  {item}
                                </div>
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
                {tagsWithLength?.map((item) => {
                  return (
                    <>
                      <div
                        onClick={() => handleClick(item.tag)}
                        className="posts-category"
                      >
                        <div className="">{item.tag}</div>
                        <div className="">{item.length}</div>
                      </div>
                    </>
                  );
                })}
              </div>

              <div
                className="tab-pane fade"
                id="nav-profile"
                role="tabpanel"
                aria-labelledby="nav-profile-tab"
              >
                {
                  data?.map((item) => {
                    return (
                      <>
                        <div className="share-list-item overflow-hidden">
                          <Link href="/" className="post-thumb">
                            <img
                              className="q-img__image"
                              src={`https://directus-cms.vicosys.com.hk/assets/${item?.key_image?.id}?access_token=${process.env.NEXT_PUBLIC_TOKEN}`}
                              alt=""
                            ></img>
                          </Link>
                          <div className="post-info">
                            <h4 className="post-title">
                              <Link href="/" className="">
                                {item?.title}
                              </Link>
                            </h4>
                            <p className="post-excerpt">專欄主題:</p>
                            <div className="post-meta">
                              {item?.tags?.map((item) => {
                                return (
                                  <div
                                    onClick={() => handleClick(item)}
                                    className="post-meta-tag category"
                                  >
                                    {item}
                                  </div>
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
              {Math.ceil(data?.length / 5) > 1 && (
                <Paginations length={data?.length} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

