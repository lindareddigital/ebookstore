import { useEffect, useRef,useState } from 'react';
import apiManager from 'src/pages/api/api';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import useSwiperFunc from 'src/hooks/useSwiperFunc';
import Link from 'next/link';
import Modal from "react-bootstrap/Modal";
import { NextIcon } from "src/pages/components/atoms/icons/NextIcon";
import { PrevIcon } from "src/pages/components/atoms/icons/PrevIcon";

// Import Swiper styles
import 'swiper/css';
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";




export default function GalleryModal({ item,show, onHide }) {
  const swiperRef = useRef(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { next, previous, onRealIndexChange } = useSwiperFunc(swiperRef);

  const getSwiper = (swiper) => {
    if (swiperRef.current !== swiper) {
      swiperRef.current = swiper;
      swiperRef.current.slideNext();

    }

  };

  const [swiperIndex, setSwiperIndex] = useState(0);

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {item.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Swiper
          onSwiper={getSwiper}
          ref={swiperRef}
          rewind={false}
          slidesPerView={"auto"}
          className="primary-swiper"
          onSnapIndexChange={onRealIndexChange}
        >
          {item.images.map((item) => {
            {
              /* console.log(item); */
            }
            return (
              <SwiperSlide key={item.product_id}>
                <img
                  className="primary-img"
                  src={`https://directus-cms.vicosys.com.hk/assets/${item.directus_files_id}?access_token=${process.env.NEXT_PUBLIC_TOKEN}`}
                />
              </SwiperSlide>
            );
          })}
          <div onClick={next} class="swiper-button-next">
            <NextIcon />
          </div>
          <div onClick={previous} class="swiper-button-prev">
            <PrevIcon />
          </div>
        </Swiper>
        <Swiper
          onSwiper={getSwiper}
          ref={swiperRef}
          // loop={true}
          rewind={false}
          slidesPerView={"auto"}
          direction={"vertical"}
          className="sub-swiper"
          onSnapIndexChange={onRealIndexChange}
        >
          {item.images.map((i) => {
            {
              /* console.log(i); */
            }
            return (
              <SwiperSlide key={i.product_id}>
                <div className="index-area">{i.id}</div>
                <img
                  src={`https://directus-cms.vicosys.com.hk/assets/${i.directus_files_id}?access_token=${process.env.NEXT_PUBLIC_TOKEN}`}
                />
              </SwiperSlide>
            );
          })}

          <div onClick={next} class="swiper-button-next">
            <NextIcon />
          </div>
          <div onClick={previous} class="swiper-button-prev">
            <PrevIcon />
          </div>
        </Swiper>
      </Modal.Body>
    </Modal>
  );
}




