import { cache } from 'react';
import { useEffect, useRef,useState } from 'react';
import apiManager from 'src/pages/api/api';
import Link from 'next/link';
import useCalc from 'src/pages/components/atoms/useCalc';
import { useRouter } from "next/router";

export default function MenuBar({ siteMenu, sendDataToParent }) {
  const { width, mobile } = useCalc();
  const router = useRouter();
  const [navMenu, setNavMenu] = useState([]);

  const handleClick = (item) => {

    if (typeof sendDataToParent === "function") {
      sendDataToParent(item.title);
    }
    router.push(`/polis-press/${item.slug}`, undefined, {
      shallow: true,
    });

  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/sitemenu/navimenu`);
      const navMenu = await response.json();        
      setNavMenu(navMenu.result.site_menu[0].menu_items);
      // console.log("siteMenu", navMenu.result.site_menu[0].menu_items);
  
    };
    fetchData();
  }, []);


  // console.log("MenuBar", all?.menu_items);

  return (
    <div className="menu-bar">
      <div className="container-fluid">
        {navMenu &&
          navMenu.map((item) => {
            {/* console.log("MenuBar", item); */}
            return (
              <div className="menu-item" key={item.site_menu_items_id.id}>
                <div
                  onClick={() => handleClick(item.site_menu_items_id)}
                  className="link"
                >
                  {item.site_menu_items_id.title}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
