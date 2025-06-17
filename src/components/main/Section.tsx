import CardRenderer from "./cards/CardRenderer";
import { SectionModel } from "../../models/section.model";
import { GoTriangleDown } from "react-icons/go";

const Section = ({ sectionData }: { sectionData: SectionModel }) => {
  function renderCards(arr) {
    return arr.map((card, index: number) => (
      <CardRenderer
        sectionId={sectionData.id}
        card={card}
        key={index}
      ></CardRenderer>
    ));
  }

  return (
    <div className={`section-container ${sectionData.id === 1 && "first-section"}`}>
      <div className="section-container__header">
        <h1 className="header__title font-xl">{sectionData.title}</h1>

        {sectionData.relatedLinks.length > 0 && (
          <div className="header__subtitle">
            <span className="header__seperator">|</span>
            לינקים בנושא
            <GoTriangleDown />
          </div>
        )}
      </div>

      <div className="section-textual-cards">
        {renderCards(
          sectionData.cards.filter((card) => card.type === "textual")
        )}
      </div>

       <div className="section-graphical-cards">
        {renderCards(
          sectionData.cards.filter((card) => card.type === "graphical")
        )}
      </div>

       <div className="section-container-cards">
        {renderCards(
          sectionData.cards.filter((card) => card.type === "container")
        )}
      </div>

     
    </div>
  );
};

export default Section;
