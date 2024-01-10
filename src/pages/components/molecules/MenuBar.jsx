import { cache } from 'react';
import { useEffect, useRef,useState } from 'react';
import apiManager from 'src/pages/api/api';
import Link from 'next/link';
import useCalc from 'src/pages/components/atoms/useCalc';




export default function MenuBar(props) {

  const { width, mobile } = useCalc();

  const [items, setItems] = useState(null);


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
    <div class="menu-bar">
      <div class="">
        <Link href="" class="link">全站分類</Link>
      </div>
      <div class="">
        <Link href="" class="link">童書</Link>
      </div>
      <div class="">
        <Link href="" class="link">成書</Link>
      </div>
      <div class="">
        <Link href="" class="link">益智產品</Link>
      </div>
      <div class="">
        <Link href="" class="link">買書GO</Link>
      </div>
    </div>
    
  )

}
