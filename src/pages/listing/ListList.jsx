import Link from 'next/link';
import apiManager from 'src/pages/api/api';
import { useEffect, useRef,useState } from 'react';

export default function CategoryList({props}) {
  const [item, setItem] = useState(null);


  useEffect(() => {
    const getData = async () => {
      try {
        const data = await apiManager.getCategoryList(props.id);
        setItem(data.data);
        console.log('88', data.data);
        return data.data;
      } catch (e) {
        console.log('error', e);
      }
    };
    getData();

    console.log('77', props);
    console.log('item', item);
  }, [props]);




  return(       
    <>
      <div class="list-view">
        <ul class="">
          { item && item.map((item) => {
            return (
              <Link
                key={`${item.id}`}
                href={{
                  pathname: `/detail/${item.id}`,
                  query: { id: item.id },
                }}
                className={``}
              >
                <li class="list-view-item">
                  <img
                    src={`http://localhost:8055/assets/${item.PrimaryImage.id}`}
                    className=""
                    alt={item.title}
                  />
                  <div className="textarea">
                    <div className="title">{item.Title}</div>
                    <div className="desc">
                      眾所期待的X萬獸探險隊回來囉!
                      還記得勇敢的大勇、可靠的阿寶、聰明的豆丁，
                      以及好學的柔柔、具洞察力的土土、可以與動物溝通的大森嗎?
                      讓大家一起展開全新的旅程， 一探人體的奧祕!
                      活力運動學校的菁
                    </div>
                  </div>
                  <div className="">
                    <div className="price-num">{item.Price}</div>

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
  )
}
