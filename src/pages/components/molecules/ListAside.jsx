import { cache } from "react";
import { useEffect, useRef, useState } from "react";
import apiManager from "src/pages/api/api";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ListAside({ data, sendDataToParent, siteMenu }) {
  const router = useRouter();

  console.log("list router", router.query);

  const handleClick = (item) => {
    sendDataToParent(item);
    router.push(`/listing/id=${item}`, undefined, { shallow: true });
  };

  const nowpage = siteMenu.data.filter((item) => {
    if (router.query.slug == 'all'){
      console.log("router.query.slug", router.query.slug);
      return item.menu_items[0].site_menu_id.publisher === "polis_press";
    }else if (router.query.slug === "seashore"){
      console.log("router.query.slug seashore", item.menu_items);
      return item.menu_items[0].site_menu_id?.publisher === router.query.slug;
    }else{
      return item.menu_items[0].site_menu_id.publisher === "polis_press";
    }
  });

  console.log("nowpage", nowpage);


  const series = data.data.product.reduce((acc, item) => {
    return acc.concat(item.series);
  }, []);

  // console.log(series);

  return (
    <aside className="list-aside">
      {nowpage?.map((item) => {
        {
          console.log("prime", item.menu_items, 
            /* item.menu_items.site_menu_id.title,
           item.menu_items.site_menu_items_id.title */
          );
        }
        return (
          <ul className="">
            <div className="title">{item.menu_items[0].site_menu_id.title}</div>

            
            {item.menu_items?.map((item) => {
              {
                {/* console.log("64",item); */}
              }
              return (
                
                  <li key={item.site_menu_items_id.id}>
                    <div
                      onClick={() =>
                        handleClick(item.site_menu_items_id.title)
                      }
                      key={`${item.site_menu_items_id.id}`}
                    >
                      {item.site_menu_items_id.title}
                    </div>
                  </li>
              );
            })}
          </ul>
        );
      })}

    </aside>
  );
}

