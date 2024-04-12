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


export default function SinglePageTab() {

  const [recipe, setRecipe] = useState([]);
  const swiperRef = useRef(null);
  // const { next, previous } = useSwiperFunc(swiperRef);
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

   const next = () => {
     swiperRef.current.slideNext();
   };

   const previous = () => {
     swiperRef.current.slidePrev();
   };


  useEffect(() => {
    const getProductsByCategory = async () => {
      try {
        const response = await fetch(`/api/product/category`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sort_by: ["-date_created"],
            publisher_slug: "seashore",
            category_id: ["f8050a2e-bebd-4b79-ad81-d3bafada63da"],
            page: 1,
          }),
        });
        const books = await response.json();
        setRecipe(books?.result?.product);
      } catch (error) {
        console.error("Error fetching products by category:", error);
      }
    };
    getProductsByCategory();
  }, []);


 

  return (
    <>
      <div className="main-body">
        <div className="home-recommend-tabs">
          <Tab.Container
            id="nav-tab"
            defaultActiveKey="0925676a-75da-4bd8-8c36-f6b17ebf8263"
          >
            <Nav variant="tabs">
              <div className="block-title">
                <div className="dot"></div>美味食譜
              </div>
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
                rewind={true}
                className={`booklist-carousel`}
                slidesPerView={"5"}
                onSnapIndexChange={onRealIndexChange}
              >
                <div className="swiper-wrapper booklist-carousel-inner">
                  {recipe?.map((item) => {
                    {
                      /* {console.log("recipe", item, item?.id);} */
                    }

                    return (
                      <SwiperSlide className="swiper-slide" key={`${item?.id}`}>
                        <Link
                          key={`${item?.id}`}
                          href={{ pathname: `/detail/${item?.id}` }}
                          className={``}
                        >
                          <div className="recipe-card">
                            <img
                              src={`https://directus-cms.vicosys.com.hk/assets/${item?.cover_image?.id}?access_token=${process.env.NEXT_PUBLIC_TOKEN}`}
                              className=""
                              alt={item.title}
                            />
                            <div className="desc mt-2">{item.title}</div>
                          </div>
                        </Link>
                      </SwiperSlide>
                    );
                  })}
                </div>
              </Swiper>
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
    </>
  );
}





