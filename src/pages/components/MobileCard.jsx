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
    {/* {mobile && (
      <div id="Controls" class="booklist-carousel carousel slide" data-bs-ride="carousel">
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
          
          </div>
          
      </div>
    )} */}


    </>

  )

}




