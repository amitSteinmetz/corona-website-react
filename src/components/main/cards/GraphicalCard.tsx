import ReactECharts from "echarts-for-react";
import { moreInfoBtn } from "../../../assets/svgs";
import { FiMoreVertical } from "react-icons/fi";
import { useEffect } from "react";
import { GraphicalCardModel } from "../../../models/card.model";

const GraphicalCard = ({ card }) => {
  const graphicalCard: GraphicalCardModel = card as GraphicalCardModel;
  const options = JSON.parse(graphicalCard.options);
  options.xAxis.axisLabel.formatter = (value, index) =>
  index === 3 ? "" : value;
 
  useEffect(() => {
    console.log(graphicalCard);
  }, []);

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
