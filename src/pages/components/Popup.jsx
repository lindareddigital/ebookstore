import { useEffect, useRef, useState, useLayoutEffect } from "react";
import Link from 'next/link';
import Modal from "react-bootstrap/Modal";


export default function Popup({ promotion, onHide,show }) {
  console.log("Popup", promotion);

  return (
    <div>
      <Modal
        size="lg"
        show={show}
        onHide={onHide}
        aria-labelledby="example-modal-sizes-title-lg"
        className="popup"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <img
            className=""
            src={`https://directus-cms.vicosys.com.hk/assets/${promotion?.item?.image?.id}?access_token=${process.env.NEXT_PUBLIC_TOKEN}`}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}




