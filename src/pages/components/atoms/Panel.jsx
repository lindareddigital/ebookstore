'use client';
// import CloseIcon from '/icons/close.svg';
import { useRef, useState } from "react";

export default function Panel() {

  const [panel, setPanel] = useState(false);

  const container = useRef(null);

  if (!panel) return null;

  console.log('panel');
  

  const closePanel = () => {
    setPanel(null);
  };

  const { closeByTouchOutside = true, title, component, className } = panel;
  return (
    <div className="pannel-container" ref={container}>
      {/* {closeByTouchOutside && (
        <button className="flex-1" onClick={closePanel} />
      )} */}

      <div className="filter-area">
        <ul className="">
          <div className="title">依類別搜尋</div>
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
      </div>

      <ul className="pannel-btn">
        <li>
          <img src="/icons/filter.svg" alt="" />
          篩選
        </li>
        <li>
          <img src="/icons/sort.svg" alt="" />
          排序
        </li>
        <li>小圖</li>
        <li>列表</li>
      </ul>

      <div className={`pannel-content ${className}`}>
        {/* <div className="pannel-content">
          <div className="font-black h4">{title}</div>
          <button onClick={closePanel} className="closePanel-btn">
            <img src="/icons/close.svg" alt="" />
          </button>
        </div> */}
      </div>
    </div>
  );
}
