import { cache } from 'react';
import { useEffect, useRef,useState } from 'react';
import apiManager from 'src/pages/api/api';
import Link from 'next/link';
import useCalc from 'src/pages/components/atoms/useCalc';




export default function MenuBar({siteMenu}) {
  const { width, mobile } = useCalc();

  const all = siteMenu.data.find((item) => {
    // console.log("item", item.menu_items);
    
    return item.menu_items[0].site_menu_id.publisher === "global";
  });

  console.log("MenuBar", all?.menu_items);

  return (
    <div className="menu-bar">
      <div className="container-fluid">
        {all?.menu_items.map((item) => {

          return (
            <>
              <div className="">
                <Link
                  href={`/listing/${item.site_menu_items_id.slug}`}
                  className="link"
                >
                  {item.site_menu_items_id.title}
                </Link>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
