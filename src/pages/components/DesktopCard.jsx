import { cache } from 'react';
import { useEffect, useRef,useState } from 'react';
import apiManager from 'src/pages/api/api';
import 'swiper/css';
import Link from 'next/link';
import useCalc from 'src/pages/components/atoms/useCalc';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import useSwiperFunc from 'src/hooks/useSwiperFunc';




export default function DesktopCard(props) {

  const { width, mobile } = useCalc();
  const swiperRef = useRef(null);
  const { next, previous } = useSwiperFunc(swiperRef);

  const [items, setItems] = useState(null);


  return(
    <>
    {!mobile && (
      <div className="swiper all-swiper booklist-carousel">
        <div className="title">{props.category}</div>
        <hr></hr>
        <Swiper
          ref={swiperRef}
          rewind={false}
          className={`booklist-carousel`}
          slidesPerView={5}
        >
          <div className="swiper-wrapper booklist-carousel-inner">
            {items?.map((item) => {
              return (
                <SwiperSlide className="swiper-slide" key={`${item.id}`}>
                  <Link
                    key={`${item.id}`}
                    href={{
                      pathname: `/detail/${item.id}`,
                      query: { id: item.id },
                    }}
                    className={``}
                  >
                    <div className="book-item">
                      <img
                        src={`https://directus-cms.vicosys.com.hk/${item.PrimaryImage}`}
                        className=""
                        alt={item.Title}
                      />
                      <div className="desc mt-2">{item.Title}</div>
                      <div className="price-num">{item.Price}</div>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
            </div>
            <div onClick={previous} className="swiper-button-prev"></div>
            <div onClick={next} className="swiper-button-next"></div>
        </Swiper>
      </div>
    )}
    </>

  )

}




