import { useEffect, useState } from "react";
import "./styles.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const controlNavbar = () => {
    if (window.scrollY > 200 && !mobileMenu) {
      if (window.scrollY > lastScrollY) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const openSearch = () => {
    setShowSearch(true);
    setMobileMenu(false);
  };

  const openMenu = () => {
    setShowSearch(false);
    setMobileMenu(true);
  };

  const searchQueryHandle = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  const handleNavigate = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else {
      navigate("/explore/tv-show");
    }
    setMobileMenu(false);
  };

  return (
    <div>
      <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
        <ContentWrapper>
          <div className="logo">
            <img src={logo} alt="logo" onClick={() => navigate("/")} />
          </div>
          <ul className="menuItems">
            <li className="menuItem" onClick={() => handleNavigate("movie")}>
              Movie
            </li>
            <li className="menuItem" onClick={() => handleNavigate("tv-show")}>
              TV Show
            </li>
            <li className="menuItem">
              <HiOutlineSearch onClick={openSearch} />
            </li>
          </ul>
          <div className="mobileMenuItems">
            <HiOutlineSearch onClick={openSearch} />
            {mobileMenu ? (
              <VscChromeClose onClick={() => setMobileMenu(false)} />
            ) : (
              <SlMenu onClick={openMenu} />
            )}
          </div>
        </ContentWrapper>
        {showSearch && (
          <div className="searchBar">
            <ContentWrapper>
              <div className="searchInput">
                <input
                  type="text"
                  placeholder="Search for movies or tv shows..."
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyUp={searchQueryHandle}
                />
                <VscChromeClose onClick={() => setShowSearch(false)} />
              </div>
            </ContentWrapper>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
