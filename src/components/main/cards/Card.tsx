import TextualCard from "./TextualCard";
import GraphicalCard from "./GraphicalCard";

const Card = ({ card }) => {
  function isCardHasChildren() {
    return card.children && card.children.length > 0;
  }

  return (
    <>
      {isCardHasChildren() ? (
        <div className="parent-card">
          <div className="parent-card__title">{card.cardTitle}</div>

          <div className="parent-card__childern-container">
            {card.children.map((child, index) => (
              <Card key={index} card={child} />
            ))}
          </div>
        </div>
      ) : card.type === "textual" ? (
        <TextualCard card={card} />
      ) : (
        <GraphicalCard />
      )}
    </>
  );
};

export default Card;
