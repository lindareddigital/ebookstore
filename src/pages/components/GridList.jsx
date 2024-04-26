import Link from 'next/link';
import apiManager from 'src/pages/api/api';
import { useEffect, useRef,useState } from 'react';
import { useRouter } from "next/router";
import { getPageColor } from "src/utilities/tool.js";

export default function GridList({ books }) {
  const [filteredData, setFilteredData] = useState(books);

  const router = useRouter();
  const publisher = router.query.slug?.[0];
  const [userId, setId] = useState("");

  const [arr, setArr] = useState([]);
  const [bookMark, setBookMark] = useState(null);

  useEffect(() => {
    // 当 books 改变时更新 filteredData
    setFilteredData(books);
  }, [books]);

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
      console.log("user_bookmark", books?.result?.user_bookmark);
      console.log(token);
      setBookMark(books?.result?.user_bookmark);

      const productIds = books?.result?.user_bookmark?.map(
        (item) => item.product.id
      );

      setArr(productIds);
      console.log("arr", arr);
    };

    getUserBookMark();

    const filterByPublisher = async () => {
      console.log("all book");
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
      console.log(books?.result?.product, "all books");


      if (router.pathname.includes("/member")) {
        const filteredData = books?.result?.product?.filter((item) => {
          return arr?.includes(item.id);
        });

        setFilteredData(filteredData);
        console.log(filteredData, "filteredData");
      }

    };

    filterByPublisher();
  }, []);

  const handleChange = async (item) => {
    console.log("click item.id", item.id);

    console.log("bookMark", bookMark);

    const selected = bookMark?.find((book) => book.product.id === item.id);
    console.log("selected", selected);

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
  console.log("books", books);
  console.log("bookMark", bookMark);
  console.log("bookmark arr", arr);

  return (
    <>
      <div className="">
        {/* <div className="title">{props.Title}</div>
        <hr></hr> */}
        <div className="grid-view">
          {filteredData?.map((item) => {
            {
              /* console.log(arr?.includes(item?.id),item.id); */
            }
            return (
              <div
                key={`${item.id}`}
                // href={{ pathname: `/detail/${item.id}` }}
                className={``}
              >
                <div className="book-item">
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
                  <img
                    src={`https://directus-cms.vicosys.com.hk/assets/${item?.cover_image?.id}?access_token=${process.env.NEXT_PUBLIC_TOKEN}`}
                    className=""
                    alt={item.title}
                  />
                  <div className="desc">{item.title}</div>
                  <div className={`price-num ${getPageColor(publisher)}`}>
                    ＄{item.price}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
