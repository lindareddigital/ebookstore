import Link from 'next/link';
import apiManager from 'src/pages/api/api';
import { useEffect, useRef,useState } from 'react';

export default function ListList({ books }) {
  const [item, setItem] = useState({});

  return (
    <>
      <div className="list-view">
        <ul className="">
          {books?.map((item) => {
            return (
              <Link
                key={`${item.id}`}
                href={{ pathname: `/detail/${item.id}` }}
                classNameName={``}
              >
                <li className="list-view-item">
                  <img
                    src={`https://directus-cms.vicosys.com.hk/assets/${item.cover_image}?access_token=${process.env.NEXT_PUBLIC_TOKEN}`}
                    classNameName=""
                    alt={item.title}
                  />
                  <div classNameName="wrapper">
                    <div classNameName="textarea">
                      <div classNameName="title">{item.title}</div>
                      <div classNameName="desc">{item.description}</div>
                    </div>
                    <div classNameName="info">
                      <div classNameName="price-num">＄{item.price}</div>
                      <button className="wish-btn">
                        <img src="/icons/heart.svg" alt="" />
                      </button>
                      <div classNameName="btn button-radius">
                        <img src="/icons/heart.svg" alt="" />
                        收藏此書
                      </div>
                      <div classNameName="btn button-radius view-detail-btn">
                        <img src="/icons/search.svg" alt="" />
                        查看內頁
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
