import { cache } from 'react';
import { useEffect, useRef,useState } from 'react';
import { Nav, Tab } from 'react-bootstrap';
import apiManager from 'src/pages/api/api';
import 'swiper/css';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import useSwiperFunc from 'src/hooks/useSwiperFunc';
import Link from 'next/link';




export default function HomeTabTwo() {


  const [categories, setCategories] = useState([]);
  const swiperRef = useRef(null);
  const { next, previous } = useSwiperFunc(swiperRef);


  useEffect( () => {
  }, []);

  return(
    <>
    <div className="home-recommend-tabs2">
      <Tab.Container id="nav-tab" defaultActiveKey="0925676a-75da-4bd8-8c36-f6b17ebf8263">
        <Nav variant="tabs">
          {categories.map((item) => (
            <>
            <Nav.Item key={`${item.id}`}>
              <Nav.Link onClick={() => tabChange(item.id)} eventKey={item.id}>{item.Title}</Nav.Link>
            </Nav.Item>
            </>
          ))}
        </Nav>
        <Tab.Content>
          <Swiper
            ref={swiperRef}
            rewind={false}
            className={`booklist-carousel`}
            slidesPerView={4}
          >
            <div className="swiper-wrapper booklist-carousel-inner">
              {books.map((item) => {
                return (
                  <SwiperSlide
                    className="swiper-slide swiper-slide-tabs2"
                    key={`${item.id}`}
                  >
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
                          src={`${process.env.NEXT_PUBLIC_API_URL}/${item.PrimaryImage.id}`}
                          className=""
                          alt={item.title}
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
        </Tab.Content>
      </Tab.Container>
    </div>

    <div className="home-recommend-toolbar" variant="tabs">
        <div>
          <div className="home-recommend-title">Title</div>
        </div> 
        <Link href="/" className="home-recommend-more">看更多</Link>
 
    </div>

    <div className="home-recommend-tabs3">

      <div className="left">
        <img src="https://s2.eslite.dev/unsafe/s.eslite.dev/0sn0ecmeb0lxcsejtdb62p75vmlz" alt="" />
      </div>

      <div className="right">
        {books.map((item) => {
          return (
            <div className="">
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}/${item.PrimaryImage?.id}`}
                className=""
                alt={item.title}
              />
              <div className="desc mt-2">{item.Title}</div>
              <div className="price-num">{item.Price}</div>
            </div>
          );
        })}
      </div>
    </div>

    <div className="home-recommend-tabs4">
      <Tab.Container id="nav-tab" defaultActiveKey="0925676a-75da-4bd8-8c36-f6b17ebf8263">
        <Nav variant="tabs">
          {categories.map((item) => (
            <>
            <Nav.Item key={`${item.id}`}>
              <Nav.Link onClick={() => tabChange(item.id)} eventKey={item.id}>{item.Title}</Nav.Link>
            </Nav.Item>
            </>
          ))}
        </Nav>
        <Tab.Content>
          <Swiper
            ref={swiperRef}
            rewind={false}
            className={`booklist-carousel`}
            slidesPerView={4}
          >
            <div className="swiper-wrapper booklist-carousel-inner">
              {allBooks.map((item) => {
                return (
                  <SwiperSlide
                    className="swiper-slide swiper-slide-tabs4"
                    key={`${item.id}`}
                  >
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
                          src={`${process.env.NEXT_PUBLIC_API_URL}/${item.PrimaryImage.id}`}
                          className=""
                          alt={item.title}
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
        </Tab.Content>
      </Tab.Container>
    </div>

    </>

  )

}




