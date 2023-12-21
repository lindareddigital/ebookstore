'use client';

import { useEffect, useRef, useState } from 'react';

export default function useAutoScroll(swiperRef, autoScroll) {
  
  const [swiperIndex, setSwiperIndex] = useState(0);

 

  // useEffect(() => {
  //   autoPlayLeftTime.current = 0;
  // }, [swiperIndex]);

  // const onRealIndexChange = (swiper) => {
  //   if (swiper.realIndex !== swiperIndex) {
  //     setSwiperIndex(swiper.realIndex);
  //   }
  //   // console.log(swiper.realIndex, 'realIndex');
  // };

  const next = () => {
    swiperRef.current.swiper.slideNext();
  };

  const previous = () => {
    swiperRef.current.swiper.slidePrev();
  };

  return { next, previous, swiperIndex };
}
