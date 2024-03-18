import { cache } from "react";
import { useEffect, useRef, useState } from "react";
import apiManager from "src/pages/api/api";
import Link from "next/link";
import useCalc from "src/pages/components/atoms/useCalc";
import { useRouter } from "next/router";

export default function ListAside({ data, sendDataToParent, siteMenu }) {
  const { width, mobile } = useCalc();
  const router = useRouter();

  console.log("list router", router.query);

  const handleClick = (item) => {
    sendDataToParent(item);
    router.push(`/listing/id=${item}`, undefined, { shallow: true });
  };

  const nowpage = siteMenu.data.find((item) => {    
    return item.menu_items[0].site_menu_id.publisher === router.query.page;
  });

  console.log("listaside", siteMenu, nowpage);


  const series = data.data.product.reduce((acc, item) => {
    return acc.concat(item.series);
  }, []);

  // console.log(series);

  return (
    <aside className="list-aside">
      {nowpage?.menu_items?.map((item) => {
        {
         console.log(
           "prime",
           item.site_menu_id.title,
           item.site_menu_items_id.title
         );
        }
        return (
          <ul className="">
            <div className="title">{item.site_menu_id.title}</div>
            <li key={item.site_menu_items_id.id}>
              <div
                onClick={() => handleClick(item.site_menu_items_id.title)}
                key={`${item.site_menu_items_id.id}`}
              >
                {item.site_menu_items_id.title}
              </div>
            </li>
          </ul>
        );
      })}

      

      <ul>
        <div className="title">依系列搜尋</div>
      </ul>
    </aside>
  );
}

