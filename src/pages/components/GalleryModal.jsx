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
  const subswiperRef = useRef(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  // const { next, previous, onRealIndexChange } = useSwiperFunc(swiperRef);

  const getSwiper = (swiper) => {
    if (swiperRef.current !== swiper) {
      swiperRef.current = swiper;
    }
  };

// const subnext = () => {
//   subswiperRef.current.slideNext();
// };

// const subprevious = () => {
//   subswiperRef.current.slidePrev();
// };

// const next = () => {
//   swiperRef.current.slideNext();
// };

// const previous = () => {
//   swiperRef.current.slidePrev();
// };


  // console.log("5566", item);


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
          // onSwiper={getSwiper}
          // ref={swiperRef}
          navigation={true}
          loop={true}
          slidesPerView={"auto"}
          className="primary-swiper"
          // onSnapIndexChange={onRealIndexChange}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[Thumbs, FreeMode, Navigation]}
          // slideToClickedSlide={true}
          // watchslidesvisibility={true}
          // watchslidesprogress={true}
        >
          {item.images.map((item) => {
            {
              {
                /* console.log("5566", item); */
              }
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
          {/* onClick={next} */}
          <div className="swiper-button-next">
            <NextIcon />
          </div>
          {/* onClick={previous} */}
          <div className="swiper-button-prev">
            <PrevIcon />
          </div>
        </Swiper>
        <Swiper
          // onSwiper={getSwiper}
          // ref={subswiperRef}
          onSwiper={setThumbsSwiper}
          // rewind={true}
          loop={true}
          // navigation={true}
          slidesPerView={"5"}
          direction={"vertical"}
          className="sub-swiper"
          freeMode={true}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          // onSnapIndexChange={onRealIndexChange}
          modules={[FreeMode, Navigation, Thumbs]}
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
          {/* onClick={subnext} */}
          <div className="swiper-button-next">
            <NextIcon />
          </div>
          {/* onClick={subprevious} */}
          <div className="swiper-button-prev">
            <PrevIcon />
          </div>
        </Swiper>
      </Modal.Body>
    </Modal>
  );
}




