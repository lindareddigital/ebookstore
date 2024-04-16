
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
  const [menu, setMenu] = useState(null);
  const [selected, setSelected] = useState(null);

  const router = useRouter();
  const page = router.query.page || 1;
  const tag = router.query.tag || "";
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
            tag: tag,
            limit: limit,
          }),
        });

        const data = await response.json();
        setData(data?.data?.posts);
        setMenu(data?.menu?.site_menu[0]?.menu_items);
        setSelected(data?.menu?.site_menu[0]?.menu_items[0]);

        console.log(
          "ddata",
          data?.data?.posts,
          data?.menu?.site_menu[0]?.menu_items
        );

        console.log(selected);
        

      } catch (error) {
        console.error("获取数据时出错：", error);
      }
    };

    fetchData();
  }, [router]);

  const handleSelected = (item) => {
    
    setSelected(item);

        console.log("handleSelected", item,selected);
  };

  const handleClick = (tag,slug) => {
    const queryObj = {};
    if (tag) {
      queryObj.tag = tag;
    }
    if (slug) {
      queryObj.slug = slug;
    }

    router.push(
      {
        pathname: "/share",
        query: queryObj,
      },
      undefined,
      { shallow: true }
    );
  };

  const tagsWithLength = selected?.site_menu_items_id?.category?.map((item) => {
    return {
      name: item.category_id.name,
      length: data?.filter((post) =>
        post?.category?.name?.includes(item.category_id.name)
      ).length,
    };
  });

  console.log(tagsWithLength, selected?.site_menu_items_id?.category, menu);

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
                    onChange={(event) => handleSelected(event.target.value)}
                  >
                    {menu?.map((item) => (
                      <option
                        key={item.id}
                        value={item.site_menu_items_id?.title}
                      >
                        {item.site_menu_items_id?.title}
                      </option>
                    ))}
                  </select>
                </div>

                {data?.map((item) => {
                  return (
                    <>
                      <div className="share-list-item overflow-hidden">
                        <Link href={`/share/${item.id}`} className="post-thumb">
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
                        onClick={() => handleClick(item.slug)}
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

