
import Link from 'next/link';
import { cache } from 'react';
import { useEffect, useRef,useState } from 'react';
import Navbar from "src/pages/components/molecules/Navbar";
import MenuBar from "src/pages/components/molecules/MenuBar";
import Pagination from "react-bootstrap/Pagination";
import Breadcrumb from "src/pages/components/molecules/Breadcrumb";
import { useRouter } from "next/router";
import { NextIcon } from "src/pages/components/atoms/icons/NextIcon";
import { PrevIcon } from "src/pages/components/atoms/icons/PrevIcon";

export default function Share({}) {
  const [data, setData] = useState(null);
  const [allPost, setAllPost] = useState(null);
  const [menu, setMenu] = useState(null);
  const [selected, setSelected] = useState(null);
  const [length, setLength] = useState(0);

  const router = useRouter();
  const page = router.query.page || 1;
  const category = router.query.category || "";
  const limit = router.query.limit || 5;
  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await fetch("/api/posts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              page: page,
              category: category,
              limit: limit,
            }),
          });

          const data = await response.json();
          setData(data?.data?.posts);
          setMenu(data?.menu?.site_menu[0]?.menu_items);
          setSelected(data?.menu?.site_menu[0]?.menu_items[0]);
          setLength(data?.data?.posts_aggregated[0]?.countDistinct?.id);
          console.log(
            "ddata",
            data?.data?.posts,
            data?.data?.posts_aggregated[0]?.countDistinct?.id,

            data?.menu?.site_menu[0]?.menu_items
          );

          console.log(selected);
        } catch (error) {
          console.error("获取数据时出错：", error);
        }
    };

    const fetchAll = async () => {
      try {
        const response = await fetch(`api/allPosts`);

        const data = await response.json();
        setAllPost(data?.data?.posts);
  
        console.log(
          "ALL",
          data?.data?.posts,
     
        );

      } catch (error) {
        console.error("获取数据时出错：", error);
      }
    };

    fetchAll();

    fetchData();
  }, [router]);

  const handleSelected = (item) => {
    setSelected(item);
    console.log("handleSelected", item,selected);
  };

  const handleClick = (category) => {
    console.log("click", category);  
    const queryObj = {};
    if (category) {
      queryObj.category = category;
    }

    router.push(
      {
        pathname: "/column",
        query: queryObj,
      },
      undefined,
      { shallow: true }
    );
  };

  const updatePage = (i) => {
    console.log("updatePage", i);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: i },
    });
  };

  const tagsWithLength = selected?.site_menu_items_id?.category?.map((item) => {
    return {
      name: item.category_id.name,
      length: allPost?.filter((post) =>
        post?.category?.name?.includes(item.category_id.name)
      ).length,
      category_id: item.category_id.id,
    };
  });

  console.log(tagsWithLength, selected?.site_menu_items_id?.category, menu);

  const Paginations = ({ length }) => {
    const pageNumbers = [];
    console.log("Paginations length", length);

    if (Number(length)) {
      for (let i = 1; i <= Math.ceil(length / 5); i++) {
        pageNumbers.push(
          <>
            <li
              onClick={() => {
                updatePage(i);
              }}
              className={`page-item ${i == page ? "active" : ""}`}
            >
              <div class="page-link">
                {i}
                <span class="visually-hidden">(current)</span>
              </div>
            </li>
          </>
        );
      }
      return (
        <Pagination>
          <div
            onClick={() => {
              const prevPage = Math.max(1, Number(page) - 1);
              updatePage(prevPage);
            }}
            className=""
          >
            <PrevIcon />
          </div>
          {pageNumbers}
          <div
            onClick={() => {
              const nextPage = Math.min(
                Math.ceil(length / 5),
                Number(page) + 1
              );
              updatePage(nextPage);
            }}
            className=""
          >
            <NextIcon />
          </div>
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

                {menu?.map((item) => (
                  <button
                    className={`nav-link ${
                      selected?.site_menu_items_id?.title ===
                      item?.site_menu_items_id?.title
                        ? "active"
                        : ""
                    }`}
                    id="nav-home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-home"
                    type="button"
                    role="tab"
                    aria-controls="nav-home"
                    aria-selected="true"
                    onClick={() => handleSelected(item)}
                  >
                    {item?.site_menu_items_id?.title}
                  </button>
                ))}
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
                  <select
                    className="form-select"
                    id="floatingSelect"
                    onChange={(event) => handleClick(event.target.value)}
                  >
                    {tagsWithLength?.map((item) => (
                      <option key={item?.category_id} value={item?.category_id}>
                        {item?.name}
                      </option>
                    ))}
                  </select>
                </div>

                {data?.map((item) => {
                  return (
                    <>
                      <div className="share-list-item overflow-hidden">
                        <Link
                          href={`/column/${item.id}`}
                          className="post-thumb"
                        >
                          <img
                            className="q-img__image"
                            src={`https://directus-cms.vicosys.com.hk/assets/${item?.key_image?.id}?access_token=${process.env.NEXT_PUBLIC_TOKEN}`}
                            alt=""
                          ></img>
                        </Link>
                        <div className="post-info">
                          <h4 className="post-title">
                            <Link href={`/column/${item.id}`} className="">
                              {item?.title}
                            </Link>
                          </h4>
                          <p className="post-excerpt">專欄主題:</p>
                          <div className="post-meta">
                            {item?.tags?.map((item) => {
                              return (
                                <div className="post-meta-tag category">
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
                        onClick={() => handleClick(item.category_id)}
                        className="posts-category"
                      >
                        <div className="">{item.name}</div>
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
                                <div className="post-meta-tag category">
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
              {Math.ceil(length / 5) > 1 && <Paginations length={length} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

