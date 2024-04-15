import { useEffect, useRef, useState, useLayoutEffect } from "react";
import apiManager from 'src/pages/api/api';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import Modal from "react-bootstrap/Modal";
import { NextIcon } from "src/pages/components/atoms/icons/NextIcon";
import { PrevIcon } from "src/pages/components/atoms/icons/PrevIcon";
import useCalc from "src/pages/components/atoms/useCalc";

import 'swiper/css';
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs, Controller } from "swiper/modules";

export default function GalleryModal({ item,show, onHide }) {
  const swiperRef = useRef(null);
  const subswiperRef = useRef(null);
  const [thumbsSwiper, setThumbsSwiper] = useState();
  const [firstSwiper, setFirstSwiper] = useState();
  // const [secondSwiper, setSecondSwiper] = useState();
  const [swiperIndex, setSwiperIndex] = useState(0);

  const swiper1Ref = useRef(null);
  const swiper2Ref = useRef();
  const { mobile } = useCalc();


  useLayoutEffect(() => {
    if (swiper1Ref.current !== null) {
      swiper1Ref.current.controller.control = swiper2Ref.current;
    }
  }, []);

  const onActiveIndexChange = (swiper) => {    
    setSwiperIndex(swiper.realIndex);
  };

  const next = () => {
    // console.log(
    //   "swiperRef?.current?.swiper?",
    //   swiperRef?.current?.swiper,
    // );
    swiperRef?.current?.swiper?.slideNext();
  };

  const previous = () => {
    swiperRef?.current?.swiper?.slidePrev();
  };

  console.log("modal", item);

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
          onSwiper={(swiper) => {
            if (swiper1Ref.current !== null) {
              swiper1Ref.current = swiper;
              setFirstSwiper(swiper);
            }
          }}
          preloadImages={false}
          loop={true}
          // controller={{ control: secondSwiper }}
          onActiveIndexChange={onActiveIndexChange}
          spaceBetween={10}
          grabCursor={true}
          navigation={true}
          ref={swiperRef}
          slidesPerView={"auto"}
          className="primary-swiper"
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[Thumbs, FreeMode, Navigation, Controller]}
        >
          {item.images.map((item) => {
            {
              {
                /* console.log("5566", item); */
              }
            }
            return (
              <SwiperSlide key={item.directus_files_id}>
                <img
                  className="primary-img"
                  src={`https://directus-cms.vicosys.com.hk/assets/${item.directus_files_id}?access_token=${process.env.NEXT_PUBLIC_TOKEN}`}
                />
              </SwiperSlide>
            );
          })}
          <div onClick={next} className="swiper-button-next">
            <NextIcon />
          </div>
          <div onClick={previous} className="swiper-button-prev">
            <PrevIcon />
          </div>
        </Swiper>
        <Swiper
          controller={{ control: firstSwiper }}
          loop={true}
          rewind={true}
          slidesPerView={5}
          // watchSlidesProgress
          // touchRatio={0.2}
          preloadImages={false}
          slideToClickedSlide={true}
          ref={subswiperRef}
          onSwiper={setThumbsSwiper}
          direction={mobile ? "horizontal" : "vertical"}
          className="sub-swiper"
          freeMode={true}
          modules={[Navigation, Thumbs, Controller]}
        >
          {item?.images?.map((i, index) => {
            {
              /* {
              console.log(i);
            } */
            }
            return (
              <SwiperSlide key={i.directus_files_id}>
                <div
                  className={`index-area ${
                    index === swiperIndex ? "active" : ""
                  }`}
                >
                  {index + 1}
                </div>
                <img
                  className={`${index === swiperIndex ? "active" : ""}`}
                  src={`https://directus-cms.vicosys.com.hk/assets/${i.directus_files_id}?access_token=${process.env.NEXT_PUBLIC_TOKEN}`}
                />
              </SwiperSlide>
            );
          })}
          <div onClick={next} className="swiper-button-next">
            <NextIcon />
          </div>
          <div onClick={previous} className="swiper-button-prev">
            <PrevIcon />
          </div>
        </Swiper>
      </Modal.Body>
    </Modal>
  );
}




