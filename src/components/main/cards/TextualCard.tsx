import { useEffect } from "react";
import { moreInfoBtn } from "../../../assets/svgs";
import { TextualCardModel } from "../../../models/card.model";

const TextualCard = ({ card }) => {
  const textualCard: TextualCardModel = card as TextualCardModel;
  const textualCardAdditionalData = textualCard?.data[0]?.text
    ? textualCard.data
    : textualCard.data.slice(1);

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
        {!textualCard.data[0].text && (
          <span className="main-data__amount bold line-height-xl main-data-bigger-font">
            {textualCard.data[0].amount}
          </span>
        )}

        {textualCardAdditionalData.map((line, index: number) =>
          line.text && (
            <div className="additional-data-line" key={index}>
              <span className="additional-data__amount font-xs bold line-height-xl">
                {line.amount}
              </span>
              <span className="additional-data__text font-xs">{line.text}</span>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default TextualCard;

// take data[0] to be "main-data" if data[0].text is empty
// else, take data[0] to be "additional-data"
