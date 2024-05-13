import Link from 'next/link';
import { useEffect, useRef,useState } from 'react';
import { useRouter } from "next/router";
import { getPageColor } from "src/utilities/tool.js";
import { v4 as uuidv4 } from "uuid";

export default function GridList({ books }) {
  const [filteredData, setFilteredData] = useState(books);
  const router = useRouter();
  const publisher = router.query.slug?.[0];
  const [userId, setId] = useState("");
  const [arr, setArr] = useState([]);
  const [bookMark, setBookMark] = useState(null);


  useEffect(() => {
      setFilteredData(books);    
  }, [books]);

  useEffect(() => {
    const userId = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    setId(userId);

    console.log("userId", userId, "token", token);
    

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
      // console.log(token);
      setBookMark(books?.result?.user_bookmark);

      const productIds = books?.result?.user_bookmark?.map(
        (item) => item.product.id
      );

      setArr(productIds);
      console.log("arr", arr);
      return bookMark
    };
    
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

      console.log(router.pathname.includes("/member"));


      if (router.pathname.includes("/member")) {
        const filteredData = books?.result?.product?.filter((item) => {
          return arr?.includes(item.id);
        });
        setFilteredData(filteredData);
        console.log(filteredData, "filteredData");
        return filteredData;
      }
    };


    const getLikeData = async () => {
      const books = await filterByPublisher();

      if (token) {
        const result = await getUserBookMark();
        console.log(result);
      }

      const filteredData = books?.result?.product?.filter((item) => {
        return arr?.includes(item.id);
      });
      setFilteredData(filteredData);
      console.log(filteredData, "filteredData");

      
    };
    
    getLikeData()
    filterByPublisher();
  }, []);

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
      // console.log("add func", data);
    }
     window.location.reload();
  };

  return (
    <>
      <div className="">
        {/* <div className="title">{props.Title}</div>
        <hr></hr> */}
        <div className="grid-view">
          {
            filteredData?.map((item,index) => {
              {
                /* console.log(arr?.includes(item?.id),item.id); */
              }
              return (
                <div key={uuidv4()} className={``}>
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
                    <Link
                      key={uuidv4()}
                      href={{ pathname: `/detail/${item.id}` }}
                      className=""
                    >
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_URL}/assets/${item?.cover_image?.id}?access_token=${process.env.NEXT_PUBLIC_TOKEN}`}
                        className=""
                        alt={item.title}
                      />
                    </Link>
                    <Link
                      key={index}
                      href={{ pathname: `/detail/${item.id}` }}
                      className="desc"
                    >
                      {item.title}
                    </Link>
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
