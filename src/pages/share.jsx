
import Link from 'next/link';
import { cache } from 'react';
import { useEffect, useRef,useState } from 'react';


// const getData = cache(async () => {
//   try {
//     const result = await getCategory();
//     return result;
//   } catch (e) {
//     console.log('error', e);
//   }
// });





export default function Home() {

  
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    
  }, []);


  return(
    <div class="share-page">

      <div class="container-fluid">

        <div class="main-body">

          <div class="news-tabs">

            <nav>
              <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">焦點新訊</button>
                <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">分享專欄</button>
              </div>
            </nav>
            <div class="tab-content" id="nav-tabContent">
              <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                  <div class="share-list-item overflow-hidden">
                    <Link href="/" class="post-thumb">
                      <img class="q-img__image" src="https://www.froghome.org/imgs/post-cover-1363.jpg" alt=""></img>
                    </Link>
                      <div class="post-info">
                        <h4 class="post-title">
                          <Link href="/" class="">2023 年度志工大會報名開跑！</Link>
                        </h4>
                        <p class="post-excerpt">專欄主題:
                            1. 新知分享:專業文章撰文或邀稿(如自然環境、學校教師合作文章)
                            2.文學分享:語文文學類撰文或邀稿
                            3.趣聞分享:
                            (1)當時有趣新聞分享(如與我們書籍相關的諾貝爾得獎、宇宙星球知識)
                            (2)所見所聞分享(例如世界地球日、甲蟲季、老鷹季、書店分享等)
                            4.開放自由投稿:加強與老師、學生連結
                        </p>
                        <div class="post-meta">
                          <Link href="/posts/events" class="post-meta-tag category">活動訊息</Link>
                          <div class="post-meta-date">2023/09/22</div>
                        </div>
                      </div>
                  </div>
              </div>
              <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                
              </div>
              <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">...</div>
            </div>

          </div>

        </div>


        <div class="main-body">

      
            <aside class="share-list">
            
              <div class="share-list-item overflow-hidden">
                <Link href="/" class="post-thumb">
                  <img class="q-img__image" src="https://www.froghome.org/imgs/post-cover-1363.jpg" alt=""></img>
                </Link>
                  <div class="post-info">
                    <h4 class="post-title">
                      <Link href="/" class="">2023 年度志工大會報名開跑！</Link>
                    </h4>
                    <p class="post-excerpt">2023 年度台灣兩棲類保育志工大會於 2023/11/25(六) 在宜蘭頭城休閒農場舉辦，敬邀各地臺灣兩棲類保育志工夥伴們，一起回娘家！</p>
                    <div class="post-meta">
                      <Link href="/posts/events" class="post-meta-tag category">活動訊息</Link>
                      <div class="post-meta-date">2023/09/22</div>
                    </div>
                  </div>
              </div>
            </aside>

            <div class="posts-categories">
              <div class="q-list">
                <div class="q-item">
                  文章分類
                </div>
                <div class="posts-category">
                      <div class="">協會公告</div>
                      <div class="">0</div>
                  </div>
                  <Link href="" class="posts-category">
                    <div class="">活動訊息</div>
                    <div class="">17</div>
                  </Link>
                  <Link href="" class="posts-category">
                    <div class="">志工培訓</div>
                    <div class="">9</div>
                  </Link>
                  <Link href="/" class="posts-category">
                    <div class="">調查成果</div>
                    <div class="">3</div>
                  </Link>
                  <Link href="/" class="posts-category">
                    <div class="">年度分類</div>
                    <div class="">9</div>
                  </Link>
                
                </div>

          </div>

        </div>

      </div>
    </div>


  )

}
