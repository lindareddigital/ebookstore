import { cache } from 'react';
import { useEffect, useRef,useState } from 'react';
import { Nav, Tab } from 'react-bootstrap';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import useSwiperFunc from 'src/hooks/useSwiperFunc';
import Link from 'next/link';
import { NextIcon } from "src/components/atoms/icons/NextIcon";
import { PrevIcon } from "src/components/atoms/icons/PrevIcon";


export default function HomeTab({books}) {
  // console.log(books);
  
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

  // if (!books) {
  //   return null;
  // }


  return (
    <>
      <div className="home-recommend-tabs">
        <Tab.Container
          id="nav-tab"
          defaultActiveKey="0925676a-75da-4bd8-8c36-f6b17ebf8263"
        >
          <Nav variant="tabs">
            <div className="block-title">
              <div className="dot"></div>
              新書上市
            </div>

            {/* {blocks.map((item) => (
              <div>
                <InnerHTML className={""} text={item.bannerTitle?.processed} />
              </div>
            ))} */}

            {/* {categories.map((item) => (
            <div>
              <Nav.Item key={`${item.id}`}>
                <Nav.Link onClick={() => tabChange(item.id)} eventKey={item.id}>
                  {item.Title}
                </Nav.Link>
              </Nav.Item>
            </div>
          ))} */}
            <div className="swiper-button-group">
              <div onClick={previous} className="swiper-button-prev">
                <PrevIcon />
              </div>
              <div onClick={next} className="swiper-button-next">
                <NextIcon />
              </div>
            </div>
          </Nav>
          <div className="mobile-tabs">
            <Nav variant="tabs">
              {/* {categories.map((item) => (
              <>
                <Nav.Item key={`${item.id}`}>
                  <Nav.Link
                    onClick={() => tabChange(item.id)}
                    eventKey={item.id}
                  >
                    {item.Title}
                  </Nav.Link>
                </Nav.Item>
              </>
            ))} */}
            </Nav>
          </div>
          <Tab.Content>
            <Swiper
              onSwiper={getSwiper}
              ref={swiperRef}
              rewind={true}
              className={`booklist-carousel`}
              slidesPerView={5}
              onSnapIndexChange={onRealIndexChange}
            >
              <div className="swiper-wrapper booklist-carousel-inner">
                {books?.map((item, index) => {
                  {
                    /* console.log(
                    "131",
                    item,
                    item.image.id
                  ); */
                  }

                  return (
                    <SwiperSlide className="swiper-slide" key={index}>
                      <Link
                        key={index}
                        href={{ pathname: `/detail/${item?.id}` }}
                        className={``}
                      >
                        <div className="book-item">
                          {item.cover_image ? (
                            <img
                              src={`${process.env.NEXT_PUBLIC_API_URL}/assets/${item?.cover_image?.id}?access_token=${process.env.NEXT_PUBLIC_TOKEN}`}
                              className=""
                              alt={item.title}
                            />
                          ) : (
                            <img
                              src={`${process.env.NEXT_PUBLIC_API_URL}/assets/${item?.image?.id}?access_token=${process.env.NEXT_PUBLIC_TOKEN}`}
                              className=""
                              alt={item.title}
                            />
                          )}
                          <div className="desc mt-2">{item.title}</div>
                          {/* <div className="price-num">$ {item.Price}</div> */}
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
    </>
  );
}





