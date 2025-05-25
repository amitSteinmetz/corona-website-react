import TextualCard from "./TextualCard";
import GraphicalCard from "./GraphicalCard";
import { useEffect } from "react";


const CardRenderer = ({ card }) => {
  function isCardHasChildren() {
    return card.children && card.children.length > 0;
  }

  function renderCard() {
    switch (card.type) {
      case "textual":
        return <TextualCard card={card} />;
      case "graphical":
        return <GraphicalCard card={card} />;
    }
  }

  return (
    <>
      {isCardHasChildren() ? (
        <div className="parent-card">
          <div className="parent-card__title">{card.title}</div>

          <div className="parent-card__childern-container">
            {card.children.map((child, index: number) => (
              <CardRenderer key={index} card={child} />
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
