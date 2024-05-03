
import Link from 'next/link';
import { cache } from 'react';
import { useEffect, useMemo, useState } from "react";
import Navbar from "src/pages/components/molecules/Navbar";
import MenuBar from "src/pages/components/molecules/MenuBar";
import Pagination from "react-bootstrap/Pagination";
import Breadcrumb from "src/pages/components/molecules/Breadcrumb";
import { useRouter } from "next/router";
import { NextIcon } from "src/pages/components/atoms/icons/NextIcon";
import { PrevIcon } from "src/pages/components/atoms/icons/PrevIcon";
import ListList from "src/pages/components/ListList";


export default function Search({}) {
  const [posts, setPosts] = useState(null);
  const [books, setBooks] = useState(null);
  const [selected, setSelected] = useState("columns");
  let arr = [];

  const router = useRouter();
  const page = router.query.page || 1;
  const limit = router.query.limit || 5;


  useEffect(() => {
    render()
  }, [router]);


   const render = async () => {
     const url = window.location.href;
     const decodedQuery = decodeURIComponent(url.split("?")[1]);
    //  console.log(decodedQuery);

     const response = await fetch("/api/search", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         input: decodedQuery,
       }),
     });

     const result = await response.json();

     setBooks(result.books.product);
     setPosts(result.posts.posts);
     console.log(result, posts, books);
     arr.push(result.posts?.posts_aggregated?.[0].count?.id);
     arr.push(result.books?.product_aggregated?.[0].count?.id);
     console.log('arr',arr);
     
     
     // books.product_aggregated[0].count.id
     // posts.posts_aggregated[0].count.id
   };

   const length = useMemo(() => {
     return selected === "column" ? arr[0] : arr[1]
   }, [selected]);
        console.log("arr", arr);
       console.log("length", length);
   

  const handleSelected = (item) => {
    setSelected(item);
    // console.log("handleSelected",selected);
  };

  const handleClick = (category) => {
    console.log("click", category);  
    const queryObj = {};
    if (category) {
      queryObj.category = category;
    }

    router.push(
      {
        pathname: "/search",
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
      <Breadcrumb data={"搜尋結果"} />

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
                  className={`nav-link ${
                    selected === "columns" ? "active" : ""
                  }`}
                  id="nav-home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-posts"
                  type="button"
                  role="tab"
                  aria-controls="nav-posts"
                  aria-selected="true"
                  onClick={() => handleSelected("columns")}
                >
                  專欄
                </button>
                <button
                  className={`nav-link ${selected === "books" ? "active" : ""}`}
                  id="nav-home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-books"
                  type="button"
                  role="tab"
                  aria-controls="nav-books"
                  aria-selected="true"
                  onClick={() => handleSelected("books")}
                >
                  書籍
                </button>
              </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
              <div
                className="tab-pane search-tab-pane fade show active"
                id="nav-posts"
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
                    <option value={"columns"}>專欄</option>
                    <option value={"books"}>書籍</option>
                  </select>
                </div>

                {posts?.map((item) => {
                  return (
                    <>
                      <div className="share-list-item overflow-hidden">
                        <Link
                          href={`/columns/${item.id}`}
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

              <div
                className="tab-pane search-tab-pane fade"
                id="nav-books"
                role="tabpanel"
                aria-labelledby="nav-books-tab"
              >
                {books && 
                <ListList books={books} />
                }
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

