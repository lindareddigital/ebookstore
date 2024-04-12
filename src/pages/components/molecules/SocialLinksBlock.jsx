import { cache } from 'react';
import { useEffect, useRef,useState } from 'react';
import apiManager from 'src/pages/api/api';
import Link from 'next/link';
import useCalc from 'src/pages/components/atoms/useCalc';




export default function SocialLinksBlock({ data }) {
  return (
    <>
      <div className="social-links">
        <div className="">
          <div className="block-title">
            <div className="dot"></div>
            買書GO
          </div>
          <ul className="container-fluid">
            <li>
              <Link href="">
                <img src="/icons/eslite.png"></img>
              </Link>
            </li>
            <li>
              <Link href="">
                <img src="/icons/bookstw.svg"></img>
              </Link>
            </li>
            <li>
              <Link href="">
                <img src="/icons/stone.svg"></img>
              </Link>
            </li>
            <li>
              <Link href="">
                <img src="/icons/pchome.svg"></img>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
