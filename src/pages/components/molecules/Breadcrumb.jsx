import { cache } from 'react';
import { useEffect, useRef,useState } from 'react';
import apiManager from 'src/pages/api/api';
import useSwiperFunc from 'src/hooks/useSwiperFunc';
import Link from 'next/link';




export default function Breadcrumb({}) {

  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);


  const tabChange = (async(id) => {

    const data = await apiManager.getCategoryList(id);
    setBooks(data.data)
    console.log('CategoryList',data);
      
  });




  return(
    <div className="container-fluid">
      <nav className="breadcrumb" aria-label="breadcrumb">
        <li className="breadcrumb-item"><Link href="/" className="">首頁</Link></li>
        <li className="breadcrumb-item"><Link aria-current="page" href="/category/1/3" className="router-link-active router-link-exact-active" >中文出版</Link></li>
      </nav>
    </div>

  )

}




