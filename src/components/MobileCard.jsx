import { useEffect, useRef,useState } from 'react';
import 'swiper/css';
import Link from 'next/link';
import useCalc from 'src/components/atoms/useCalc';




export default function MobileCard({props}) {

  const { mobile } = useCalc();

  const [item, setItem] = useState(null);


  return(
    <>
    {/* {mobile && (
      <div id="Controls" className="booklist-carousel carousel slide" data-bs-ride="carousel">
          <hr></hr>
          <div className="booklist-carousel-inner">

            { item && item.map((item) => {
              return (
                <Link
                  key={`${item.id}`}
                  href={{
                    pathname:`/detail/${item.id}`,
                    query: {id: item.id},                 
                  }}
                  className={``}
                >
                  <div className="book-item">
                    <img src={`/assets/${item.PrimaryImage.id}`} className="" alt={item.title} />
                    <div className="desc">{item.Title}</div>
                    <div className="price-num">{item.Price}</div>
                  </div>
                </Link>
              );
            })}
          
          </div>
          
      </div>
    )} */}


    </>

  )

}




