import ReactECharts from "echarts-for-react";
import { moreInfoBtn } from "../../../assets/svgs";
import { FiMoreVertical } from "react-icons/fi";

const GraphicalCard = ({ card }) => {
  // useEffect(() => {
  //   console.log(option);
  // }, []);

  return (
    <div className="graph-container card">
      <div className="graph-container__header">
        <div className="header__title bold">{card.title}</div>

        <img
          src={moreInfoBtn}
          alt="more info"
          className="header__more-info-btn"
        />

        <div className="header_actions-button">
          <FiMoreVertical />
        </div>
      </div>

      <ReactECharts option={card.option} />
    </div>
  );
};

export default GraphicalCard;
