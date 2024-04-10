import { cache } from "react";
import { useEffect, useRef, useState } from "react";
import apiManager from "src/pages/api/api";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ListAside({ siteMenu }) {
  const router = useRouter();
  const handleClick = (channel, item,publisher) => {
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
            <div className="title">{item.title}</div>
            {item.menu_items?.map((menuItem) => (
              <li key={menuItem?.site_menu_items_id?.id}>
                <div
                  onClick={() =>
                    handleClick(
                      item.channel,
                      menuItem?.site_menu_items_id,
                      item.publisher
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

