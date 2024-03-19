import { cache } from 'react';
import { useEffect, useRef,useState } from 'react';
import apiManager from 'src/pages/api/api';
import Link from 'next/link';
import useCalc from 'src/pages/components/atoms/useCalc';

export default function Navbar({ siteMenu }) {
  const { width, mobile } = useCalc();

  const [open, setOpen] = useState(false);
  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };
  console.log("siteMenu", siteMenu);

  const all = siteMenu.data.find((item) => {
    return item.menu_items[0].site_menu_id.publisher === "global";
  });

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={open ? { top: "0", position: "fixed" } : {}}
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
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
          <Link className="navbar-brand" href="#">
            大邑文化
          </Link>
          <Link
            href="/member"
            className="span align-items-center icon-fa-user-circle icon face-icon face-icon-white"
            title=""
            target="_self"
            aria-label="會員中心"
          ></Link>
          <div className="nav-right">
            <button className="search-btn btn" type="submit">
              <img src="/icons/cart.svg" alt="" />
            </button>
            <hr className="nav-hr" />
            <button className="search-btn btn" type="submit">
              <img src="/icons/member.svg" alt="" />
            </button>
          </div>

          <form className="input-group">
            <input
              onChange={(e) => setSearchKeywords(e.target.value)}
              className="form-control header-search-input"
              type="text"
            ></input>
            <button
              onClick={() => {
                searchDataKeywords();
                setTimeout(() => {
                  setIsSearchOn(true);
                }, 300);
              }}
              className="search-btn"
              type="submit"
            >
              <img src="/icons/search.svg" alt="" />
            </button>
          </form>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {/* <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  href="/listing/all"
                >
                  全站分類
                </Link>
              </li> */}

              {all?.menu_items.map((item) => {
                return (
                  <>
                    <li className="nav-item">
                      <Link
                        href={{
                          pathname: `/listing`,
                          query: { slug: `${item.site_menu_items_id.slug}` },
                        }}
                        className="nav-link"
                      >
                        {item.site_menu_items_id.title}
                      </Link>
                    </li>
                  </>
                );
              })}
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href={{
                    pathname: `/singlepage/`,
                    query: { slug: "seashore" },
                  }}
                >
                  海濱
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href={{
                    pathname: `/singlepage`,
                    query: { slug: "yidin" },
                  }}
                >
                  一丁
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container-fluid header-main">
        <div className="header-search-bar">
          <Link href="/">
            <img className="logo" src="/images/logo.jpeg" alt=""></img>
          </Link>
          <div className="right-side">
            <form className="input-group">
              <div className="dropdown">
                <Link
                  className="btn dropdown-toggle"
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  全站
                </Link>

                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuLink"
                >
                  <li>
                    <Link className="dropdown-item" href="#">
                      Action
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      Another action
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      Something else here
                    </Link>
                  </li>
                </ul>
              </div>
              <input
                className="form-control header-search-input"
                type="text"
              ></input>
              <button className="search-btn" type="submit">
                <img src="/icons/search.svg"></img>
              </button>

              <div className="header-toolbar">
                <div className="navbar-link">
                  <button type="button" className="btn">
                    <img src="/icons/cart.svg" alt="" />
                    購物車
                  </button>
                  <hr className="nav-hr" />

                  <button type="button" className="btn">
                    <img src="/icons/member.svg" alt="" />
                    登入
                  </button>
                  <div className="dot"></div>
                  <button type="button" className="btn">
                    註冊
                  </button>
                </div>

                <div className="label-group">
                  <Link
                    href={{
                      pathname: `/singlepage/`,
                      query: { slug: "seashore" },
                    }}
                  >
                    <button type="button" className="btn">
                      海濱
                    </button>
                  </Link>
                  <hr className="nav-hr" />
                  <Link
                    href={{
                      pathname: `/singlepage`,
                      query: { slug: "yidin" },
                    }}
                  >
                    <button type="button" className="btn">
                      一丁
                    </button>
                  </Link>
                </div>
              </div>
            </form>
            <div className="keyword-block">
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
