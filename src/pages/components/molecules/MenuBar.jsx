import { cache } from 'react';
import { useEffect, useRef,useState } from 'react';
import apiManager from 'src/pages/api/api';
import Link from 'next/link';
import useCalc from 'src/pages/components/atoms/useCalc';
import { useRouter } from "next/router";

export default function MenuBar({ siteMenu, sendDataToParent }) {
  const { width, mobile } = useCalc();
  const router = useRouter();


  const all = siteMenu.data.find((item) => {
    // console.log("item", item.menu_items);
    return item.menu_items[0].site_menu_id.publisher === "global";
  });

  const handleClick = (item) => {

    if (typeof sendDataToParent === "function") {
      sendDataToParent(item.title);
    }
    router.push(`/listing/${item.slug}`, undefined, {
      shallow: true,
    });

     
  };

  // console.log("MenuBar", all?.menu_items);

  return (
    <div className="menu-bar">
      <div className="container-fluid">
        {all?.menu_items.map((item) => {
          return (
            <>
              <div className="" key={item.title}>
                <div
                  onClick={() => handleClick(item.site_menu_items_id)}
                  className="link"
                >
                  {item.site_menu_items_id.title}
                </div>
                {/* <Link href="" className="link">
                  5566
                </Link> */}
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
