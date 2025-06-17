import CardRenderer from "./cards/CardRenderer";
import { SectionModel } from "../../models/section.model";
import { GoTriangleDown } from "react-icons/go";

const Section = ({ sectionData }: { sectionData: SectionModel }) => {
  const sectionSingleCards = sectionData.cards.filter(
    (card) => card.type === "textual"
  );
  const sectionContainerCards = sectionData.cards.filter(
    (card) => card.type === "container"
  );

  return (
    <div className="section-container">
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

      <div className="section-single-cards">
        {sectionSingleCards.map((card, index: number) => (
          <CardRenderer
            sectionId={sectionData.id}
            card={card}
            key={index}
          ></CardRenderer>
        ))}
      </div>

      <div className="section-container-cards">
        {sectionContainerCards.map((card, index: number) => (
          <CardRenderer
            sectionId={sectionData.id}
            card={card}
            key={index}
          ></CardRenderer>
        ))}
      </div>
    </div>
  );
};

export default Section;
