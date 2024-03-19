import { cache } from 'react';
import { useEffect, useRef,useState } from 'react';
import { Nav, Tab } from 'react-bootstrap';

import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import useSwiperFunc from 'src/hooks/useSwiperFunc';
import Link from 'next/link';
import InnerHTML from "src/pages/components/atoms/InnerHTML";
import { NextIcon } from "src/pages/components/atoms/icons/NextIcon";
import { PrevIcon } from "src/pages/components/atoms/icons/PrevIcon";


export default function SinglePageTab({  }) {
  // console.log("data", data.data);


  const swiperRef = useRef(null);

  const { next, previous } = useSwiperFunc(swiperRef);
  const [swiperIndex, setSwiperIndex] = useState(0);

  const getSwiper = (swiper) => {
    if (swiperRef.current !== swiper) {
      swiperRef.current = swiper;
    }
  };

  const onRealIndexChange = (swiper) => {
    if (swiper.realIndex !== swiperIndex) {
      setSwiperIndex(swiper.realIndex);
    }
  };

 

  return (
    <>
      <div className="main-body">
        <div className="home-recommend-tabs">
          <Tab.Container
            id="nav-tab"
            defaultActiveKey="0925676a-75da-4bd8-8c36-f6b17ebf8263"
          >
            <Nav variant="tabs">
              <div className="block-title">美味食譜</div>
              <div className="swiper-button-group">
                <div onClick={previous} className="swiper-button-prev">
                  <PrevIcon />
                </div>
                <div onClick={next} className="swiper-button-next">
                  <NextIcon />
                </div>
              </div>
            </Nav>
            <Tab.Content>
              <Swiper
                onSwiper={getSwiper}
                ref={swiperRef}
                loop={true}
                className={`booklist-carousel`}
                slidesPerView={"auto"}
                onSnapIndexChange={onRealIndexChange}
              >
                <div className="swiper-wrapper booklist-carousel-inner">
                  <SwiperSlide className="swiper-slide">
                    <Link href={""} className={``}>
                      <div className="recipe-card">
                        <img
                          src={`https://s7d1.scene7.com/is/image/mcdonalds/sausage-mcmuffin-with-egg_832x822:nutrition-calculator-tile`}
                          className=""
                          alt="mcd"
                        />
                        <div className="desc mt-2">item.title</div>
                      </div>
                    </Link>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <Link href={""} className={``}>
                      <div className="recipe-card">
                        <img
                          src={`https://s7d1.scene7.com/is/image/mcdonalds/sausage-mcmuffin-with-egg_832x822:nutrition-calculator-tile`}
                          className=""
                          alt="mcd"
                        />
                        <div className="desc mt-2">item.title</div>
                      </div>
                    </Link>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <Link href={""} className={``}>
                      <div className="recipe-card">
                        <img
                          src={`https://s7d1.scene7.com/is/image/mcdonalds/sausage-mcmuffin-with-egg_832x822:nutrition-calculator-tile`}
                          className=""
                          alt="mcd"
                        />
                        <div className="desc mt-2">item.title</div>
                      </div>
                    </Link>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <Link href={""} className={``}>
                      <div className="recipe-card">
                        <img
                          src={`https://s7d1.scene7.com/is/image/mcdonalds/sausage-mcmuffin-with-egg_832x822:nutrition-calculator-tile`}
                          className=""
                          alt="mcd"
                        />
                        <div className="desc mt-2">item.title</div>
                      </div>
                    </Link>
                  </SwiperSlide>
                </div>
              </Swiper>
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
    </>
  );
}





