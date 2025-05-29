import CardRenderer from "./cards/CardRenderer";
import { SectionModel } from "../../models/section.model";
import { GoTriangleDown } from "react-icons/go";

const Section = ({ sectionData }: { sectionData: SectionModel }) => {

  return (
    <div className="section-container">
      <div className="section-container__header">
        <h1 className="header__title font-xl">{sectionData.title}</h1>
        {sectionData.relatedLinks && (
          <span className="header__seperator">|</span>
        )}
        {sectionData.relatedLinks && (
          <div className="header__subtitle">
            לינקים בנושא
            <GoTriangleDown />
          </div>
        )}
      </div>

      <div className="section-cards">
        {sectionData.cards.map((card, index: number) => (
          <CardRenderer card={card} key={index}></CardRenderer>
        ))}
      </div>
    </div>
  );
};

export default Section;
