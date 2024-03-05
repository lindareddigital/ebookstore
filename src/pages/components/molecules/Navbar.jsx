import { cache } from 'react';
import { useEffect, useRef,useState } from 'react';
import apiManager from 'src/pages/api/api';
import Link from 'next/link';
import useCalc from 'src/pages/components/atoms/useCalc';

export default function Navbar({categories}) {

  const { width, mobile } = useCalc();

  const [items, setItems] = useState(null);

  console.log(categories,'categories');

  const [open, setOpen] = useState(false);
  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  


  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const data = await apiManager.getHaibinParams(`Haibin?filter[Category][_eq]=${props.category}`);

  //       setItems(data.data);
  //       // console.log('88', props,data.data);
  //       // return data.data;
  //     } catch (e) {
  //       console.log('error', e);
  //     }
  //   };
  //   getData();
  // }, [props]);


  return (
    <>
      <nav
        class="navbar navbar-expand-lg navbar-light"
        style={open ? { top: "0", position: "fixed" } : {}}
      >
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={toggleOpen}
          >
            {open ? (
              <img src="/icons/close.svg" alt="" />
            ) : (
              <img src="/icons/nav-menu.svg" alt="" />
            )}
          </button>
          <Link class="navbar-brand" href="#">
            大邑文化
          </Link>
          <Link
            href="/member"
            class="span align-items-center icon-fa-user-circle icon face-icon face-icon-white"
            title=""
            target="_self"
            aria-label="會員中心"
          ></Link>
          <div class="nav-right">
            <button class="search-btn btn" type="submit">
              <img src="/icons/cart.svg" alt="" />
            </button>
            <hr class="nav-hr" />
            <button class="search-btn btn" type="submit">
              <img src="/icons/member.svg" alt="" />
            </button>
          </div>

          <form class="input-group">
            <input
              onChange={(e) => setSearchKeywords(e.target.value)}
              class="form-control header-search-input"
              type="text"
            ></input>
            <button
              onClick={() => {
                searchDataKeywords();
                setTimeout(() => {
                  setIsSearchOn(true);
                }, 300);
              }}
              class="search-btn"
              type="submit"
            >
              <img src="/icons/search.svg" alt="" />
            </button>
          </form>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" href="#">
                  全站分類
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" href="#">
                  童書
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" href="#">
                  成書
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" href="#">
                  益智產品
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" href="#">
                  買書GO
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div class="container-fluid header-main">
        <div class="header-search-bar">
          <Link href="/">
            <img class="logo" src="/images/logo.jpeg" alt=""></img>
          </Link>
          <div class="right-side">
            <div class="label-group">
              <Link
                href={{
                  pathname: `/singlepage/`,
                  query: { page: "haibin" },
                }}
              >
                <button type="button" class="btn">
                  海濱
                </button>
              </Link>
              <Link
                href={{
                  pathname: `/singlepage`,
                  query: { page: "yidin" },
                }}
              >
                <button type="button" class="btn">
                  一丁
                </button>
              </Link>
            </div>
            <form class="input-group">
              <div class="dropdown">
                <Link
                  class="btn dropdown-toggle"
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  全站
                  
                </Link>

                <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <li>
                    <Link class="dropdown-item" href="#">
                      Action
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" href="#">
                      Another action
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" href="#">
                      Something else here
                    </Link>
                  </li>
                </ul>
              </div>
              <input
                class="form-control header-search-input"
                type="text"
              ></input>
              <button class="search-btn" type="submit">
                <img src="/icons/search.svg"></img>
              </button>

              <div class="header-toolbar">
                <button type="button" class="btn">
                  購物車
                  <img src="/icons/cart.svg" alt="" />
                </button>
                <hr class="nav-hr" />

                <button type="button" class="btn">
                  登入
                </button>
                <div className="dot"></div>
                <button type="button" class="btn">
                  註冊
                </button>
              </div>
            </form>
            <div class="keyword-block">
              <div className="pill">HOT</div>
              <Link href="">X星際探險隊</Link>
              <Link href="">成語-民間故事</Link>
              <Link href="">X極限挑戰王</Link>
              <Link href=""></Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );

}
