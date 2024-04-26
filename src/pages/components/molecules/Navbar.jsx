import { cache } from 'react';
import { useEffect, useRef,useState } from 'react';
import apiManager from 'src/pages/api/api';
import Link from 'next/link';
import useCalc from 'src/pages/components/atoms/useCalc';
import { useRouter } from "next/router";
// import useTokenExpiration from "src/hooks/useTokenExpiration";

export default function Navbar({}) {
  const [navMenu, setNavMenu] = useState(null);
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [info, setInfo] = useState(null);


  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClick = (item) => {
    if (typeof sendDataToParent === "function") {
      sendDataToParent(item.title);
    }
    router.push(`/books/${item.slug}`, undefined, {
      shallow: true,
    });
  };


  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");
    localStorage.removeItem("email");
    setEmail(null);

    router.push(`/`, undefined, {
      shallow: true,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/sitemenu/navimenu`);
      const navMenu = await response.json();
      setNavMenu(navMenu.result.site_menu[0].menu_items);
    };
    fetchData();

    setEmail(localStorage.getItem("email"));
    console.log("email", email, localStorage.getItem("email"));


    const checkTokenExpiration = () => {
      const token = localStorage.getItem("token");
      const expiryTime = localStorage.getItem("tokenExpiry");

      if (
        token &&
        expiryTime &&
        new Date().getTime() < parseInt(expiryTime, 10)
      ) {
        const interval = setInterval(() => {
          const currentTime = new Date().getTime();
          if (currentTime >= parseInt(expiryTime, 10)) {
            clearInterval(interval); // 清除定时器
            localStorage.removeItem("token");
            localStorage.removeItem("tokenExpiry");
            console.log("logout");
            location.replace(`/login`);
          }
        }, 60000); // 每分一次

        return () => clearInterval(interval);
      } else {
        // 如果令牌已过期或不存在，执行退出登录逻辑并返回清除定时器的函数
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiry");
        localStorage.removeItem("email");
        console.log("logout");
        if (router.pathname == "/member") {
          console.log("", router.pathname);
          
          location.replace(`/login`);
        }
        return () => {};
      }
    };

    checkTokenExpiration();
    
  }, []);


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
          <Link className="navbar-brand" href="/">
            <img className="logo" src="/images/logo.jpeg" alt=""></img>
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
                  href="/polis-press/all"
                >
                  全站分類
                </Link>
              </li> */}

              {navMenu &&
                navMenu.map((item) => {
                  {
                    /* {console.log("MenuBar", item); } */
                  }
                  return (
                    <div className="nav-item" key={item.site_menu_items_id.id}>
                      <div
                        onClick={() => handleClick(item.site_menu_items_id)}
                        className="nav-link"
                      >
                        {item.site_menu_items_id.title}
                      </div>
                    </div>
                  );
                })}
              <li className="nav-item">
                <Link className="nav-link" href={{ pathname: `/seashore` }}>
                  海濱
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href={{ pathname: `/ichiban` }}>
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
            </form>
            <div className="keyword-block">
              <div className="pill">HOT</div>
              <Link href="">X星際探險隊</Link>
              <Link href="">成語-民間故事</Link>
              <Link href="">X極限挑戰王</Link>
              <Link href=""></Link>
            </div>
          </div>

          <div className="header-toolbar">
            <div className="navbar-link">
              <button type="button" className="btn">
                <img src="/icons/cart.svg" alt="" />
                購物車
              </button>
              <hr className="nav-hr" />
              {email === null ? (
                <Link
                  href={{ pathname: `/login` }}
                  type="button"
                  className="btn"
                >
                  <img src="/icons/member.svg" alt="" />
                  登入
                </Link>
              ) : (
                <div onClick={logout} type="button" className="btn">
                  <img src="/icons/member.svg" alt="" />
                  登出
                </div>
              )}
              {email === null && (
                <>
                  <div className="dot"></div>
                  <Link
                    href={{ pathname: `/signup` }}
                    type="button"
                    className="btn"
                  >
                    註冊
                  </Link>
                </>
              )}
            </div>

            <div className="label-group">
              <Link href={{ pathname: `/seashore/` }}>
                <button type="button" className="btn">
                  海濱
                </button>
              </Link>
              <hr className="nav-hr" />
              <Link href={{ pathname: `/ichiban` }}>
                <button type="button" className="btn">
                  一丁
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
