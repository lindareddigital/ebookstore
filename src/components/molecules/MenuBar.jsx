import { useEffect, useRef,useState } from 'react';
import Link from 'next/link';
import { useRouter } from "next/router";

export default function MenuBar({ sendDataToParent }) {
  const router = useRouter();
  const [navMenu, setNavMenu] = useState([]);

  const handleClick = (item) => {

    // console.log(item);
    
    if (typeof sendDataToParent === "function") {
      sendDataToParent(item.title);
    }
    console.log(item.slug);

    // if(item.slug = "/"){
    //   item.slug = ""
    // }
    const slug = item.slug ? item.slug : "";
    
    router.push(`/${slug}`, undefined, {
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
