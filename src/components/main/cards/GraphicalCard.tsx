import ReactECharts from "echarts-for-react";
import { moreInfoBtn } from "../../../assets/svgs";
import { FiMoreVertical } from "react-icons/fi";
import { GraphicalCardModel } from "../../../models/card.model";
import { useState } from "react";
import { CiShare2 } from "react-icons/ci";
import { IoIosArrowRoundDown } from "react-icons/io";
import TimeTableFilter from "../TimeTableFilter";

const GraphicalCard = ({ sectionId, card, hasContainerParent }) => {
  const graphicalCard: GraphicalCardModel = card as GraphicalCardModel;
  const options = JSON.parse(graphicalCard.options);
  const [showCardActions, setShowCardActions] = useState(false);

  console.log(options);

  // const options = {
  //   tooltip: {
  //     trigger: "axis",
  //     axisPointer: {
  //       type: "line",
  //       axis: "x",
  //     },
  //     backgroundColor: "#fff",
  //     borderColor: "#ddd",
  //     borderWidth: 1,
  //     textStyle: {
  //       fontFamily: "Arial",
  //       fontSize: 12,
  //       color: "#333",
  //     },
  //     extraCssText: "direction: rtl; text-align: right; padding: 10px;",
  //   },
  //   legend: {
  //     right: 0,
  //     align: "right",
  //     itemGap: 20,
  //     itemWidth: 15,
  //     icon: "circle",
  //     data: [
  //       {
  //         name: "16-19",
  //       },
  //       {
  //         name: "12-15",
  //       },
  //       {
  //         name: "5-11",
  //       },
  //       {
  //         name: "0-4",
  //       },
  //     ],
  //   },
  //   grid: {
  //     height: 160,
  //     left: 60,
  //     right: 50,
  //     top: 45,
  //     bottom: 60,
  //   },
  //   xAxis: {
  //     name: "תאריך",
  //     nameLocation: "middle",
  //     nameTextStyle: {
  //       color: "black",
  //       fontSize: 14,
  //       fontFamily: "Open Sans",
  //       padding: [15, 0, 0, 0],
  //     },
  //     offset: 10,
  //     type: "category",
  //     data: [
  //       "10-05-2025",
  //       "11-05-2025",
  //       "12-05-2025",
  //       "13-05-2025",
  //       "14-05-2025",
  //       "15-05-2025",
  //       "16-05-2025",
  //       "17-05-2025",
  //       "18-05-2025",
  //       "19-05-2025",
  //       "20-05-2025",
  //       "21-05-2025",
  //       "22-05-2025",
  //       "23-05-2025",
  //       "24-05-2025",
  //       "25-05-2025",
  //       "26-05-2025",
  //       "27-05-2025",
  //       "28-05-2025",
  //       "29-05-2025",
  //       "30-05-2025",
  //       "31-05-2025",
  //       "01-06-2025",
  //       "02-06-2025",
  //       "03-06-2025",
  //       "04-06-2025",
  //       "05-06-2025",
  //       "06-06-2025",
  //       "07-06-2025",
  //       "08-06-2025",
  //     ],
  //     axisLine: {
  //       lineStyle: {
  //         color: "#ccc",
  //       },
  //     },
  //     axisLabel: {
  //       fontSize: 11,
  //       fontFamily: "Arial",
  //       color: "#555",
  //     },
  //   },
  //   yAxis: {
  //     name: "מספר מאומתים",
  //     nameLocation: "middle",
  //     nameTextStyle: {
  //       color: "black",
  //       fontSize: 14,
  //       fontFamily: "Open Sans",
  //       padding: [0, 0, 30, 0],
  //     },

  //     type: "value",
  //     axisLine: {
  //       show: false,
  //     },
  //     axisTick: {
  //       show: false,
  //     },
  //     splitLine: {
  //       lineStyle: {
  //         color: "#eee",
  //       },
  //     },
  //     axisLabel: {
  //       fontSize: 11,
  //       fontFamily: "Arial",
  //       color: "#555",
  //     },
  //   },
  //   series: [
  //     {
  //       name: "0-4",
  //       type: "line",
  //       data: [
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //       ],
  //       smooth: true,
  //       symbol: "circle",
  //       symbolSize: 6,
  //       itemStyle: {
  //         color: "#A88FEF",
  //       },
  //       lineStyle: {
  //         color: "#A88FEF",
  //         width: 2,
  //       },
  //     },
  //     {
  //       name: "5-11",
  //       type: "line",
  //       smooth: true,
  //       symbol: "circle",
  //       symbolSize: 6,
  //       data: [
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //       ],
  //     },
  //     {
  //       name: "12-15",
  //       type: "line",
  //       smooth: true,
  //       symbol: "circle",
  //       symbolSize: 6,
  //       data: [
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //       ],
  //     },
  //     {
  //       name: "16-19",
  //       type: "line",
  //       smooth: true,
  //       symbol: "circle",
  //       symbolSize: 6,
  //       data: [
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //         "0",
  //       ],
  //     },
  //   ],
  // };

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

      {graphicalCard.hasTimeRangeFilter && (
        <TimeTableFilter sectionId={sectionId} cardId={card.id} />
      )}

      <ReactECharts option={options} />
    </div>
  );
};

export default GraphicalCard;
