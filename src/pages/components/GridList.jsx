import Link from 'next/link';
import apiManager from 'src/pages/api/api';
import { useEffect, useRef,useState } from 'react';
import { useRouter } from "next/router";
import { getPageColor } from "src/utilities/tool.js";

export default function GridList({ books, bookMark,arr }) {
  const router = useRouter();
  const publisher = router.query.slug?.[0];
  const [userId, setId] = useState("");


  useEffect(() => {
    const userId = localStorage.getItem("id");
    setId(userId);
  }, []);

  const handleChange = async(item) => {
    console.log("19", item);

    const selected = bookMark.find((item)=>{ item.product.id === item.id})
    console.log(selected);
    
    
    const response = await fetch(`api/bookmark/deleteBookMark`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: userId, product: item.id,id: id }),
    });

  };
  console.log('books',books);
  console.log("bookMark", bookMark);
  console.log("arr", arr);

  return (
    <>
      <div className="">
        {/* <div className="title">{props.Title}</div>
        <hr></hr> */}
        <div className="grid-view">
          {books?.map((item) => {
            console.log(arr?.includes(item?.id),item.id);
            return (
              <div
                key={`${item.id}`}
                // href={{ pathname: `/detail/${item.id}` }}
                className={``}
              >
                <div className="book-item">
                  <button
                    onClick={()=>{handleChange(item)}}
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
