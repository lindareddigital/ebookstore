import { cache } from 'react';
import { useEffect, useRef,useState } from 'react';
import { Nav, Tab } from 'react-bootstrap';
import apiManager from '@/pages/api/api';
import 'swiper/css';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import useSwiperFunc from '@/hooks/useSwiperFunc';
import Link from 'next/link';




export default function HomeTab2() {

  const [books, setBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);

  const [categories, setCategories] = useState([]);
  const swiperRef = useRef(null);
  const { next, previous } = useSwiperFunc(swiperRef);

  const getAllBooks = (async () => {
    try {
      const data = await apiManager.getAllBooks();
      setAllBooks(data.data)

      console.log(data, 'AllBooks');
      return data;
    } catch (e) {
      console.log('error', e);
    }
  });


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
    getAllBooks()
  }, []);




  return(
    <>
    <div class="home-recommend-tabs2">
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
            <div class="swiper-wrapper booklist-carousel-inner">
              {books.map((item) => {
                return (
                  <SwiperSlide
                    className="swiper-slide swiper-slide-tabs2"
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
                      <img src={`http://localhost:8055/assets/${item.PrimaryImage.id}`} className="" alt={item.title} />
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

    <div class="home-recommend-toolbar" variant="tabs">
        <div>
          <div class="home-recommend-title">Title</div>
        </div> 
        <Link href="/" class="home-recommend-more">看更多</Link>
 
    </div>

    <div className="home-recommend-tabs3">

      <div className="left">
        <img src="https://s2.eslite.dev/unsafe/s.eslite.dev/0sn0ecmeb0lxcsejtdb62p75vmlz" alt="" />
      </div>

      <div className="right">
        {books.map((item) => {
          return (
          <div class="">
            <img src={`http://localhost:8055/assets/${item.PrimaryImage?.id}`} className="" alt={item.title} />
            <div className="desc mt-2">{item.Title}</div>
            <div className="price-num">{item.Price}</div>
          </div>
          );
        })}
      </div>
    </div>

    <div class="home-recommend-tabs4">
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
            <div class="swiper-wrapper booklist-carousel-inner">
              {allBooks.map((item) => {
                return (
                  <SwiperSlide
                    className="swiper-slide swiper-slide-tabs4"
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
                      <img src={`http://localhost:8055/assets/${item.PrimaryImage.id}`} className="" alt={item.title} />
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

    </>

  )

}




