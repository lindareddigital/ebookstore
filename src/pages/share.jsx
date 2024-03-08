
import Link from 'next/link';
import { cache } from 'react';
import { useEffect, useRef,useState } from 'react';
import Navbar from "src/pages/components/molecules/Navbar";
import MenuBar from "src/pages/components/molecules/MenuBar";
import Pagination from "react-bootstrap/Pagination";
import Breadcrumb from "src/pages/components/molecules/Breadcrumb";


// const getData = cache(async () => {
//   try {
//     const result = await getCategory();
//     return result;
//   } catch (e) {
//     console.log('error', e);
//   }
// });





export default function Share() {

  
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    
  }, []);


  return (
    <div class="share-page">
      <Navbar />

      <MenuBar />
      <Breadcrumb />

      <div class="container-fluid">
        <div class="">
          <div class="news-tabs">
            <nav class="container-fluid">
              <div class="nav nav-tabs more-nav-tabs" id="nav-tab" role="tablist">
                <img class="topright" src="/icons/leftboxicon.svg"></img>
                <button
                  class="nav-link active"
                  id="nav-home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-home"
                  type="button"
                  role="tab"
                  aria-controls="nav-home"
                  aria-selected="true"
                >
                  焦點新訊
                </button>
                <button
                  class="nav-link"
                  id="nav-profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-profile"
                  type="button"
                  role="tab"
                  aria-controls="nav-profile"
                  aria-selected="false"
                >
                  分享專欄
                </button>
              </div>
            </nav>
            <div class="tab-content" id="nav-tabContent">
              <div
                class="tab-pane fade show active"
                id="nav-home"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
              >
                <div class="select-bar">
                  <label class="">篩選類別</label>
                  <select class="form-select" id="floatingSelect">
                    <option selected>請選擇</option>
                    <option value="2">2.異業合作</option>
                    <option value="3">3.帳號問題</option>
                    <option value="4">4.購書問題</option>
                  </select>
                </div>
                <div class="share-list-item overflow-hidden">
                  <Link href="/" class="post-thumb">
                    <img
                      class="q-img__image"
                      src="https://www.froghome.org/imgs/post-cover-1363.jpg"
                      alt=""
                    ></img>
                  </Link>
                  <div class="post-info">
                    <h4 class="post-title">
                      <Link href="/" class="">
                        2023 年度志工大會報名開跑！
                      </Link>
                    </h4>
                    <p class="post-excerpt">
                      專欄主題: 1.
                      新知分享:專業文章撰文或邀稿(如自然環境、學校教師合作文章)
                      2.文學分享:語文文學類撰文或邀稿 3.趣聞分享:
                      (1)當時有趣新聞分享(如與我們書籍相關的諾貝爾得獎、宇宙星球知識)
                      (2)所見所聞分享(例如世界地球日、甲蟲季、老鷹季、書店分享等)
                      4.開放自由投稿:加強與老師、學生連結
                    </p>
                    <div class="post-meta">
                      <Link href="/posts/events" class="post-meta-tag category">
                        活動訊息
                      </Link>
                      <div class="post-meta-date">
                        2023/09/22
                        <div className="dot"></div>
                        小編
                      </div>
                    </div>
                  </div>
                </div>
                <div class="share-list-item overflow-hidden">
                  <Link href="/" class="post-thumb">
                    <img
                      class="q-img__image"
                      src="https://www.froghome.org/imgs/post-cover-1363.jpg"
                      alt=""
                    ></img>
                  </Link>
                  <div class="post-info">
                    <h4 class="post-title">
                      <Link href="/" class="">
                        2023 年度志工大會報名開跑！
                      </Link>
                    </h4>
                    <p class="post-excerpt">
                      專欄主題: 1.
                      新知分享:專業文章撰文或邀稿(如自然環境、學校教師合作文章)
                      2.文學分享:語文文學類撰文或邀稿 3.趣聞分享:
                      (1)當時有趣新聞分享(如與我們書籍相關的諾貝爾得獎、宇宙星球知識)
                      (2)所見所聞分享(例如世界地球日、甲蟲季、老鷹季、書店分享等)
                      4.開放自由投稿:加強與老師、學生連結
                    </p>
                    <div class="post-meta">
                      <Link href="/posts/events" class="post-meta-tag category">
                        活動訊息
                      </Link>
                      <div class="post-meta-date">
                        2023/09/22
                        <div className="dot"></div>
                        小編
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="posts-categories">
                <div class="posts-category">
                  <div class="">新知分享</div>
                  <div class="">0</div>
                </div>
                <Link href="" class="posts-category">
                  <div class="">文學分享</div>
                  <div class="">17</div>
                </Link>
                <Link href="" class="posts-category">
                  <div class="">趣聞分享</div>
                  <div class="">9</div>
                </Link>
                <Link href="/" class="posts-category">
                  <div class="">開放自由投稿</div>
                  <div class="">3</div>
                </Link>
              </div>

              <div
                class="tab-pane fade"
                id="nav-profile"
                role="tabpanel"
                aria-labelledby="nav-profile-tab"
              ></div>
              <div
                class="tab-pane fade"
                id="nav-contact"
                role="tabpanel"
                aria-labelledby="nav-contact-tab"
              >
                <div class="share-list-item overflow-hidden">
                  <Link href="/" class="post-thumb">
                    <img
                      class="q-img__image"
                      src="https://www.froghome.org/imgs/post-cover-1363.jpg"
                      alt=""
                    ></img>
                  </Link>
                  <div class="post-info">
                    <h4 class="post-title">
                      <Link href="/" class="">
                        2023 年度志工大會報名開跑！
                      </Link>
                    </h4>
                    <p class="post-excerpt">
                      專欄主題: 1.
                      新知分享:專業文章撰文或邀稿(如自然環境、學校教師合作文章)
                      2.文學分享:語文文學類撰文或邀稿 3.趣聞分享:
                      (1)當時有趣新聞分享(如與我們書籍相關的諾貝爾得獎、宇宙星球知識)
                      (2)所見所聞分享(例如世界地球日、甲蟲季、老鷹季、書店分享等)
                      4.開放自由投稿:加強與老師、學生連結
                    </p>
                    <div class="post-meta">
                      <Link href="/posts/events" class="post-meta-tag category">
                        活動訊息
                      </Link>
                      <div class="post-meta-date">
                        2023/09/22 <div className="dot"></div>
                        小編
                      </div>
                    </div>
                  </div>
                </div>
                <div class="share-list-item overflow-hidden">
                  <Link href="/" class="post-thumb">
                    <img
                      class="q-img__image"
                      src="https://www.froghome.org/imgs/post-cover-1363.jpg"
                      alt=""
                    ></img>
                  </Link>
                  <div class="post-info">
                    <h4 class="post-title">
                      <Link href="/" class="">
                        2023 年度志工大會報名開跑！
                      </Link>
                    </h4>
                    <p class="post-excerpt">
                      專欄主題: 1.
                      新知分享:專業文章撰文或邀稿(如自然環境、學校教師合作文章)
                      2.文學分享:語文文學類撰文或邀稿 3.趣聞分享:
                      (1)當時有趣新聞分享(如與我們書籍相關的諾貝爾得獎、宇宙星球知識)
                      (2)所見所聞分享(例如世界地球日、甲蟲季、老鷹季、書店分享等)
                      4.開放自由投稿:加強與老師、學生連結
                    </p>
                    <div class="post-meta">
                      <Link href="/posts/events" class="post-meta-tag category">
                        活動訊息
                      </Link>
                      <div class="post-meta-date">
                        2023/09/22 <div className="dot"></div>
                        小編
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="">
              <Pagination>
                <Pagination.Prev />
                <Pagination.Item>{1}</Pagination.Item>
                {/* <Pagination.Ellipsis /> */}

                {/* <Pagination.Ellipsis /> */}
                <Pagination.Item>{2}</Pagination.Item>
                <Pagination.Next />
              </Pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}
