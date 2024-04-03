import { cache } from "react";
import { useEffect, useRef, useState } from "react";
import apiManager from "src/pages/api/api";
import Link from "next/link";
import { useRouter } from "next/router";
import { useGlobalStore } from "src/pages/store/global.store";

export default function ListAside({ sendDataToParent, siteMenu }) {
  const router = useRouter();
  // const setObj = useGlobalStore((state) => state.setObj);


  const handleClick = (channel, item,publisher) => {
    console.log("item", item);
    if (item.type === "product_by_category") {
      sendDataToParent(item.category);
    } else if (item.type === "product_by_series") {
      sendDataToParent(item.query_tags);
    }
    // setObj(item)
    router.push(`/${publisher}/${channel}/${item.slug}`, undefined, {
      shallow: true,
    });
  };

  useEffect(() => {
    const fetchData = async () => {};

    fetchData();
  }, []);

  console.log("ListAside siteMenu", siteMenu);

  


  return (
    <aside className="list-aside">
      {siteMenu?.map((item) => {
        return (
          <ul className="">
            <div className="title">{item.title}</div>
            {item.menu_items?.map((menuItem) => (
              <li key={menuItem.site_menu_items_id.id}>
                <div
                  onClick={() =>
                    handleClick(
                      item.channel,
                      menuItem.site_menu_items_id,
                      item.publisher
                    )
                  }
                >
                  {menuItem.site_menu_items_id.title}
                </div>
              </li>
            ))}
          </ul>
        );
      })}
    </aside>
  );
}

