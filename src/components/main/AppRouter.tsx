import { BrowserRouter } from "react-router-dom";
import Header from "./Header";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import Section from "./Section";
import { DataContext } from "../../contexts/DataContext";
import { sideNavArrowBtn } from "../../assets/svgs";

function AppRouter() {
  const { theme } = useContext(ThemeContext);
  const { dataSections } = useContext(DataContext);

  return (
    <BrowserRouter>
      <div
        className={`all-page__container ${
          theme === "dark" ? "dark-mode-background" : ""
        }`}
      >
        <Header></Header>

        <div className="inner-page__container">
          <div className="side-nav">
            <img
              src={sideNavArrowBtn}
              alt="hamburger"
              className="side-nav__btn"
            />
          </div>

          <div className="page-body">
            <div className="page-location">עולם הדאטא &gt; קורונה </div>

            <div className="page-headline">
              <h1 className="page-headline__title font-2xl bold">קורונה</h1>
              <div className="last-update">
                <span className="bold">עדכון אחרון:</span> 11/05/25, 04:10
              </div>
            </div>

            {dataSections.map(
              (sectionData, index) => (
                (<Section key={index} sectionData={sectionData}></Section>)
              )
            )}
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;
