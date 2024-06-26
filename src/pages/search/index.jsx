
import Link from 'next/link';
import { cache } from 'react';
import { useEffect, useMemo, useState } from "react";
import Navbar from "src/components/molecules/Navbar";
import MenuBar from "src/components/molecules/MenuBar";
import Pagination from "react-bootstrap/Pagination";
import Breadcrumb from "src/components/molecules/Breadcrumb";
import { useRouter } from "next/router";
import { NextIcon } from "src/components/atoms/icons/NextIcon";
import { PrevIcon } from "src/components/atoms/icons/PrevIcon";
import ListList from "src/components/ListList";


export default function Search({}) {
  const [posts, setPosts] = useState(null);
  const [books, setBooks] = useState(null);
  const [selected, setSelected] = useState("columns");
  const [arr, setArr] = useState(null);
  const [searchStr, setSearchStr] = useState("");


  const router = useRouter();
  const page = router.query.page || 1;


  useEffect(() => {
    render();
  }, [page, router.query]);


  const render = async () => {
    const url = window.location.href;
    const decodedUrl = decodeURIComponent(url);
    const match = decodedUrl.match(/search\?([^=&]*)/);
    let decodedQuery = null;

    if (match) {
      const query = match[1];
      decodedQuery = query.split("=")[0];
    }

    // console.log("decodedQuery", decodedQuery);

    const response = await fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: decodedQuery,
        page: page,
      }),
    });

     const result = await response.json();

     setBooks(result.books.product);
     setPosts(result.posts.posts);
    //  console.log(result, posts, books);
     setArr([
       result.posts?.posts_aggregated?.[0].count?.id,
       result.books?.product_aggregated?.[0].count?.id,
     ]);
    //  console.log('arr',arr);
     
  };

   const length = useMemo(() => {
    if (arr && arr.length >= 2) {
      return selected === "column" ? arr[0] : arr[1];
    } else {
      return null;
    }
   }, [selected]);
    // console.log("length", length);
   

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
    // console.log("Paginations length", length);

    if (Number(length)) {
      for (let i = 1; i <= Math.ceil(length / 15); i++) {
        pageNumbers.push(
          <li
            key={i}
            onClick={() => {
              updatePage(i);
            }}
            className={`page-item ${i == page ? "active" : ""}`}
          >
            <div className="page-link">
              {i}
              <span className="visually-hidden">(current)</span>
            </div>
          </li>
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
                Math.ceil(length / 15),
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

                {posts?.map((item,index) => {
                  return (
                    <div key={index} className="share-list-item overflow-hidden">
                      <Link
                        href={`/columns/${item.id}`}
                        className="post-thumb"
                      >
                        <img
                          className="q-img__image"
                          src={`${process.env.NEXT_PUBLIC_API_URL}/assets/${item?.key_image?.id}?access_token=${process.env.NEXT_PUBLIC_TOKEN}`}
                          alt=""
                        ></img>
                      </Link>
                      <div className="post-info">
                        <h4 className="post-title">
                          <Link href={`/columns/${item.id}`} className="">
                            {item?.title}
                          </Link>
                        </h4>
                        <p className="post-excerpt">專欄主題:</p>
                        <div className="post-meta">
                          {item?.tags?.map((item,index) => {
                            return (
                              <div key={index} className="post-meta-tag category">
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
              {Math.ceil(length / 15) > 1 && <Paginations length={length} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

