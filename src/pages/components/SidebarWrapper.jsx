import { cache } from 'react';
import { useEffect, useRef,useState } from 'react';
import { Nav, Tab } from 'react-bootstrap';
import apiManager from 'src/pages/api/api';
import 'swiper/css';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import useSwiperFunc from 'src/hooks/useSwiperFunc';
import Link from 'next/link';
import { FacebookProvider, MessageUs, CustomChat } from "react-facebook";


export default function SidebarWrapper() {

  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const swiperRef = useRef(null);
  const { next, previous } = useSwiperFunc(swiperRef);

  const topFunction = () =>{
    window.scrollTo(0, 0);
  }

  const tabChange = (async(id) => {

    setBooks(data.data)
    console.log('CategoryList',data);
      
  });

  return (
    <div className="sidebar-wrapper scroll-cling-top">
      {/* <div className="scroll-active"><div id="sidebar-menu-3-0" className="d-none d-lg-flex tab">
        <Link aria-current="page" href="" className="router-link-active router-link-exact-active">
          <span>【益智桌遊】10/31上市</span>
        </Link>
      </div>
      <div className="d-none d-lg-flex tab active">
        <Link  aria-current="page" href="" className="router-link-active router-link-exact-active"><span>X萬獸探險隊</span></Link>
      </div>
      <div id="sidebar-menu-4-1" className="d-none d-lg-flex tab">
        <Link  href="" className="router-link-active router-link-exact-active"><span>X萬獸探險隊 II</span></Link>
      </div>
      <div className="d-none d-lg-flex tab">
        <Link href="/" className="router-link-active router-link-exact-active"><span>X萬獸探險隊 III</span></Link>
      </div>
      <div id="sidebar-menu-4-3" className="d-none d-lg-flex tab">
        <Link aria-current="page" href="" className="router-link-active router-link-exact-active"><span>X萬獸探險隊-4冊合輯</span></Link>
      </div>
      <div className="d-none d-lg-flex tab">
        <Link  aria-current="page" href="/" className="router-link-active router-link-exact-active" ><span >X萬獸探險隊-特別篇</span></Link>
      </div>
      </div> */}
      <div className="message-btn">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg"
          alt=""
        ></img>
      </div>
      <div onClick={topFunction} className="back-to-top">
        {/* <span>返回頂端</span> */}
        <img src="/icons/backtop.svg" alt="" />
      </div>
      {/* <FacebookProvider appId="966137704206275">
        <MessageUs messengerAppId="966137704206275" pageId="106453562488245" />
      </FacebookProvider>
      <FacebookProvider appId="966137704206275" chatSupport>
        <CustomChat pageId="106453562488245" minimized={true} />
      </FacebookProvider> */}
    </div>
  );

}




