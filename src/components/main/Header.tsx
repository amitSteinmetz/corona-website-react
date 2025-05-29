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
        <button className="header__hamburger-btn">
          <img src={hamburgerBtn} alt="תפריט" />
        </button>

        <img className="header__logo" src={logo} alt="לוגו משרד הבריאות" />

        <div className="header__title">עולם הדאטה</div>

        <div className="header__icons">
          <button>
            <img
              className="change-language-icon"
              src={changeLanguageBtn}
              alt="כפתור שינוי שפה"
            />
          </button>

          <button onClick={toggleTheme}>
            <img src={changeThemeColorBtn} alt="כפתור שינוי רקע" />
          </button>
        </div>
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
