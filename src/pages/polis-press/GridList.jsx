import Link from 'next/link';
import apiManager from 'src/pages/api/api';
import { useEffect, useRef,useState } from 'react';
import { useRouter } from "next/router";

import { getPageColor } from "src/utilities/tool.js";

export default function GridList({ books }) {
  const router = useRouter();
  const publisher = router.query.slug?.[0];
  const [item, setItem] = useState({});

  // console.log("gridlist", books);

  return (
    <>
      <div className="">
        {/* <div className="title">{props.Title}</div>
        <hr></hr> */}
        <div className="grid-view">
          {books?.map((item) => {
            return (
              <Link
                key={`${item.id}`}
                href={{ pathname: `/detail/${item.id}` }}
                className={``}
              >
                <div className="book-item">
                  <button className="wish-btn">
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
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
