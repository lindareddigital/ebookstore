import { cache } from 'react';
import { useEffect, useRef,useState } from 'react';
import apiManager from '@/pages/api/api';
import Link from 'next/link';
import useCalc from '@/pages/components/atoms/useCalc';




export default function MediaBlock(props) {

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
    <div class="container-fluid media-block">
      <div class="yt-block">
        <iframe width="560" height="334" src="https://www.youtube.com/embed/55R1KVI4h74?si=qr6If8TgjJ425APu" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        <div class="more">
          <iframe width="260" height="165" src="https://www.youtube.com/embed/H4uG7XiXf78?si=HUo2Q9ujcf2kAY8n" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
          <iframe width="260" height="165" src="https://www.youtube.com/embed/H4uG7XiXf78?si=HUo2Q9ujcf2kAY8n" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div> 
      </div>
      <div class="share-block">
        <div class="title">分享專欄</div>
        <div class="desc">
          由獨角獸計畫與500輯共同舉辦的「閱讀與思考派對」第四場由李惠貞主講「人生的解答」，以自身經驗與觀點，交融《在深夜遇見薩古魯》與《一個瑜伽士的內在喜悅工程》中薩古魯的超脫見解分享給所有讀者。
          ◎ 講座報導紀錄 → https://reurl.cc/zbrDVk​
          ◎ 場地協力 → Daily by Draft Land
          ◎ 𝗙𝗢𝗟𝗟𝗢𝗪 🅘🅖 → www.instagram.com/500times_tw
        </div>
        <img class="" src="https://s2.eslite.dev/unsafe/s.eslite.dev/upload/product/o/2682262815004/20220930032401652408.jpg" alt=""></img>
      </div>
    </div>
  )

}
