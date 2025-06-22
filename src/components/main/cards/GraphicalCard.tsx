import ReactECharts from "echarts-for-react";
import { moreInfoBtn } from "../../../assets/svgs";
import { FiMoreVertical } from "react-icons/fi";
import { GraphicalCardModel } from "../../../models/card.model";
import { useContext, useState } from "react";
import { DataContext } from "../../../contexts/DataContext";
import { CiShare2 } from "react-icons/ci";
import { IoIosArrowRoundDown } from "react-icons/io";

const GraphicalCard = ({ sectionId, card, hasContainerParent }) => {
  const graphicalCard: GraphicalCardModel = card as GraphicalCardModel;
  const options = JSON.parse(graphicalCard.options);
  const { onChangeGraphDataTimeRange } = useContext(DataContext);
  const timeRanges = {
    lastMonth: "last-month",
    last3Months: "last-3-months",
    last6Months: "last-6-months",
    lastYear: "last-year",
    all: "all",
  };
  const [showCardActions, setShowCardActions] = useState(false);

  return (
    <div
      className={`graph-container card ${
        hasContainerParent ? "container-card-child-height" : ""
      }`}
    >
      <div className="card__header">
        <div className="card__title font-base bold line-height-2xl">
          {graphicalCard.title}
        </div>

        {graphicalCard.hasTimeRangeFilter && (
          //         <select name="cars" id="cars">
          //   <option value="volvo">Volvo</option>
          //   <option value="saab">Saab</option>
          //   <option value="opel">Opel</option>
          //   <option value="audi">Audi</option>
          // </select>
          <div className="time-filter-table">
            <select
              onChange={(e) => {
                const selectedTimeRange = e.target.value;
                onChangeGraphDataTimeRange(
                  sectionId,
                  card.id,
                  selectedTimeRange
                );
              }}
            >
              <option value={timeRanges.lastMonth}>חודש אחרון</option>
              <option value={timeRanges.last3Months}>3 חודשים</option>
              <option value={timeRanges.last6Months}>6 חודשים</option>
              <option value={timeRanges.lastYear}>שנה אחרונה</option>
              <option value={timeRanges.all}>הכל</option>
            </select>
          </div>
        )}

        <button className="card__more-info_btn">
          <img src={moreInfoBtn} alt="more info" />
        </button>

        <div className="card__more-info_content-container">
          <div className="card__more-info_content font-xs">
            {graphicalCard.description}
          </div>
        </div>

        <button
          className="card__actions-button"
          onClick={() => {
            setShowCardActions(!showCardActions);
          }}
        >
          <FiMoreVertical />
        </button>

        {showCardActions && (
          <ul className="card__actions-list">
            <li className="card__action-item">
              <button>
                <CiShare2 />
              </button>
              <span className="action-item-text">לשיתוף</span>
            </li>

            <li className="card__action-item">
              <button>
                <IoIosArrowRoundDown />
              </button>
              <span className="action-item-text">להורדה</span>
            </li>
          </ul>
        )}
      </div>

      <ReactECharts option={options} />
    </div>
  );
};

export default GraphicalCard;
