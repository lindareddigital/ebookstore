import { cache } from "react";
import { useEffect, useRef, useState } from "react";
import apiManager from "src/pages/api/api";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ListAside({ sendDataToParent, siteMenu }) {
  const router = useRouter();

  
  const handleClick = (channel,item) => {
    console.log("item", item);
    sendDataToParent(item.id);
    router.push(`/listing/${channel}/${item.slug}`, undefined, {
      shallow: true,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      
    };

    fetchData();
  }, []);

  console.log("siteMenu", siteMenu?.result?.sitemenu);
  


  // console.log("nowpage", nowpage);

  // const series = data.data.product.reduce((acc, item) => {
  //   return acc.concat(item.series);
  // }, []);

  // console.log(series);

  return (
    <aside className="list-aside">
      {siteMenu?.result?.sitemenu?.map((item) => {
        {
          {
            /* console.log("prime", item.menu_items); */
          }
        }
        return (
          <ul className="">
            <div className="title">{item.menu_items[0].site_menu_id.title}</div>
            {item.menu_items?.map((item) => {
              {
                {
                  {
                    /* console.log("64", item.site_menu_id.channel); */
                  }
                }
              }
              return (
                <li>
                  <div
                    onClick={() =>
                      handleClick(
                        item.site_menu_id.channel,
                        item.site_menu_items_id
                      )
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

