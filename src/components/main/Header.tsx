import { useState, useEffect, useContext } from "react";
import logo from "../../assets/images/logo.png";
import {
  changeLanguageBtn,
  changeThemeColorBtn,
  hamburgerBtn,
} from "../../assets/svgs";
import { HEADER_NAV_LINKS } from "../../constants/main/HeaderConstants";
import { ThemeContext } from "../../contexts/ThemeContext";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [isGradientLineLoadingAnimate, setIsGradientLineLoadingAnimate] =
    useState(false);

  const [isActiveLink, setIsActiveLink] = useState(
    Array.from({ length: HEADER_NAV_LINKS.length }, () => false)
  );

  useEffect(() => {
    setTimeout(() => {
      setIsGradientLineLoadingAnimate(true);
    }, 1000);
  }, []);

  function onNavLinkClicked(linkIndex: number) {
    setIsActiveLink((prevState) => {
      const newState = [...prevState];

      newState.forEach((_, index) => {
        newState[index] = index !== linkIndex ? false : true;
      });

      return newState;
    });
  }

  return (
    <div className="header-container">
      <div
        className={`header__gradient-line ${
          isGradientLineLoadingAnimate ? "active" : ""
        }`}
      ></div>

      <div className="header__main-content">
        <div className="header__icons">
          <button onClick={toggleTheme}>
            <img src={changeThemeColorBtn} alt="כפתור שינוי רקע" />
          </button>

          <button>
            <img
              className="change-language-icon"
              src={changeLanguageBtn}
              alt="כפתור שינוי שפה"
            />
          </button>
        </div>

        <div className="header__title">עולם הדאטה</div>

        <img className="header__logo" src={logo} alt="לוגו משרד הבריאות" />

        <button className="header__hamburger-btn">
          <img src={hamburgerBtn} alt="תפריט" />
        </button>
      </div>

      <div className="header__nav-wrapper">
        <nav className="nav-links">
          {HEADER_NAV_LINKS.map((link, index) => {
            return (
              <div
                className={`header__nav-link ${
                  isActiveLink[index] ? "active" : ""
                }`}
                key={index}
                onClick={() => {
                  onNavLinkClicked(index);
                }}
              >
                {link}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Header;
