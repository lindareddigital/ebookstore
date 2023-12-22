import { cache } from 'react';
import { useEffect, useRef,useState } from 'react';
import { Nav, Tab } from 'react-bootstrap';
import apiManager from '@/pages/api/api';
import 'swiper/css';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import useSwiperFunc from '@/hooks/useSwiperFunc';
import Link from 'next/link';




export default function HomeTab() {

  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const swiperRef = useRef(null);
  const { next, previous } = useSwiperFunc(swiperRef);


  const getAllCategory= (async () => {
    try {
      const data = await apiManager.getAllCategory();
      setCategories(data.data)
      return data.data;
    } catch (e) {
      console.log('error', e);
    }
  });

  const tabChange = (async(id) => {

    const data = await apiManager.getCategoryList(id);
    setBooks(data.data)
    console.log('CategoryList',data);
      
  });

  useEffect( () => {
    getAllCategory()
  }, []);


  return(
    <div class="sidebar-wrapper scroll-cling-top">
      <div class="scroll-active"><div id="sidebar-menu-3-0" class="d-none d-lg-flex tab">
        <Link aria-current="page" href="" class="router-link-active router-link-exact-active">
          <span>【益智桌遊】10/31上市</span>
        </Link>
      </div>
      <div class="d-none d-lg-flex tab active">
        <Link  aria-current="page" href="" class="router-link-active router-link-exact-active"><span>X萬獸探險隊</span></Link>
      </div>
      <div id="sidebar-menu-4-1" class="d-none d-lg-flex tab">
        <Link  href="" class="router-link-active router-link-exact-active"><span>X萬獸探險隊 II</span></Link>
      </div>
      <div class="d-none d-lg-flex tab">
        <Link href="/" class="router-link-active router-link-exact-active"><span>X萬獸探險隊 III</span></Link>
      </div>
      <div id="sidebar-menu-4-3" class="d-none d-lg-flex tab">
        <Link aria-current="page" href="" class="router-link-active router-link-exact-active"><span>X萬獸探險隊-4冊合輯</span></Link>
      </div>
      <div class="d-none d-lg-flex tab">
        <Link  aria-current="page" href="/" class="router-link-active router-link-exact-active" ><span >X萬獸探險隊-特別篇</span></Link>
      </div>
      </div>
      <div onClick={topFunction} class="d-none d-lg-flex back-to-top">
        <span>返回頂端</span>
      </div>
    </div>

  )

}




