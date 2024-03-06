import Link from 'next/link';
import apiManager from 'src/pages/api/api';
import { useEffect, useRef,useState } from 'react';

export default function CategoryList({props}) {
  const [item, setItem] = useState(null);


  useEffect(() => {
    const getData = async () => {
      try {
        const data = await apiManager.getAllBooks();
        setItem(data.data);
        console.log('all', data.data);
        return data.data;
      } catch (e) {
        console.log('error', e);
      }
    };
    getData();

  }, [props]);




  return(       
    <>
      <div class="">
        {/* <div class="title">{props.Title}</div>
        <hr></hr> */}
        <div class="grid-view">

          { item && item.map((item) => {
            return (
              <Link
                key={`${item.PrimaryImage.id}`}
                href={{ pathname: `/detail/${item.PrimaryImage.id}` }}
                className={``}
              >
                <div class="book-item">
                  <button class="wish-btn">
                    <img src="/icons/heart.svg" alt="" />
                  </button>
                  <img
                    src={`http://localhost:8055/assets/${item.PrimaryImage.id}`}
                    className=""
                    alt={item.title}
                  />
                  <div className="desc">{item.Title}</div>
                  <div className="price-num">{item.Price}</div>
                </div>
              </Link>
            );
          })}
            
          </div>
      </div>
    </>      
  )
}
