import TextualCard from "./TextualCard";
import GraphicalCard from "./GraphicalCard";

const CardRenderer = ({ sectionId, card }) => {
  function isCardHasChildren() {
    return card.type === "container";
  }

  function renderCard() {
    switch (card.type) {
      case "textual":
        return <TextualCard card={card} />;
      case "graphical":
        return <GraphicalCard sectionId={sectionId} card={card} />;
    }
  }

  return (
    <>
      {isCardHasChildren() ? (
        <div className="container-card">
          <div className="container-card__title bold">{card.title}</div>

          <div className="container-card__children-wrapper">
            {card.children.map((child, index: number) => (
              <CardRenderer sectionId={sectionId} key={index} card={child} />
            ))}
          </div>
        </div>
      ) : (
        renderCard()
      )}
    </>
  );
};

export default CardRenderer;
