import { cache } from "react";
import { useEffect, useRef, useState } from "react";
import apiManager from "src/pages/api/api";
import Link from "next/link";
import useCalc from "src/pages/components/atoms/useCalc";

export default function ListAside({ data, detail }) {
  const { width, mobile } = useCalc();

  console.log("data={data}data={data}", data.data.product, detail.data);

  const series = detail.data.reduce((acc, item) => {
    return acc.concat(item.series);
  }, []);

  // console.log(series);

  return (
    <aside class="list-aside">
      <ul class="">
        <div className="title">依類別搜尋</div>
        {series.map((item, index) => (
          <li key={index}>
            <Link
              key={`${index}`}
              href={{
                pathname: `/listing/${item}`,
                query: { id: item },
              }}
            >
              {item}
            </Link>
          </li>
        ))}
        {/* <li>
          <Link href="">知識漫畫</Link>
        </li>
        <li>
          <Link href="">兒童文學</Link>
        </li>
        <li>
          <Link href="">益智桌遊</Link>
        </li> */}
      </ul>

      <ul>
        <div className="title">依系列搜尋</div>

        {/* <li>
          <Link href="">X星際探險隊</Link>
        </li>
        <li>
          <Link href="">X萬獸探險隊</Link>
        </li>
        <li>
          <Link href="">X恐龍探險隊</Link>
        </li>
        <li>
          <Link href="">X科幻冒險隊</Link>
        </li>
        <li>
          <Link href="">極限挑戰王</Link>
        </li>
        <li>
          <Link href="">機器人戰隊</Link>
        </li>
        <li>
          <Link href="">小公主成長學園</Link>
        </li>
        <li>
          <Link href="">世界名著</Link>
        </li>
        <li>
          <Link href="">超越極限</Link>
        </li>
        <li>
          <Link href="">魔法學園</Link>
        </li>
        <li>
          <Link href="">知識王</Link>
        </li> */}
      </ul>
    </aside>
  );
}
