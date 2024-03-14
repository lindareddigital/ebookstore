
import Link from 'next/link';
import { cache } from 'react';
import { useEffect, useRef,useState } from 'react';
import Navbar from "src/pages/components/molecules/Navbar";
import MenuBar from "src/pages/components/molecules/MenuBar";
import Pagination from "react-bootstrap/Pagination";
import Breadcrumb from "src/pages/components/molecules/Breadcrumb";
import apiManager from "src/pages/api/api";


export default function Share({ data }) {

  console.log(
    "Share",
    data.data.pages[0].blocks,
    data.data.pages[0].blocks[3].item.posts
  );

  const column = data.data.pages[0].blocks[3].item.posts;
  const news = data.data.pages[0].blocks[3].item.posts;

  const allTags = column.reduce((acc, post) => {
    return acc.concat(post.posts_id.tags);
  }, []);

  console.log(allTags);

  return (
    <div class="share-page">
      <Navbar />

      <MenuBar />
      <Breadcrumb />

      <div class="container-fluid">
        <div class="">
          <div class="news-tabs">
            <nav class="container-fluid">
              <div
                class="nav nav-tabs more-nav-tabs"
                id="nav-tab"
                role="tablist"
              >
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

                {column?.map((item) => {
                  return (
                    <>
                      <div class="share-list-item overflow-hidden">
                        <Link href="/" class="post-thumb">
                          <img
                            class="q-img__image"
                            src={`https://directus-cms.vicosys.com.hk/assets/${item.posts_id.key_image.id}?access_token=${process.env.NEXT_PUBLIC_TOKEN}`}
                            alt=""
                          ></img>
                        </Link>
                        <div class="post-info">
                          <h4 class="post-title">
                            <Link href="/" class="">
                              {item.posts_id.title}
                            </Link>
                          </h4>
                          <p class="post-excerpt">專欄主題:</p>
                          <div class="post-meta">
                            {item.posts_id.tags?.map((item) => {
                              return (
                                <Link
                                  href="/posts/events"
                                  class="post-meta-tag category"
                                >
                                  {item}
                                </Link>
                              );
                            })}
                            <div class="post-meta-date">
                              2023/09/22
                              <div className="dot"></div>
                              小編
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
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
              >
                {news?.map((item) => {
                  return (
                    <>
                      <div class="share-list-item overflow-hidden">
                        <Link href="/" class="post-thumb">
                          <img
                            class="q-img__image"
                            src={`https://directus-cms.vicosys.com.hk/assets/${item.posts_id.key_image.id}?access_token=${process.env.NEXT_PUBLIC_TOKEN}`}
                            alt=""
                          ></img>
                        </Link>
                        <div class="post-info">
                          <h4 class="post-title">
                            <Link href="/" class="">
                              {item.posts_id.title}
                            </Link>
                          </h4>
                          <p class="post-excerpt">專欄主題:</p>
                          <div class="post-meta">
                            {item.posts_id.tags?.map((item) => {
                              return (
                                <Link
                                  href="/posts/events"
                                  class="post-meta-tag category"
                                >
                                  {item}
                                </Link>
                              );
                            })}
                            <div class="post-meta-date">
                              2023/09/22
                              <div className="dot"></div>
                              小編
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
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

export const getServerSideProps = async () => {
  const result = await apiManager.getNew();

  console.log("datadatadatadata111", result);

  return { props: { data: result } };
};
