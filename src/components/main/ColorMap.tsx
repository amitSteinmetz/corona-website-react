const colorMap = ({ colorsMap, tableType }) => {
  const itemTitleObj = {
    High: tableType === "IncomingPersons" ? "מדינות בסיכון מירבי" : "אדום",
    Medium: tableType === "IncomingPersons" ? "מדינות בסיכון" : "כתום",
    Low: tableType === "IncomingPersons" ? "מדינות בסיכון נמוך" : "צהוב",
    None: "ירוק",
  };

  const itemSubtitleObj = {
    High: "ציון 7.5 ומעלה",
    Medium: "ציון בין 6 ל - 7.5",
    Low: "ציון בין 4.5 ל - 6",
    None: "ציון עד 4.5",
  };

  return (
    <div className="map-container">
      <div className="map-item">
        <div
          className="risk-level-square"
          style={{ backgroundColor: colorsMap.High }}
        ></div>
        <div className="map-item__title">{itemTitleObj.High}</div>
        {tableType === "trafficLightProgram" && (
          <div className="map-item__subtitle">{itemSubtitleObj.High}</div>
        )}
      </div>
      <div className="map-item">
        <div
          className="risk-level-square"
          style={{ backgroundColor: colorsMap.Medium }}
        ></div>
        <div className="map-item__title">{itemTitleObj.Medium}</div>
        {tableType === "trafficLightProgram" && (
          <div className="map-item__subtitle">{itemSubtitleObj.Medium}</div>
        )}
      </div>
      <div className="map-item">
        <div
          className="risk-level-square"
          style={{ backgroundColor: colorsMap.Low }}
        ></div>
        <div className="map-item__title">{itemTitleObj.Low}</div>
        {tableType === "trafficLightProgram" && (
          <div className="map-item__subtitle">{itemSubtitleObj.Low}</div>
        )}
      </div>
      {tableType === "trafficLightProgram" && (
        <div className="map-item">
          <div
            className="risk-level-square"
            style={{ backgroundColor: colorsMap.None }}
          ></div>
          <div className="map-item__title">{itemTitleObj.None}</div>

          <div className="map-item__subtitle">{itemSubtitleObj.None}</div>
        </div>
      )}
    </div>
  );
};

export default colorMap;
