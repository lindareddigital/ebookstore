import Link from 'next/link';
import apiManager from 'src/pages/api/api';
import { useEffect, useRef,useState } from 'react';

export default function ListList({ books }) {
  const [item, setItem] = useState({});

  return (
    <>
      <div class="list-view">
        <ul class="">
          {books?.map((item) => {
            return (
              <Link
                key={`${item.id}`}
                href={{ pathname: `/detail/${item.id}` }}
                className={``}
              >
                <li class="list-view-item">
                  <button class="wish-btn">
                    <img src="/icons/heart.svg" alt="" />
                  </button>
                  <img
                    src={`https://directus-cms.vicosys.com.hk/assets/${item.cover_image}?access_token=${process.env.NEXT_PUBLIC_TOKEN}`}
                    className=""
                    alt={item.title}
                  />
                  <div className="textarea">
                    <div className="title">{item.title}</div>
                    <div className="desc">{item.description}</div>
                  </div>
                  <div className="">
                    <div className="price-num">＄{item.price}</div>

                    <div className="btn button-radius">
                      <img src="/icons/heart.svg" alt="" />
                      收藏此書
                    </div>
                    <div className="btn button-radius view-detail-btn">
                      <img src="/icons/search.svg" alt="" />
                      查看內頁
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
