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


  useEffect(() => {
    const getData = async () => {
      try {
        const data = await apiManager.getHaibinParams(`Haibin?filter[Category][_eq]=${props.category}`);

        setItems(data.data);
        // console.log('88', props,data.data);
        // return data.data;
      } catch (e) {
        console.log('error', e);
      }
    };
    getData();
  }, [props]);


  return(
    <>
    {!mobile && (
      <div class="swiper all-swiper booklist-carousel">
        <div class="title">{props.category}</div>
        <hr></hr>
        <Swiper
          ref={swiperRef}
          rewind={false}
          className={`booklist-carousel`}
          slidesPerView={5}
        >
          <div class="swiper-wrapper booklist-carousel-inner">
            {items?.map((item) => {
              return (
                <SwiperSlide
                  className="swiper-slide"
                  key={`${item.id}`}
                >
                <Link
                  key={`${item.id}`}
                  href={{
                    pathname:`/detail/${item.id}`,
                    query: {id: item.id},                 
                  }}
                  className={``}
                > 
                  <div class="book-item">
                    <img src={`http://localhost:8055/assets/${item.PrimaryImage}`} className="" alt={item.Title} />
                    <div className="desc mt-2">{item.Title}</div>
                    <div className="price-num">{item.Price}</div>
                  </div>
                  </Link>
                </SwiperSlide>
              );
            })}
            </div>
            <div onClick={previous} class="swiper-button-prev"></div>
            <div onClick={next} class="swiper-button-next"></div>
        </Swiper>
      </div>
    )}
    </>

  )

}




