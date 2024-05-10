import { cache } from 'react';
import { useEffect, useRef,useState } from 'react';
import apiManager from 'src/pages/api/api';
import useSwiperFunc from 'src/hooks/useSwiperFunc';
import Link from 'next/link';




export default function Breadcrumb({data}) {

  const [books, setBooks] = useState([]);

  const url = '';


  const tabChange = (async(id) => {

    setBooks(data.data)
    console.log('CategoryList',data);
      
  });


  return(
    <div className="container-fluid">
      <nav className="breadcrumb" aria-label="breadcrumb">
        <li className="breadcrumb-item"><Link href="/" className="">首頁</Link></li>
        <li className="breadcrumb-item"><Link aria-current="page" href={url} className="router-link-active router-link-exact-active" >{data}</Link></li>
      </nav>
    </div>

  )

}




