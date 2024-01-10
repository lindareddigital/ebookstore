import { cache } from 'react';
import { useEffect, useRef,useState } from 'react';
import apiManager from 'src/pages/api/api';
import 'swiper/css';
import Link from 'next/link';
import useCalc from 'src/pages/components/atoms/useCalc';




export default function MobileCard({props}) {

  const { mobile } = useCalc();

  const [item, setItem] = useState(null);


  useEffect(() => {
    const getData = async () => {
      try {
        const data = await apiManager.getCategoryList(props.id);
        setItem(data.data);
        // console.log('88', data.data);
        return data.data;
      } catch (e) {
        console.log('error', e);
      }
    };
    getData();

    // console.log('77', props);
    // console.log('item', item);
  }, [props]);


  return(
    <>
    {mobile && (
      <div id="Controls" class="booklist-carousel carousel slide" data-bs-ride="carousel">
          {/* <div class="title">{item.Title}</div> */}
          <hr></hr>
          <div class="booklist-carousel-inner">

            { item && item.map((item) => {
              return (
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
                    <div className="desc">{item.Title}</div>
                    <div className="price-num">{item.Price}</div>
                  </div>
                </Link>
              );
            })}

            {/* <div class="book-item">
              <img src="https://s2.eslite.dev/unsafe/s.eslite.dev/b2b/newItem/2023/10/12/155_143447327_126_mainCoverImage1.jpg" class="" alt="..."></img>
              <div class="desc mt-2">X萬獸探險隊益智桌遊/ 算數王之戰</div>
              <div class="price-num"> $ 300</div>
            </div>
            <div class="book-item">
              <img src="https://s2.eslite.dev/unsafe/s.eslite.dev/upload/product/o/2681546322009/ec1429824.jpg" class="" alt="..."></img>
              <div class="desc">X萬獸探險隊 12: 高原霸主大角羊VS大野牛 (附學習單)</div>
              <div class="price-num"> $ 300</div>
            </div>
            <div class="book-item">
                <img src="https://s2.eslite.dev/unsafe/s.eslite.dev/upload/product/o/2681520894003/ec1388694.jpg" class="" alt="..."></img>
                <div class="desc">X萬獸探險隊 10: 巨蟲擂臺戰 蠍子VS螳螂 (附學習單)</div>
                <div class="price-num"> $ 300</div>
              </div>
            <div class="book-item">
              <img src="https://s2.eslite.dev/unsafe/s.eslite.dev/upload/product/o/2681508088004/ec1357899.jpg" class="" alt="..."></img>
              <div class="desc">X萬獸探險隊 9: 毒王之王眼鏡蛇VS響尾蛇 (附學習單)</div>
              <div class="price-num"> $ 300</div>
            </div>
            <div class="book-item">
              <img src="https://s2.eslite.dev/unsafe/s.eslite.dev/upload/product/o/2681494991005/ec1352472.jpg" class="" alt="..."></img>
              <div class="desc">X萬獸探險隊 8: 最強獵手灰狼VS鬣狗 (附學習單)</div>
              <div class="price-num"> $ 300</div>
            </div>    */}
          
          </div>
          
      </div>
    )}


    </>

  )

}




