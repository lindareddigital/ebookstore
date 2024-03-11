import { cache } from 'react';
import { useEffect, useRef,useState } from 'react';
import { Nav, Tab } from 'react-bootstrap';

import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import useSwiperFunc from 'src/hooks/useSwiperFunc';
import Link from 'next/link';
import InnerHTML from "src/pages/components/atoms/InnerHTML";




export default function HomeTab({  data }) {
  // console.log("books", books);
  const blocks = data.data.pages[1].blocks;
  console.log("data", data.data.pages[1].blocks);
  // console.log("books", data.data.pages[1].blocks[1].item.cards);
  const books = data.data.pages[1].blocks[1].item.cards;
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
      <div class="home-recommend-tabs">
        <Tab.Container
          id="nav-tab"
          defaultActiveKey="0925676a-75da-4bd8-8c36-f6b17ebf8263"
        >
          <Nav variant="tabs">
            <div className="block-title">新書上市</div>

            {blocks.map((item) => (
              <div>
                <InnerHTML className={""} text={item.bannerTitle?.processed} />
              </div>
            ))}

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
              <div onClick={previous} class="swiper-button-prev"></div>
              <div onClick={next} class="swiper-button-next"></div>
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
            loop={true}
            className={`booklist-carousel`}
            slidesPerView={"auto"}
            onSnapIndexChange={onRealIndexChange}
          >
            <div class="swiper-wrapper booklist-carousel-inner">
              {books?.map((item, index) => {
                {/* console.log(`item: ${item}`); */}
                return (
                  <SwiperSlide className="swiper-slide" key={`${item.id}`}>
                    <Link
                      key={`${item.id}`}
                      href={{ pathname: `/detail/${item.id}` }}
                      className={``}
                    >
                      <div class="book-item">
                        <img
                          // src={`https://directus-cms.vicosys.com.hk/${item.image.id}`}
                          src={`https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/065/01/0010650149.jpg&v=54229da8k&w=348&h=348`}
                          className=""
                          alt={item.title}
                        />
                        <div className="desc mt-2">{item.title}</div>
                        <div className="price-num">{item.Price}</div>
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





