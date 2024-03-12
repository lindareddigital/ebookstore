import { cache } from "react";
import { useEffect, useRef, useState } from "react";
import apiManager from "src/pages/api/api";
import Link from "next/link";
import useCalc from "src/pages/components/atoms/useCalc";

export default function ListAside({ categories }) {
  const { width, mobile } = useCalc();

  const [items, setItems] = useState(null);


  return (
    <aside class="list-aside">
      <ul class="">
        <div className="title">依類別搜尋</div>
        {/* {categories.map((item) => (
          <li key={item.id}>
            <Link
              key={`${item.id}`}
              href={{
                pathname: `/listing/${item.id}`,
                query: { id: item.id },
              }}
            >
              {item.Title}
            </Link>
          </li>
        ))} */}
        <li>
          <Link href="">知識漫畫</Link>
        </li>
        <li>
          <Link href="">兒童文學</Link>
        </li>
        <li>
          <Link href="">益智桌遊</Link>
        </li>
      </ul>

      <ul>
        <div className="title">依系列搜尋</div>

        <li>
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
        </li>
      </ul>
    </aside>
  );
}
