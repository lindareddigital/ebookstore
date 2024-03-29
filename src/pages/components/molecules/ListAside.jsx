import { cache } from "react";
import { useEffect, useRef, useState } from "react";
import apiManager from "src/pages/api/api";
import Link from "next/link";
import { useRouter } from "next/router";
import { useGlobalStore } from "src/pages/store/global.store";

export default function ListAside({ sendDataToParent, siteMenu }) {
  const router = useRouter();
  const setObj = useGlobalStore((state) => state.setObj);


  const handleClick = (channel, item) => {
    // console.log("item", item);
    sendDataToParent(item);
    setObj(item)
    router.push(`/listing/${channel}/${item.slug}`, undefined, {
      shallow: true,
    });


  };

  useEffect(() => {
    const fetchData = async () => {};

    fetchData();
  }, []);

  console.log("ListAside siteMenu", siteMenu);

  //query_tags


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
                      menuItem.site_menu_items_id.title,
                      menuItem.site_menu_items_id
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

