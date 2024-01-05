import { cache } from 'react';
import { useEffect, useRef,useState } from 'react';
import apiManager from '@/pages/api/api';
import Link from 'next/link';
import useCalc from '@/pages/components/atoms/useCalc';




export default function ListAside({categories}) {

  const { width, mobile } = useCalc();

  const [items, setItems] = useState(null);

  console.log(categories,'categories');
  


  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const data = await apiManager.getHaibinParams(`Haibin?filter[Category][_eq]=${props.category}`);

  //       setItems(data.data);
  //       // console.log('88', props,data.data);
  //       // return data.data;
  //     } catch (e) {
  //       console.log('error', e);
  //     }
  //   };
  //   getData();
  // }, [props]);


  return(
    <aside class="list-aside">
      <ul>
        {categories.map((item) => (
          <li key={item.id}>
            <Link 
              key={`${item.id}`}
              href={{
                pathname:`/listing/${item.id}`,
                query: {id: item.id},                 
              }}>
              {item.Title}
            </Link>
          </li>
        ))}
      </ul>

        <div class="accordion" id="accordionExample">
        <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            依類別搜尋
          </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <ul>
              <li>
                <Link href="">知識漫畫</Link>
              </li>
              <li>
                <Link href="">兒童文學</Link>
              </li>
              <li>
                <Link href="">益智桌遊</Link>
              </li>
            
            </ul>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingTwo">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          依系列搜尋
          </button>
        </h2>
        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <ul>
              <li>
                <Link href="">X星際探險隊</Link>
              </li>
              <li>
                <Link href="">X萬獸探險隊</Link>
              </li>
              <li>
                <Link href="">X恐龍探險隊</Link>
              </li>
              <li>
                <Link href="">X科幻冒險隊</Link>
              </li>
              <li>
                <Link href="">極限挑戰王</Link>
              </li>
              <li>
                <Link href="">機器人戰隊</Link>
              </li>
              <li>
                <Link href="">小公主成長學園</Link>
              </li>
              <li>
                <Link href="">世界名著</Link>
              </li>
              <li>
                <Link href="">超越極限</Link>
              </li>
              <li>
                <Link href="">魔法學園</Link>
              </li>
              <li>
                <Link href="">知識王</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div> 
    </aside>
    
  )

}
