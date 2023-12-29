import Link from 'next/link';
import apiManager from '@/pages/api/api';
import { useEffect, useRef,useState } from 'react';

export default function Footer() {
  
  return(       
    <>

    <footer>
      <div class="container-fluid">
        <div class="box">
          <li><a href="">關於我們</a></li>
          <li><a href="">關於大邑</a></li>
          <li><a href="">隱私/服務條款</a></li>
        </div>
        <div class="box">
          <li><a href="">會員中心</a></li>
          <li><a href="">會員專區</a></li>
          <li><a href="">我的收藏</a></li>
          <li><a href="">訂閱新書通知</a></li>
          <li><a href="">查詢帳密</a></li>
          <li><a href=""></a></li>

        </div>
        <div class="box">
          <li><a href="">書單下載</a></li>
          <li><a href="">常見問題</a></li>
          <li><a href="">聯絡我們</a></li>
        </div>
        <div class="box">
          <li><a href="">社群</a></li>
          <li><a href="">大邑</a></li>
          <li><a href="">海濱</a></li>
        </div>
      </div>
    </footer>
      
    </>      
  )
}
