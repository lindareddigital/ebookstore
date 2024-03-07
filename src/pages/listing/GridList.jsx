import Link from 'next/link';
import apiManager from 'src/pages/api/api';
import { useEffect, useRef,useState } from 'react';

export default function CategoryList({props}) {
  const [item, setItem] = useState({});
  const [books, setBooks] = useState([]);


  useEffect(() => {
    const getData = async () => {
      try {  
        const data = props === "haibin" ? 
        await apiManager.getHaibin() : await apiManager.getAllBooks();
        setBooks(data.data);
        console.log('all', data.data);
        return data.data;
      } catch (e) {
        console.log('error', e);
      }
    };
    getData();

  }, [props]);




  return(       
    <>
      <div class="">
        {/* <div class="title">{props.Title}</div>
        <hr></hr> */}
        <div class="grid-view">

          { books.map((item) => {
            return (
              <Link
                key={`${item.id}`}
                href={{ pathname: `/detail/${item.id}` }}
                className={``}
              >
                <div class="book-item">
                  <button class="wish-btn">
                    <img src="/icons/heart.svg" alt="" />
                  </button>
                  <img
                    // src={`http://localhost:8055/assets/${item.PrimaryImage.id}`}
                    src={`https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/065/01/0010650149.jpg&v=54229da8k&w=348&h=348`}
                    className=""
                    alt={item.title}
                  />
                  <div className="desc">{item.Title}</div>
                  <div className="price-num">{item.Price}</div>
                </div>
              </Link>
            );
          })}
            
          </div>
      </div>
    </>      
  )
}
