const RiskLevelMap = ({ riskLevelsColors }) => {
  return (
    <div className="map-container">
      <div className="map-item">
        <div
          className="risk-level-square"
          style={{ backgroundColor: riskLevelsColors.High }}
        ></div>
        <div className="map-item__text">מדינות בסיכון מירבי</div>
      </div>
      <div className="map-item">
        <div
          className="risk-level-square"
          style={{ backgroundColor: riskLevelsColors.Medium }}
        ></div>
        <div className="map-item__text">מדינות בסיכון</div>
      </div>
      <div className="map-item">
        <div
          className="risk-level-square"
          style={{ backgroundColor: riskLevelsColors.Low }}
        ></div>
        <div className="map-item__text">מדינות בסיכון נמוך</div>
      </div>
    </div>
  );
};

export default RiskLevelMap;
