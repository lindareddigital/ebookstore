import { cache } from "react";
import { useEffect, useRef, useState } from "react";
import apiManager from "src/pages/api/api";
import Link from "next/link";
import useCalc from "src/pages/components/atoms/useCalc";
import { useRouter } from "next/router";

export default function ListAside({ data,sendDataToParent }) {
  const { width, mobile } = useCalc();
  const router = useRouter();


  const handleClick = (item) => {
    sendDataToParent(item);
    router.push(`/listing/id=${item}`, undefined, { shallow: true });

  };


  // console.log("data={data}data={data}", data.data.product, detail);
  // return [];

  const series = data.data.product.reduce((acc, item) => {
    return acc.concat(item.series);
  }, []);

  // console.log(series);

  return (
    <aside className="list-aside">
      <ul className="">
        <div className="title">依類別搜尋</div>
        {series.map((item, index) => {
          {/* console.log(item) */}
          return (
          <li key={index}>
            <div onClick={() => handleClick(item)} key={`${index}`}>
              {item}
            </div>
          </li>
        )})}
      </ul>

      <ul>
        <div className="title">依系列搜尋</div>
      </ul>
    </aside>
  );
}
