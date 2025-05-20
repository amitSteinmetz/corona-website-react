import { moreInfoBtn } from "../../../assets/svgs";
import GraphicalCard from "./GraphicalCard";

const TextualCard = ({ card }) => (
  <div className="card">
    <div className="card-header">
      <div className="card__title font-base bold line-height-2xl">
        {card.title}
      </div>

      <img src={moreInfoBtn} alt="more info" className="card__more-info-btn" />
    </div>

    <div className="card__body">
      {card.body.mainData.map((data, index: number) => (
        <div className="main-data-line" key={index}>
          {data.text && (
            <span className="main-data__text font-xs">{data.text}</span>
          )}

          <span
            className={`main-data__amount bold line-height-xl ${
              !data.text ? "main-data-bigger-font" : "main-data-smaller-font"
            }`}
          >
            {data.amount}
          </span>
        </div>
      ))}

      {card.body.additionalData?.map((line, index: number) => (
        <div className="additional-data-line" key={index}>
          <span className="additional-data__amount font-xs bold line-height-xl">
            {line.amount}
          </span>
          <span className="additional-data__text font-xs">{line.text}</span>
        </div>
      ))}

      {card.body.cards && (
        <div className="nested-cards">
          {card.body.cards.map((nestedCard, index) =>
            card.type === "textual" ? (
              <TextualCard key={index} card={nestedCard} />
            ) : (
              <GraphicalCard key={index} />
            )
          )}
        </div>
      )}
    </div>
  </div>
);

export default TextualCard;
