import { useEffect } from "react";
import CardRenderer from "./cards/CardRenderer";
import { SectionModel } from "../../models/section.model";

const Section = ({ sectionData }: { sectionData: SectionModel }) => {
  return (
    <div className="section-container">
      <h1 className="section-container__title font-xl">{sectionData.title}</h1>

      <div className="section-cards">
        {sectionData.cards.map((card, index: number) => (
          <CardRenderer card={card} key={index}></CardRenderer>
        ))}
      </div>
    </div>
  );
};

export default Section;
