import { cache } from 'react';
import { useEffect, useRef,useState } from 'react';
import useSwiperFunc from 'src/hooks/useSwiperFunc';
import Link from 'next/link';


export default function Breadcrumb({data}) {

  const [books, setBooks] = useState([]);
  const url = '/';


  return(
    <div className="container-fluid">
      <nav className="breadcrumb" aria-label="breadcrumb">
        <li className="breadcrumb-item"><Link href="/" className="">首頁</Link></li>
        <li className="breadcrumb-item"><Link aria-current="page" href={url} className="router-link-active router-link-exact-active" >{data}</Link></li>
      </nav>
    </div>

  )

}




