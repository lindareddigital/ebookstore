import { cache } from 'react';
import { useEffect, useRef,useState } from 'react';
import Link from 'next/link';
import apiManager from 'src/pages/api/api';
import CategoriesList from './CategoryList';
import SidebarWrapper from 'src/pages/components/SidebarWrapper';
import Breadcrumb from 'src/pages/components/molecules/Breadcrumb';
import MenuBar from 'src/pages/components/molecules/MenuBar';
import ListAside from 'src/pages/components/molecules/ListAside';

export default function Home() {

  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);


  const getAllCategory= (async () => {
    try {
      const data = await apiManager.getAllCategory();
      setCategories(data.data)
      return data.data;
    } catch (e) {
      console.log('error', e);
    }
  });

   const getCategoryList = (async (id) => {
    try {
      const data = await apiManager.getCategoryList(id);
      return data.data;
    } catch (e) {
      console.log('error', e);
    }
  });

  useEffect(() => {
    const getData = async () => {
      try {  
        const data = await apiManager.getAllBooks();
        console.log('data.data', data.data);
        setBooks(data.data)
      } catch (e) {
        console.log('error', e);
      }
    };
    getData();

    getAllCategory()

    
  }, []);


  return(
    <div class="listing-page">


      <MenuBar/>
        


      <div class="listing-banner">      
        <img src="https://s2.eslite.dev/unsafe/s.eslite.dev/fh52vnwp5754krpirafuxlm81fgw" class="d-block w-100 h-100" alt="..."></img>
      </div>

      <div class="container-fluid">

        

        <Breadcrumb/>

        <div class="main-body">


          <div class="sidebar-wrapper scroll-cling-top">
              <div class="scroll-active"><div id="sidebar-menu-3-0" class="d-none d-lg-flex tab">
                <Link aria-current="page" href="" class="router-link-active router-link-exact-active">
                  <span>【益智桌遊】10/31上市</span>
                </Link>
              </div>
              <div class="d-none d-lg-flex tab active">
                <Link aria-current="page" href="" class="router-link-active router-link-exact-active"><span>X萬獸探險隊</span></Link>
              </div>
              <div id="sidebar-menu-4-1" class="d-none d-lg-flex tab">
                <Link href="" class="router-link-active router-link-exact-active"><span>X萬獸探險隊 II</span></Link>
              </div>
              <div class="d-none d-lg-flex tab">
                <Link href="/" class="router-link-active router-link-exact-active"><span>X萬獸探險隊 III</span></Link>
              </div>
              <div id="sidebar-menu-4-3" class="d-none d-lg-flex tab">
                <Link aria-current="page" href="" class="router-link-active router-link-exact-active"><span>X萬獸探險隊-4冊合輯</span></Link>
              </div>
              <div class="d-none d-lg-flex tab">
                <Link aria-current="page" href="/" class="router-link-active router-link-exact-active" ><span >X萬獸探險隊-特別篇</span></Link>
              </div>
            </div>
            <div class="d-none d-lg-flex back-to-top">
              <span>返回頂端</span>
            </div>
          </div>

          <SidebarWrapper/>


          
          <ListAside categories={categories}/>

          <div class="right-side">
            <div class="listing-toolbar">
              <ul class="view_type">
                顯示模式 
                <li>                               
                  <span class="type1"><Link href=""></Link></span>
                </li>
                <li>                               
                  <span class="type2 here"><Link href=""></Link></span>
                </li>
              </ul>
              <div class="sortselect">
                <p>排序依</p>
                <select class="form-select" aria-label="Default select example">
                  <option selected>上市日期(新→舊)</option>
                  <option value="1">上市日期(舊→新)</option>
                  <option value="2">暢銷度</option>
                  <option value="3">價格(高→低)</option>
                </select>
              </div>


            </div>

            {categories.map((item) => {
              return (
              <>
                <CategoriesList props={item}/>
              </>
              );
            })}
          </div>

        </div>

      </div>

    </div>

  )

}
