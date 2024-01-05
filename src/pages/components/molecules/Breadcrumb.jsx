import { cache } from 'react';
import { useEffect, useRef,useState } from 'react';
import apiManager from '@/pages/api/api';
import useSwiperFunc from '@/hooks/useSwiperFunc';
import Link from 'next/link';




export default function Breadcrumb() {

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
    <nav class="breadcrumb" aria-label="breadcrumb">
      <li class="breadcrumb-item"><Link href="/" class="">首頁</Link></li>
      <li class="breadcrumb-item"><Link aria-current="page" href="/category/1/3" class="router-link-active router-link-exact-active" >中文出版</Link></li>
    </nav>

  )

}




