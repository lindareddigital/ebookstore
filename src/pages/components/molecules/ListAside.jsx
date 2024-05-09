import { cache } from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getPageColor } from "src/utilities/tool.js";
import { v4 as uuidv4 } from "uuid";

export default function ListAside({ siteMenu }) {
  const router = useRouter();
  let publisher = router.query.slug?.[0];
  const handleClick = (channel, item, menuItem) => {
    // console.log(item, menuItem, "publisher", publisher);

      if (router.pathname.includes("books")) {
        publisher = "books";
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
              {item?.item?.title}
            </div>
            {item?.item?.menu_items?.map((menuItem) => (
              <li key={uuidv4()}>
                <div
                  onClick={() =>
                    handleClick(
                      item.item.channel,
                      menuItem?.site_menu_items_id,
                      item.item.publisher,
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

