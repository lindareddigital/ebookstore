import { useEffect, useRef,useState } from 'react';
import Link from 'next/link';
import { useRouter } from "next/router";

export default function Navbar({}) {
  const [navMenu, setNavMenu] = useState(null);
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [searchKeywords, setSearchKeywords] = useState("");
  const [keyword, setKeyword] = useState(null);
  const inputRef = useRef(null);


  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClick = (item) => {
    if (typeof sendDataToParent === "function") {
      sendDataToParent(item.title);
    }

    if (item.slug = "/") {
      item.slug = "";
    }
    const slug = item.slug ? item.slug : "";

    router.push(`/books/${slug}`, undefined, {
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

   const handleKeyDown = (e) => {
      if (e.key === "Enter") {
      e.preventDefault();

      console.log("Enter 键被按下");
      const inputValue = inputRef.current.value;
      search(inputValue);
      }
     
   };

  const search = async (input) => {
    router.push(
      {
        pathname: "/search",
        query: input,
      },
      undefined,
      { shallow: false }
    );
    
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/sitemenu/navimenu`);
      const result = await response.json();
      // console.log("keyword", result.keyword.search_keyword);
      setKeyword(result.keyword.search_keyword);
      setNavMenu(result.result.site_menu[0].menu_items);
    };
    fetchData();


    setEmail(localStorage.getItem("email"));
    // console.log("email", email, localStorage.getItem("email"));


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
            clearInterval(interval);
            localStorage.removeItem("token");
            localStorage.removeItem("tokenExpiry");
            // console.log("logout");
            location.replace(`/login`);
          }
        }, 60000); // 每分一次

        return () => clearInterval(interval);
      } else {
  
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiry");
        localStorage.removeItem("email");
        // console.log("logout");
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
            {/* <button className="search-btn btn" type="submit">
              <img src="/icons/cart.svg" alt="" />
            </button> */}
            <hr className="nav-hr" />
            <Link
              href={{ pathname: `/member` }}
              className="search-btn btn"
              type="submit"
            >
              <img src="/icons/member.svg" alt="" />
            </Link>
          </div>

          <form className="input-group">
            <input
              ref={inputRef}
              onKeyDown={(e) => {
                setSearchKeywords(e.target.value);
                handleKeyDown(e);
              }}
              onChange={(e) => setSearchKeywords(e.target.value)}
              className="form-control header-search-input"
              type="text"
            ></input>
            <button
              onClick={() => {
                search(searchKeywords);
              }}
              className="search-btn"
              type="button"
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
                ref={inputRef}
                onKeyDown={(e) => {
                  setSearchKeywords(e.target.value);
                  handleKeyDown(e);
                }}
                onChange={(e) => setSearchKeywords(e.target.value)}
                className="form-control header-search-input"
                type="text"
              ></input>
              <button
                onClick={() => {
                  search(searchKeywords);
                }}
                className="search-btn"
                type="button"
              >
                <img src="/icons/search.svg"></img>
              </button>
            </form>
            <div className="keyword-block">
              <div className="pill">HOT</div>
              {keyword &&
                keyword.map((item,index) => {
                  return (
                    <div
                      onClick={() => search(item.keyword)}
                      className=""
                      key={index}
                    >
                      {item.keyword}
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="header-toolbar">
            <div className="navbar-link">
              {/* <button type="button" className="btn">
                <img src="/icons/cart.svg" alt="" />
                購物車
              </button> */}
              <hr className="nav-hr" />
              {email === null && email != "" ? (
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
