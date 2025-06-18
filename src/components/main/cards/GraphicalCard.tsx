import ReactECharts from "echarts-for-react";
import { moreInfoBtn } from "../../../assets/svgs";
import { FiMoreVertical } from "react-icons/fi";
import { GraphicalCardModel } from "../../../models/card.model";
import { useContext, useState } from "react";
import { DataContext } from "../../../contexts/DataContext";

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
  const [showCardDescription, setShowCardDescription] = useState(false);

  // options.xAxis.axisLabel.formatter = (value, index) =>
  // index === 4 ? "" : value;

  // function applyFormatter(value: any, index: number, graphTitle: string) {
  //   if (graphTitle === "כמות משתמשים") return index === 4 ? "" : value;
  // }

  // const options = {
  //   tooltip: {
  //     trigger: "axis",
  //     axisPointer: {
  //       type: "line",
  //       axis: "x"
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
  //     top: 40,
  //     left: "right",
  //     align: "right",
  //     itemHeight: 10,
  //     itemWidth: 10,
  //     itemGap: 20,
  //     data: [
  //       { name: "16-19", icon: "circle" },
  //       { name: "12-15", icon: "circle" },
  //       { name: "5-11", icon: "circle" },
  //       { name: "0-4", icon: "circle" },
  //     ],
  //   },
  //   grid: {
  //     left: 40,
  //     right: 20,
  //     top: 80,
  //     bottom: 50,
  //   },
  //   xAxis: {
  //     type: "category",
  //     data: ["02.03", "01.05", "01.12", "02.07", "31.01", "01.06"],
  //     axisLine: {
  //       lineStyle: { color: "#ccc" },
  //     },
  //     axisLabel: {
  //       fontSize: 11,
  //       fontFamily: "Arial",
  //       color: "#555",
  //     },
  //   },
  //   yAxis: {
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
  //       name: "7-19",
  //       type: "line",
  //       data: [100, 500, 1000, 800, 200, 100],
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
  //       name: "12-15",
  //       type: "line",
  //       data: [200, 600, 2000, 900, 150, 180],
  //       smooth: true,
  //       symbol: "circle",
  //       symbolSize: 6,
  //       itemStyle: {
  //         color: "#7AB9F5",
  //       },
  //       lineStyle: {
  //         color: "#7AB9F5",
  //         width: 2,
  //       },
  //     },
  //     {
  //       name: "5-11",
  //       type: "line",
  //       data: [300, 700, 3000, 1000, 220, 170],
  //       smooth: true,
  //       symbol: "circle",
  //       symbolSize: 6,
  //       itemStyle: {
  //         color: "#A6D92E",
  //       },
  //       lineStyle: {
  //         color: "#A6D92E",
  //         width: 2,
  //       },
  //     },
  //     {
  //       name: "0-4",
  //       type: "line",
  //       data: [400, 650, 10, 950, 210, 190],
  //       smooth: true,
  //       symbol: "circle",
  //       symbolSize: 6,
  //       itemStyle: {
  //         color: "#69D4E8",
  //       },
  //       lineStyle: {
  //         color: "#69D4E8",
  //         width: 2,
  //       },
  //     },
  //   ],
  // };

  return (
    <div className={`graph-container card ${hasContainerParent && "container-card-child-height" }`}>
      <div className="graph-container__header">
        <div className="header__title bold">{graphicalCard.title}</div>

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

        <div
          className="card__more-info_btn"
          onMouseEnter={() => {
            setShowCardDescription(true);
          }}
          onMouseLeave={() => {
            setShowCardDescription(false);
          }}
        >
          <img src={moreInfoBtn} alt="more info" />
        </div>

        {showCardDescription && (
          <div className="card__more-info_content-container">
            <div className="card__more-info_content font-xs">
              {graphicalCard.description}
            </div>
          </div>
        )}

        <div className="card__actions-button">
          <FiMoreVertical />
        </div>
      </div>

      <ReactECharts option={options} />
    </div>
  );
};

export default GraphicalCard;
