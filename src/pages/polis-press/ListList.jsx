import Link from 'next/link';
import apiManager from 'src/pages/api/api';
import { useEffect, useRef,useState } from 'react';
import { getPageColor } from "src/utilities/tool.js";
import { useRouter } from "next/router";

export default function ListList({ books }) {
  const router = useRouter();
  const publisher = router.query.slug?.[0];
  const [item, setItem] = useState({});

  // console.log('8',books);
  

  return (
    <>
      <div className="list-view">
        <ul className="">
          {books?.map((item) => {
            return (
              <Link
                key={`${item.id}`}
                href={{ pathname: `/detail/${item.id}` }}
                className={``}
              >
                <li className="list-view-item">
                  <img
                    src={`https://directus-cms.vicosys.com.hk/assets/${item?.cover_image?.id}?access_token=${process.env.NEXT_PUBLIC_TOKEN}`}
                    className=""
                    alt={item.title}
                  />
                  <div className="wrapper">
                    <div className="textarea">
                      <div className="title">{item.title}</div>
                      <div className="desc">{item.description}</div>
                    </div>
                    <div className="info">
                      <div className={`price-num ${getPageColor(publisher)}`}>
                        ＄{item.price}
                      </div>
                      <button className="wish-btn">
                        <img src="/icons/heart.svg" alt="" />
                      </button>
                      <div className="button-group">
                        <div className="btn button-radius">
                          <img src="/icons/heart.svg" alt="" />
                          收藏此書
                        </div>
                        <div className="btn button-radius view-detail-btn">
                          查看內頁
                          <img src="/icons/viewmore.svg" alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </>
  );
}
