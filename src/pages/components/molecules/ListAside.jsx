import { cache } from "react";
import { useEffect, useRef, useState } from "react";
import apiManager from "src/pages/api/api";
import Link from "next/link";
import { useRouter } from "next/router";
import { getPageColor } from "src/utilities/tool.js";

export default function ListAside({ siteMenu }) {
  const router = useRouter();
  const publisher = router.query.slug?.[0];
  const handleClick = (channel, item, publisher, menuItem) => {
    console.log(item, menuItem);

      if (publisher === "polis-press"){
        publisher = "books"
      }
      router.push(`/${publisher}/${channel}/${item.slug}`, undefined, {
        shallow: true,
      });
  };

  useEffect(() => {
    const fetchData = async () => {};

    fetchData();
  }, []);

  // console.log("ListAside siteMenu", siteMenu);

  return (
    <aside className="list-aside">
      {siteMenu?.map((item) => {
        return (
          <ul className="">
            <div className={`title ${getPageColor(publisher)}`}>
              {item.title}
            </div>
            {item.menu_items?.map((menuItem) => (
              <li key={menuItem?.site_menu_items_id?.id}>
                <div
                  onClick={() =>
                    handleClick(
                      item.channel,
                      menuItem?.site_menu_items_id,
                      item.publisher,
                      menuItem
                    )
                  }
                >
                  {menuItem?.site_menu_items_id?.title}
                </div>
              </li>
            ))}
          </ul>
        );
      })}
    </aside>
  );
}

