import { useContext, useState } from "react";
import { DataContext } from "../../contexts/DataContext";
import { IoIosArrowDown } from "react-icons/io";

const TimeTableFilter = ({ sectionId, cardId }) => {
  const { onChangeGraphDataTimeRange } = useContext(DataContext);
  const [showTable, setShowTable] = useState(false);
  const timeRanges = [
    { key: "lastMonth", value: "last-month", valueInHebrew: "חודש אחרון" },
    { key: "last3Months", value: "last-3-months", valueInHebrew: "3 חודשים" },
    { key: "last6Months", value: "last-6-months", valueInHebrew: "6 חודשים" },
    { key: "lastYear", value: "last-year", valueInHebrew: "שנה" },
    { key: "all", value: "all", valueInHebrew: "עד עכשיו" },
  ];
  const [displayedTimeRange, setDisplayedTimeRange] = useState(timeRanges[0]);
  const [selectedTimeRange, setSelectedTimeRange] = useState(timeRanges[0]);

  function handleSubmit(event) {
    event.preventDefault();
    setDisplayedTimeRange(selectedTimeRange);
    onChangeGraphDataTimeRange(sectionId, cardId, selectedTimeRange.value);
    setShowTable(false);
  }

  return (
    <div className="filter-table">
      <div
        className="table__current font-sm"
        onClick={() => setShowTable(!showTable)}
      >
        <span>{displayedTimeRange.valueInHebrew}</span>
        <IoIosArrowDown className="font-sm" />
      </div>

      {showTable && (
        <form onSubmit={handleSubmit} className="filter-table__form">
          <div className="form-title bold font-sm">זמן</div>

          <div className="form-inputs">
            {timeRanges.map((range) => (
              <div className="form-input font-sm" key={range.key}>
                <input
                  type="radio"
                  checked={selectedTimeRange.value === range.value}
                  onChange={() => {
                    setSelectedTimeRange(range);
                  }}
                />
                <label>{range.valueInHebrew}</label>
              </div>
            ))}
          </div>

          <div className="form-buttons">
            <button type="submit">אישור</button>
            <button type="button" onClick={() => setShowTable(false)}>
              ביטול
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default TimeTableFilter;
