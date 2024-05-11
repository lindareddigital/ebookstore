import { useEffect, useRef, useState, useLayoutEffect } from "react";
import Link from 'next/link';
import Modal from "react-bootstrap/Modal";
import { isInTimeRange } from "src/utilities/tool.js";


export default function Popup({ promotion, onHide,show }) {
  // console.log(
  //   "Popup",
  //   promotion,
  //   isInTimeRange(promotion?.item?.start_at, promotion?.item?.end_at)
  // );


  return (
    <div>
      {promotion?.item?.status === "published" &&
        isInTimeRange(promotion?.item?.start_at, promotion?.item?.end_at) && (
          <Modal
            size="lg"
            show={show}
            onHide={onHide}
            aria-labelledby="example-modal-sizes-title-lg"
            className="popup"
          >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <Link target="_blank" href={`${promotion?.item?.url}`}>
                <img
                  className=""
                  src={`${process.env.NEXT_PUBLIC_API_URL}/assets/${promotion?.item?.image?.id}?access_token=${process.env.NEXT_PUBLIC_TOKEN}`}
                />
              </Link>
            </Modal.Body>
          </Modal>
        )}
    </div>
  );
}




