import { useEffect, useRef, useState, useMemo } from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';
import Desc from "./Desc";
import MenuBar from 'src/components/molecules/MenuBar';
import Head from 'next/head';
import HomeTab from "src/components/HomeTab";
import GalleryModal from "src/components/GalleryModal";
import Navbar from "src/components/molecules/Navbar";
import Breadcrumb from "src/components/molecules/Breadcrumb";
import Error from "next/error";

export default function Detail({}) {
  const [show, setShow] = useState(false);
  const [item, setItem] = useState(null);
  const [books, setBooks] = useState(null);

  const router = useRouter();
  const id = router.query.slug;

  // console.log("id", id);
  const [filteredData, setFilteredData] = useState(books);

  const [userId, setId] = useState("");
  const [arr, setArr] = useState([]);
  const [bookMark, setBookMark] = useState(null);
  const [isLogin, setLogin] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/product/${id}`);
        const result = await res.json();
        // console.log("res", result.data.product[0]);      
        setItem(result.data.product[0]);
        return result
        
      } catch (error) {
        // console.error("", error);
      }
    };
    fetchData();

    const getProductsByCategory = async (categoryIds) => {

      const response = await fetch(`/api/product/category`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sort_by: ["-date_created"],
            publisher_slug: "polis-press",
            category_id: categoryIds,
            page: 1,
            limit: 5,
          }),
        });
        const books = await response.json();
        setBooks(books?.result?.product);
        return books
        // console.log("books", books.result.product);
    }

    const getDetailData = async () => {
      const result = await fetchData(); 
      // console.log(result);
           
      const categoryIds = result?.data?.product?.[0]?.tags?.map(
        (category) => category.category_id.id
      );
      // console.log("70", categoryIds);

      if (categoryIds) {
        const result = await getProductsByCategory(categoryIds);
        // console.log('76',result);        
        setBooks(result?.result?.product);
      }
    };

    getDetailData();      
  }, [id]);


  useEffect(() => {
    const userId = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    setId(userId);

    const getUserBookMark = async () => {
      const response = await fetch(`/api/bookmark/getUserBookMark`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userId,
          token: token,
        }),
      });
      const books = await response.json();

      if (!books?.result?.user_bookmark) return
        // console.log("user_bookmark", books?.result?.user_bookmark);
      // console.log(token);
      setLogin(true);
      if (token) {
        setBookMark(books?.result?.user_bookmark);
      }

      const productIds = books?.result?.user_bookmark?.map(
        (item) => item.product.id
      );

      setArr(productIds);
      // console.log("arr", arr);
    };  
    if(token){
      getUserBookMark();
    }    

    const filterByPublisher = async () => {
      if (!arr || arr.length === 0) {
        return;
      }
      const response = await fetch(`/api/product/publisher/polis-press`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          publisher: "polis-press",
        }),
      });

      const books = await response.json();
      // console.log(books?.result?.product, "all books");

      if (router.pathname.includes("/member")) {
        const filteredData = books?.result?.product?.filter((item) => {
          return arr?.includes(item.id);
        });
        setFilteredData(filteredData);
        // console.log(filteredData, "filteredData");
      }
    };

    filterByPublisher();
  }, [arr]);

    const handleChange = async (item) => {
      // console.log("click item.id", item.id);

      // console.log("bookMark", bookMark);

      const selected = bookMark?.find((book) => book.product.id === item.id);
      // console.log("selected", selected);

      const token = localStorage.getItem("token");

      if (selected != undefined) {
        //delete
        const response = await fetch(`/api/bookmark/deleteBookMark`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token,
            user: userId,
            product: item.id,
            id: selected?.id,
          }),
        });
        if (response.status === 204) {
          console.log("Bookmark deleted successfully.");
        }
      } else {
        //add
        const response = await fetch(`/api/bookmark/addBookMark`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token,
            user: userId,
            product: item.id,
            id: selected?.id,
          }),
        });
        const data = await response.json();
        console.log("add func", data);
      }

    };

  // console.log("detaildetail", item);

  if (!item) {
    return <Error statusCode={404} />;
  }

  return (
    <div>
      {item != null && (
        <div className="detail-page">
          <Head>
            <title>{item.title}</title>
            {item?.meta?.map((item, index) => {
              return (
                <meta key={index} property={item.key} content={item.value} />
              );
            })}
          </Head>
          <Navbar />
          <MenuBar />
          <div className="container-fluid fdc">
            <Breadcrumb data={item.series} />

            <div className="detail">
              <div className="content">
                <>
                  <img
                    onClick={() => setShow(true)}
                    src={`${process.env.NEXT_PUBLIC_API_URL}/assets/${item?.cover_image?.id}?access_token=${process.env.NEXT_PUBLIC_TOKEN}`}
                    className="primary-img"
                    alt={item.cover_image}
                  />

                  <div className="info">
                    <h1>{item.title}</h1>
                    <ul>
                      <li>
                        作者：<Link href="">{item.Author}</Link>
                      </li>
                      <li>
                        繪者：<Link href="/">{item.illustrator}</Link>
                      </li>
                      <li>出版日期：{item.publicationDate}</li>
                      <li>定價：{item.price}元</li>
                    </ul>
                    <div className="button-group">
                      <div
                        onClick={() => {
                          handleChange(item);
                        }}
                        className={` btn button-radius ${
                          arr?.includes(item?.id) ? "wish-active" : ""
                        }`}
                      >
                        <img src="/icons/heart.svg" alt="" />
                        {arr?.includes(item?.id) ? "取消收藏" : "收藏此書"}
                      </div>
                      <div className="btn button-radius view-detail-btn">
                        <img src="/icons/search.svg" alt="" />
                        查看內頁
                      </div>
                    </div>
                  </div>

                  <ul className="buy-book">
                    <img
                      className="topright"
                      src="/icons/leftboxicon.svg"
                    ></img>
                    <div className="">
                      <div className="pin-title">買書GO</div>
                      <div className="trangle"></div>
                    </div>

                    <li className="eslite">
                      <Link href="">
                        <img src="/icons/eslite.png"></img>
                      </Link>
                    </li>
                    <li className="bookstw">
                      <Link href="">
                        <img src="/icons/bookstw.svg"></img>
                      </Link>
                    </li>
                    <li className="stone">
                      <Link href="">
                        <img src="/icons/stone.svg"></img>
                      </Link>
                    </li>
                    <li className="pchome">
                      <Link href="">
                        <img src="/icons/pchome.svg"></img>
                      </Link>
                    </li>
                  </ul>
                </>

                <GalleryModal
                  show={show}
                  item={item}
                  onHide={() => setShow(false)}
                />
              </div>
            </div>
          </div>
          <div className="main-body">
            <HomeTab books={books} />
          </div>
          <div className="container-fluid fdc">
            {/* {item &&
          (mobile ? (
            <MobileCard category={item.Category} />
          ) : (
            <DesktopCard category={item.Category} />
          ))} */}

            <Desc item={item} />
          </div>
        </div>
      )}
    </div>
  );
}

