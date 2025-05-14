import { useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi";

const Header = () => {
  const [isGradientLineLoadingAnimate, setIsGradientLineLoadingAnimate] =
    useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsGradientLineLoadingAnimate(true);
    }, 1000);
  }, []);

  return (
    <div>
      <div
        className={`header__gradient-line ${
          isGradientLineLoadingAnimate ? "active" : ""
        }`}
      ></div>

      <div className="header__main-content">
        <img
          src="https://datadashboard.health.gov.il/assets/images/logo_new.png"
          alt="לוגו משרד הבריאות"
        />
        <div className="header__title"></div>
        <div className="header__icons"></div>
      </div>

      <nav className="header__nav"></nav>
    </div>
  );
};

export default Header;
