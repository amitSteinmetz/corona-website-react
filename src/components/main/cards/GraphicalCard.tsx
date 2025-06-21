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
  // const options = JSON.parse(graphicalCard.options);
  const { onChangeGraphDataTimeRange } = useContext(DataContext);
  const timeRanges = {
    lastMonth: "last-month",
    last3Months: "last-3-months",
    last6Months: "last-6-months",
    lastYear: "last-year",
    all: "all",
  };
  const [showCardActions, setShowCardActions] = useState(false);
  // console.log(options);

  const options = {
  grid: {
      left: 70,
      right: 20,
      top: 30,
      bottom: 45,
    },
    xAxis: {
      type: "category",
      data: ["04.05-10.05", "11.05-17.05", "18.05-24.05", ""],
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: "#e0e0e0",
        },
      },
      axisLabel: {
        margin: 30,
        align: "left",
        rotate: 20,
        fontSize: 10,
        color: "#484d49",
      },
    },
    yAxis: {
      type: "value",
      name: "ממוצע מאומתים",
      nameLocation: "middle",
      offset: 10,
      nameTextStyle: {
        fontSize: 14,
        fontWeight: 500,
        fontFamily: "Open Sans",
        padding: [0, 0, 30, 0],
      },
    },
    series: [
      {
        type: "line",
        step: "end",
        data: [8, 11, 6, ""],
        lineStyle: {
          color: "rgb(0, 208, 245)",
          width: 2,
        },
        symbol: "circle",
        symbolSize: 0.7,
        itemStyle: {
          color: "rgb(0, 208, 245)"
        },
        emphasis: {
          focus: "series",
          scale: 10,
          itemStyle: {
          color: "white",
          borderColor: "rgb(0, 208, 245)",
          borderWidth: 2
        },
        },
        label: {
          show: true,
          fontSize: 14,
          fontFamily: "Open Sans",
          color: "#333",
          padding: [0, 0, 0, 50],
        },
        markArea: {
          itemStyle: {
            color: "rgba(0, 237, 245, 0.03)",
          },
          data: [
            [
              {
                xAxis: "04.05-10.05",
              },
              {
                xAxis: "11.05-17.05",
              },
            ],
          ],
        },
      },
    ]
};

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
          <ul className="time-filter-table">
            <li
              className="time-filter-table__item"
              onClick={() => {
                onChangeGraphDataTimeRange(
                  sectionId,
                  card.id,
                  timeRanges.lastMonth
                );
              }}
            >
              חודש אחרון
            </li>
            <li
              className="time-filter-table__item"
              onClick={() => {
                onChangeGraphDataTimeRange(
                  sectionId,
                  card.id,
                  timeRanges.last3Months
                );
              }}
            >
              3 חודשים
            </li>
            <li
              className="time-filter-table__item"
              onClick={() => {
                onChangeGraphDataTimeRange(
                  sectionId,
                  card.id,
                  timeRanges.last6Months
                );
              }}
            >
              6 חודשים
            </li>
            <li
              className="time-filter-table__item"
              onClick={() => {
                onChangeGraphDataTimeRange(
                  sectionId,
                  card.id,
                  timeRanges.lastYear
                );
              }}
            >
              שנה
            </li>
            <li
              className="time-filter-table__item"
              onClick={() => {
                onChangeGraphDataTimeRange(sectionId, card.id, timeRanges.all);
              }}
            >
              עד עכשיו
            </li>
          </ul>
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
