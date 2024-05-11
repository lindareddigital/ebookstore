import Link from 'next/link';
import apiManager from 'src/pages/api/api';
import { useEffect, useRef,useState } from 'react';
import { getPageColor } from "src/utilities/tool.js";
import { useRouter } from "next/router";

export default function ListList({ books }) {
  const [filteredData, setFilteredData] = useState(books);

  const router = useRouter();
  const publisher = router.query.slug?.[0];
  const [userId, setId] = useState("");
  const [arr, setArr] = useState([]);
  const [bookMark, setBookMark] = useState(null);
  // console.log(filteredData);
  
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
    //  console.log("user_bookmark", books?.result?.user_bookmark);
      // console.log(token);
      setBookMark(books?.result?.user_bookmark);

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
    //  console.log("click item.id", item.id);

    //  console.log("bookMark", bookMark);

     const selected = bookMark?.find((book) => book.product.id === item.id);
    //  console.log("selected", selected);

     const token = localStorage.getItem("token");

     if (selected != undefined) {
       //delete
       const response = await fetch(`api/bookmark/deleteBookMark`, {
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
       const response = await fetch(`api/bookmark/addBookMark`, {
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

     window.location.reload();
   };

  

  return (
    <>
      <div className="list-view">
        <ul className="">
          {books?.map((item) => {
            return (
              <div key={`${item.id}`} className={``}>
                <li className="list-view-item">
                  <Link
                    key={`${item.id}`}
                    href={{ pathname: `/detail/${item.id}` }}
                  >
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}/assets/${item?.cover_image?.id}?access_token=${process.env.NEXT_PUBLIC_TOKEN}`}
                      className="cover-img"
                      alt={item.title}
                    />
                  </Link>
                  <div className="wrapper">
                    <div className="textarea">
                      <Link
                        key={`${item.id}`}
                        href={{ pathname: `/detail/${item.id}` }}
                        className="title"
                      >
                        {item.title}
                      </Link>
                      <div className="desc">{item.description}</div>
                    </div>
                    <div className="info">
                      <div className={`price-num ${getPageColor(publisher)}`}>
                        ＄{item.price}
                      </div>
                      <button
                        onClick={() => {
                          handleChange(item);
                        }}
                        className={`wish-btn ${
                          arr?.includes(item?.id) ? "wish-active" : ""
                        }`}
                      >
                        <img src="/icons/heart.svg" alt="" />
                      </button>
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
                        <Link
                          key={`${item.id}`}
                          href={{ pathname: `/detail/${item.id}` }}
                          className="btn button-radius view-detail-btn"
                        >
                          查看內頁
                          <img src="/icons/viewmore.svg" alt="" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
}
