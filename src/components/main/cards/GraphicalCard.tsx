import ReactECharts from "echarts-for-react";
import { moreInfoBtn } from "../../../assets/svgs";
import { FiMoreVertical } from "react-icons/fi";
import { GraphicalCardModel } from "../../../models/card.model";

const GraphicalCard = ({ card }) => {
  const graphicalCard: GraphicalCardModel = card as GraphicalCardModel;
  // const options = JSON.parse(graphicalCard.options);
  // options.xAxis.axisLabel.formatter = (value, index) =>
  // index === 4 ? "" : value;

  const options = {
    legend: {
      data: [
        {
          name: "16-19",
          icon: "circle",
        },
        {
          name: "12-15",
          icon: "circle",
        },
        {
          name: "5-11",
          icon: "circle",
        },
        {
          name: "0-4",
          icon: "circle",
        },
      ],
    },
    grid: {
      left: 70,
      right: 20,
      top: 60,
      bottom: 40,
    },
    xAxis: {
      type: "category",
      data: ["05.05", "08.05", "08.05", "11.05", "14.05", "17.05", "20.05"],
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: "#e0e0e0", // same color as grid lines
        },
      },
      axisLabel: {
        margin: 30,
        align: "left",
        rotate: 20,
        fontSize: 10,
        color: "black",
      },
    },
    yAxis: {
      type: "value",
      name: "ממוצע מאומתים",
      min: 0,
      max: 0.5,
      interval: 0.1,
      nameLocation: "middle", // vertical middle
      nameRotate: 90, // rotate vertically
      offset: 10,
      nameTextStyle: {
        fontSize: 14,
        fontWeight: 500,
        fontFamily: "Open Sans",
        align: "center",
        padding: [0, 0, 30, 0], // shift it away from the axis if needed
      },
    },
    series: [
      {
        type: "line",
        step: "end",
        name: "16-19",
        data: [0.1, 0.2, 0.34, 0.36, 0.49, 0.47, 0.4],
        lineStyle: {
          color: "rgb(216, 0, 245)",
          width: 2,
        },
        symbol: "circle",
        symbolSize: 1,
        itemStyle: {
          color: "rgb(216, 0, 245)",
        },
        emphasis: {
          focus: "series",
          scale: 8,
        },
        label: {
          show: true,
          position: "top",
          fontSize: 14,
          fontFamily: "Open Sans",
          color: "#333",
          padding: [0, 0, 0, 50],
        },
      },

      {
        type: "line",
        step: "end",
        name: "12-15",
        data: [0.4, 0.3, 0.34, 0.26, 0.19, 0.37, 0.2],
        lineStyle: {
          color: "rgb(0, 188, 245)",
          width: 2,
        },
        symbol: "circle",
        symbolSize: 1,
        itemStyle: {
          color: "rgb(0, 188, 245)",
        },
        emphasis: {
          focus: "series",
          scale: 8,
        },
        label: {
          show: true,
          position: "top",
          fontSize: 14,
          fontFamily: "Open Sans",
          color: "#333",
          padding: [0, 0, 0, 50],
        },
      },
      {
        type: "line",
        step: "end",
        name: "5-11",
        data: [0.3, 0.23, 0.14, 0.46, 0.19, 0.27, 0.32],
        lineStyle: {
          color: "rgb(0, 245, 12)",
          width: 2,
        },
        symbol: "circle",
        symbolSize: 1,
        itemStyle: {
          color: "rgb(0, 245, 12)",
        },
        emphasis: {
          focus: "series",
          scale: 8,
        },
        label: {
          show: true,
          position: "top",
          fontSize: 14,
          fontFamily: "Open Sans",
          color: "#333",
          padding: [0, 0, 0, 50],
        },
      },
      {
        type: "line",
        step: "end",
        name: "0-4",
        data: [0.14, 0.28, 0.44, 0.16, 0.29, 0.27, 0.19],
        lineStyle: {
          color: "rgb(253, 249, 5)",
          width: 2,
        },
        symbol: "circle",
        symbolSize: 1,
        itemStyle: {
          color: "rgb(253, 249, 5)",
        },
        emphasis: {
          focus: "series",
          scale: 8,
        },
        label: {
          show: true,
          position: "top",
          fontSize: 14,
          fontFamily: "Open Sans",
          color: "#333",
          padding: [0, 0, 0, 50],
        },
      },
    ],
  };

  return (
    <div className="graph-container card">
      <div className="graph-container__header">
        <div className="header__title bold">{graphicalCard.title}</div>

        <img
          src={moreInfoBtn}
          alt="more info"
          className="header__more-info-btn"
        />

        <div className="header_actions-button">
          <FiMoreVertical />
        </div>
      </div>

      <ReactECharts option={options} />
    </div>
  );
};

export default GraphicalCard;
