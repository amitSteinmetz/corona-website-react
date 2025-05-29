import { useEffect } from "react";
import { moreInfoBtn } from "../../../assets/svgs";
import { TextualCardModel } from "../../../models/card.model";

const TextualCard = ({ card }) => {
  const textualCard: TextualCardModel = card as TextualCardModel;

  return (
    <div className="card">
      <div className="card-header">
        <div className="card__title font-base bold line-height-2xl">
          {textualCard.title}
        </div>

        <img
          src={moreInfoBtn}
          alt="more info"
          className="card__more-info-btn"
        />
      </div>

      <div className="card__body">
        {textualCard.data[0] && (
          <div className="main-data-line">
            <span className="main-data__text font-xs">
              {textualCard.data[0].text}
            </span>

            <span
              className={`main-data__amount bold line-height-xl ${
                !textualCard.data[0].text
                  ? "main-data-bigger-font"
                  : "main-data-smaller-font"
              }`}
            >
              {textualCard.data[0].amount}
            </span>
          </div>
        )}

        {textualCard.data.slice(1).map((line, index: number) => (
          <div className="additional-data-line" key={index}>
            <span className="additional-data__amount font-xs bold line-height-xl">
              {line.amount}
            </span>
            <span className="additional-data__text font-xs">{line.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextualCard;
