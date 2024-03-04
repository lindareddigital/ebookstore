'use client';
// import CloseIcon from '/icons/close.svg';
import { useRef, useState } from "react";

export default function Panel() {

  const [panel, setPanel] = useState(false);

  const container = useRef(null);
  // const translation = useTranslation();

  if (!panel) return null;

  const closePanel = () => {
    setPanel(null);
  };

  const { closeByTouchOutside = true, title, component, className } = panel;
  return (
    <div className="pannel-container" ref={container}>
      {closeByTouchOutside && (
        <button className="flex-1" onClick={closePanel} />
      )}

      <div className={`pannel ${className}`}>
        <div className="pannel-content">
          <div className="font-black h4">{title}</div>
          <button onClick={closePanel} className="closePanel-btn">
            {/* <CloseIcon size={28} fill={"#ffffff"} /> */}
            <img src="/icons/close.svg" alt="" />
          </button>
        </div>
        <div className="pt-16 pannel-content-container">
          <ul class="">
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
      </div>
    </div>
  );
}
