import CardRenderer from "./cards/CardRenderer";
import { SectionModel } from "../../models/section.model";
import { GoTriangleDown } from "react-icons/go";

const Section = ({ sectionData }: { sectionData: SectionModel }) => {

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

      <div className="section-cards">
        {sectionData.cards.map((card, index: number) => (
          <CardRenderer sectionId={sectionData.id} card={card} key={index}></CardRenderer>
        ))}
      </div>
    </div>
  );
};

export default Section;
