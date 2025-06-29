import ReactECharts from "echarts-for-react";
import { moreInfoBtn } from "../../../assets/svgs";
import { FiMoreVertical } from "react-icons/fi";
import { GraphicalCardModel } from "../../../models/card.model";
import { useState } from "react";
import { CiShare2 } from "react-icons/ci";
import { IoIosArrowRoundDown } from "react-icons/io";
import TimeTableFilter from "../TimeTableFilter";
import MoreActionsButton from "../MoreActionsButton";

const GraphicalCard = ({ sectionId, card, hasContainerParent }) => {
  const graphicalCard: GraphicalCardModel = card as GraphicalCardModel;
  const options = JSON.parse(graphicalCard.options);

  return (
    <div
      className={`responsive-container card ${
        hasContainerParent ? "container-card-child-height" : ""
      }`}
    >
      <div className="card__header">
        <div className="card__title font-base bold line-height-2xl">
          {graphicalCard.title}
        </div>

        <button className="card__more-info_btn">
          <img src={moreInfoBtn} alt="more info" />
        </button>

        <div className="card__more-info_content-container">
          <div className="card__more-info_content font-xs">
            {graphicalCard.description}
          </div>
        </div>

        <MoreActionsButton></MoreActionsButton>
      </div>

      {graphicalCard.hasTimeRangeFilter && (
        <TimeTableFilter sectionId={sectionId} cardId={card.id} />
      )}

      <ReactECharts option={options} className="graph-content" />
    </div>
  );
};

export default GraphicalCard;
