import Card from "./cards/Card";

const Section = ({ sectionData }) => {
  return (
    <div className="section-container">
      <h1 className="section-container__title font-xl">
        {sectionData.sectionTitle}
      </h1>

      <div className="section-cards">
        {sectionData.sectionCards.map((card, index: number) => (
          <Card card={card} key={index}></Card>
        ))}
      </div>
    </div>
  );
};

export default Section;
