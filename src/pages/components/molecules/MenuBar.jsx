import { cache } from 'react';
import { useEffect, useRef,useState } from 'react';
import apiManager from 'src/pages/api/api';
import Link from 'next/link';
import useCalc from 'src/pages/components/atoms/useCalc';




export default function MenuBar(props) {

  const { width, mobile } = useCalc();

  const [items, setItems] = useState(null);


  return (
    <div className="menu-bar">
      <div className="container-fluid">
        <div className="">
          <Link href="/listing" className="link">
            全站分類
          </Link>
        </div>
        <div className="">
          <Link href="" className="link">
            童書
          </Link>
        </div>
        <div className="">
          <Link href="" className="link">
            成書
          </Link>
        </div>
        <div className="">
          <Link href="" className="link">
            益智產品
          </Link>
        </div>
        <div className="">
          <Link href="" className="link">
            買書GO
          </Link>
        </div>
      </div>
    </div>
  );

}
