import { BrowserRouter } from "react-router-dom";
import Header from "./Header";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import Section from "./Section";
import { DataContext } from "../../contexts/DataContext";

function AppRouter() {
  const { theme } = useContext(ThemeContext);
  const { dataSections } = useContext(DataContext);

  return (
    <BrowserRouter>
      <div
        className={`all-page-container ${
          theme === "dark" ? "dark-mode-background" : ""
        }`}
      >
        <Header></Header>

        {dataSections.map((sectionData, index) => (
          console.log(sectionData),
          <Section key={index} sectionData={sectionData}></Section>
        ))}
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;
