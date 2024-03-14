import Link from 'next/link';
import apiManager from 'src/pages/api/api';
import { useEffect, useRef,useState } from 'react';

export default function GridList({ books }) {
  const [item, setItem] = useState({});

  // console.log("gridlist", books);

  return (
    <>
      <div class="">
        {/* <div class="title">{props.Title}</div>
        <hr></hr> */}
        <div class="grid-view">
          {books?.map((item) => {
            return (
              <Link
                key={`${item.id}`}
                href={{ pathname: `/detail/${item.id}` }}
                className={``}
              >
                <div class="book-item">
                  <button class="wish-btn">
                    <img src="/icons/heart.svg" alt="" />
                  </button>
                  <img
                    src={`https://directus-cms.vicosys.com.hk/assets/${item.cover_image}?access_token=${process.env.NEXT_PUBLIC_TOKEN}`}
                    className=""
                    alt={item.title}
                  />
                  <div className="desc">{item.title}</div>
                  <div className="price-num">＄{item.price}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
