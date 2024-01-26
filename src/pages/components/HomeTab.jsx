import { cache } from 'react';
import { useEffect, useRef,useState } from 'react';
import { Nav, Tab } from 'react-bootstrap';
import apiManager from 'src/pages/api/api';
import 'swiper/css';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import useSwiperFunc from 'src/hooks/useSwiperFunc';
import Link from 'next/link';




export default function HomeTab() {

  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const swiperRef = useRef(null);
  const { next, previous } = useSwiperFunc(swiperRef);


  const getAllCategory= (async () => {
    try {
      const data = await apiManager.getAllCategory();
      setCategories(data.data)
      const firstRender = await apiManager.getCategoryList(data.data[0].id);
      setBooks(firstRender.data)
    } catch (e) {
      console.log('error', e);
    }
  });

  const tabChange = (async(id) => {

    const data = await apiManager.getCategoryList(id);
    setBooks(data.data)
    console.log('CategoryList',data);
      
  });

  useEffect( () => {
    getAllCategory()
  }, []);


  return (
    <div class="home-recommend-tabs">
      <Tab.Container
        id="nav-tab"
        defaultActiveKey="0925676a-75da-4bd8-8c36-f6b17ebf8263"
      >
        <Nav variant="tabs">
          <div className="title">新書上市</div>

          {categories.map((item) => (
            <>
              <Nav.Item key={`${item.id}`}>
                <Nav.Link onClick={() => tabChange(item.id)} eventKey={item.id}>
                  {item.Title}
                </Nav.Link>
              </Nav.Item>
            </>
          ))}
        </Nav>
        <Tab.Content>
          <Swiper
            ref={swiperRef}
            rewind={false}
            className={`booklist-carousel`}
            slidesPerView={5}
          >
            <div class="swiper-wrapper booklist-carousel-inner">
              {books.map((item) => {
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
                      <div class="book-item">
                        <img
                          src={`http://localhost:8055/assets/${item.PrimaryImage.id}`}
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
            <div onClick={previous} class="swiper-button-prev"></div>
            <div onClick={next} class="swiper-button-next"></div>
          </Swiper>
        </Tab.Content>
      </Tab.Container>
    </div>
  );

}




