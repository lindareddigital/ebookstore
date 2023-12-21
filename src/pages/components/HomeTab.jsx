import { cache } from 'react';
import { useEffect, useRef,useState } from 'react';
import { Nav, Tab } from 'react-bootstrap';
// import { getAllCategory,getAllBooks,getCategoryList } from '@/pages/api/api';
import apiManager from '@/pages/api/api';
import 'swiper/css';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import useSwiperFunc from '@/hooks/useSwiperFunc';




export default function HomeTab() {

  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const swiperRef = useRef(null);
  const { next, previous } = useSwiperFunc(swiperRef);


  const getAllCategory= (async () => {
    try {
      const data = await apiManager.getAllCategory();
      setCategories(data.data)
      return data.data;
    } catch (e) {
      console.log('error', e);
    }
  });

  const tabChange = (async(title) => {
    // setActiveTab(title)

    const data = await apiManager.getCategoryList(title);
    setBooks(data.data)
    console.log('CategoryList',data);
      
  });

  useEffect( () => {
    getAllCategory()
  }, []);


  return(
    <Tab.Container displayName="yyy" class="home-recommend-tabs" id="nav-tab" defaultActiveKey="first">
      <Nav variant="tabs">
        {categories.map((item) => (
          <>
          <Nav.Item>
            <Nav.Link onClick={() => tabChange(item.Title)} eventKey={item.id}>{item.Title}</Nav.Link>
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
                <SwiperSlide
                  className="swiper-slide"
                  key={`${item.id}`}
                >
                  <div class="book-item">
                    <img src={`http://localhost:8055/assets/${item.PrimaryImage.id}`} className="" alt={item.title} />
                    <div className="desc mt-2">{item.Title}</div>
                    <div className="price-num">{item.Price}</div>
                  </div>
                </SwiperSlide>
              );
            })}
            </div>
            <div onClick={previous} class="swiper-button-prev"></div>
            <div onClick={next} class="swiper-button-next"></div>
        </Swiper>
      </Tab.Content>
    </Tab.Container>
    

  )

}




