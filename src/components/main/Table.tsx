import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { moreInfoBtn } from "../../assets/svgs";
import {
  HospitalBedOccupancyItem,
  IncomingPersonsItem,
  TrafficLightProgramItem,
  Table,
} from "../../models/table.model";
import MoreActionsButton from "./MoreActionsButton";
import { useState } from "react";
import ColorMap from "./ColorMap";

const TableComponent = ({ table }: { table: Table }) => {
  const [selectedRows, setSelectedRows] = useState<
    | HospitalBedOccupancyItem[]
    | IncomingPersonsItem[]
    | TrafficLightProgramItem[]
  >(table.rows);
  const [selectedRowsOrdered, setSelectedRowsOrdered] = useState<
    | HospitalBedOccupancyItem[]
    | IncomingPersonsItem[]
    | TrafficLightProgramItem[]
  >(table.rows);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [showTableFilterList, setShowTableFilterList] = useState(false);
  const [filterListCheckedBoxes, setFilterListCheckedBoxes] = useState(
    Object.fromEntries(table.rows.map((row) => [getRowKey(row), true]))
  );
  const levelsColors = {
    High: "red",
    Medium: "orange",
    Low: "yellow",
    None: "green",
  };

  function getDailyScoreColor(row, columnName) {
    const dailyScore = row[columnName];
    if (dailyScore > 7.5) {
      return "red";
    } else if (dailyScore > 6 && dailyScore < 7.5) {
      return "orange";
    } else if (dailyScore > 4.5 && dailyScore < 6) {
      return "yellow";
    } else return "green";
  }

  function roundNumberToTwoDigits(num: number) {
    // Check if the number has more than two digits after the decimal point
    const [, amountOFdigitsAfterPoint] = num.toString().split(".");
    if (!amountOFdigitsAfterPoint || amountOFdigitsAfterPoint.length <= 2)
      return num;

    return Math.round(num * 100) / 100;
  }

  function getRowKey(row) {
    if (table.type === "IncomingPersons") {
      return (row as IncomingPersonsItem).srcCountry;
    } else if (table.type === "hospitalBedOccupancy") {
      return (row as HospitalBedOccupancyItem).hospitalName;
    } else if (table.type === "trafficLightProgram") {
      return (row as TrafficLightProgramItem).city;
    }
  }

  function getFilterPlaceholder() {
    if (table.type === "IncomingPersons") {
      return "מדינות";
    } else if (table.type === "hospitalBedOccupancy") {
      return "בתי חולים/מוסדות";
    } else if (table.type === "trafficLightProgram") {
      return "יישובים";
    }
  }

  function handleCheckboxChange(
    changeEvent: React.ChangeEvent<HTMLInputElement>
  ) {
    setFilterListCheckedBoxes((prevCheckedBoxes) => ({
      ...prevCheckedBoxes,
      [changeEvent.target.id]: changeEvent.target.checked,
    }));
  }

  function renderRow(row) {
    return Object.keys(row).map((columnName) => {
      if (!row[columnName]) return <td>אין מידע</td>;
      else if (columnName === "id") return null;
      else if (columnName === "riskLevel") {
        return (
          <td className="level-square-container">
            <div
              className={`risk-level-square ${levelsColors[row[columnName]]}`}
            ></div>
          </td>
        );
      } else if (columnName === "dailyScore") {
        return (
          <td className="risk-level-square-container">
            <div
              className={`level-square-background ${getDailyScoreColor(
                row,
                columnName
              )}`}
            >
              {row[columnName]}
            </div>
          </td>
        );
      } else if (
        typeof row[columnName] === "number" &&
        table.columns.find((col) => col.key === columnName).inPercentages
      ) {
        return (
          <td className="bold">
            <div className="row-percentageNumber-field">
              {table.type === "hospitalBedOccupancy" && (
                <div className="percentage-bar">
                  <div
                    className="inner-bar"
                    style={{
                      width: `${row[columnName]}%`,
                    }}
                  />
                  <div
                    className="outer-bar"
                    style={{ width: `${100 - row[columnName]}%` }}
                  />
                </div>
              )}
              <div>{roundNumberToTwoDigits(row[columnName] as number)}%</div>
            </div>
          </td>
        );
      } else return <td className="bold">{row[columnName]}</td>;
    });
  }

  function sortRows(sortKey: string) {
    // Back to un-ordered state
    if (sortKey === sortColumn && sortDirection === "desc") {
      setSortColumn(null);
      setSortDirection(null);
      setSelectedRowsOrdered(selectedRows);
      return;
    }

    const direction =
      sortKey === sortColumn && sortDirection === "asc" ? "desc" : "asc";

    const sortedRows = [...selectedRows].sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];

      if (typeof valA === "number" && typeof valB === "number") {
        return direction === "asc" ? valA - valB : valB - valA;
      } else {
        return direction === "asc"
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
      }
    });

    setSortColumn(sortKey);
    setSortDirection(direction);
    setSelectedRowsOrdered(
      sortedRows as
        | HospitalBedOccupancyItem[]
        | IncomingPersonsItem[]
        | TrafficLightProgramItem[]
    );
  }

  function onSubmitFilteredRows() {
    const filteredRows = (
      table.rows as (
        | HospitalBedOccupancyItem
        | IncomingPersonsItem
        | TrafficLightProgramItem
      )[]
    ).filter((row) => filterListCheckedBoxes[getRowKey(row)] ?? false);
    setSelectedRows(
      filteredRows as
        | HospitalBedOccupancyItem[]
        | IncomingPersonsItem[]
        | TrafficLightProgramItem[]
    );
    setSelectedRowsOrdered(
      filteredRows as
        | HospitalBedOccupancyItem[]
        | IncomingPersonsItem[]
        | TrafficLightProgramItem[]
    );
  }

  return (
    <div className="responsive-container card table-container">
      <div className="card__header">
        <div className="card__title bold line-height-2xl">{table.title}</div>

        <button className="card__more-info_btn">
          <img src={moreInfoBtn} alt="more info" />
        </button>

        <div className="card__more-info_content-container">
          <div className="card__more-info_content">{table.description}</div>
        </div>

        <MoreActionsButton></MoreActionsButton>
      </div>

      <div className="table-filter-container">
        <div
          className={`table-filter__selectBtn ${
            showTableFilterList ? "clicked-filter-border" : ""
          }`}
          onClick={() => setShowTableFilterList(!showTableFilterList)}
        >
          {`${selectedRows.length} ${getFilterPlaceholder()} נבחרו`}
          {showTableFilterList && (
            <IoIosArrowUp className="table-filter__selectBtn_arrow" />
          )}
          {!showTableFilterList && (
            <IoIosArrowDown className="table-filter__selectBtn_arrow" />
          )}
        </div>

        {showTableFilterList && (
          <div className="table-filter__list">
            <div className="table-filter__list-buttons">
              <button onClick={() => setFilterListCheckedBoxes({})}>
                ניקוי הבחירה
              </button>
              <button
                onClick={() =>
                  setFilterListCheckedBoxes(
                    Object.fromEntries(
                      table.rows.map((row) => [getRowKey(row), true])
                    )
                  )
                }
              >
                בחר הכל
              </button>
            </div>

            <div className="table-filter__list-rows">
              {table.rows.map((row) => (
                <div className="table-filter__list-rows__item">
                  <input
                    type="checkbox"
                    id={getRowKey(row) + ""}
                    checked={filterListCheckedBoxes?.[getRowKey(row)] ?? false}
                    onChange={handleCheckboxChange}
                  />
                  <div>{getRowKey(row)}</div>
                </div>
              ))}
            </div>

            <div className="table-filter__list-buttons">
              <button onClick={onSubmitFilteredRows}>אישור</button>
              <button onClick={() => setShowTableFilterList(false)}>
                ביטול
              </button>
            </div>
          </div>
        )}
      </div>

      {(table.type === "IncomingPersons" ||
        table.type === "trafficLightProgram") && (
        <ColorMap colorsMap={levelsColors} tableType={table.type} />
      )}

      <div className="table-rows">
        <table>
          <thead>
            <tr>
              {table.columns.map((column) => (
                <th
                  className={`${
                    column.key === sortColumn
                      ? "table-column-focused"
                      : "medium"
                  }`}
                  onClick={() => sortRows(column.key)}
                >
                  {column.value}
                  {sortDirection === "desc" && sortColumn === column.key && (
                    <IoIosArrowDown className="arrow-btn" />
                  )}
                  {sortDirection === "asc" && sortColumn === column.key && (
                    <IoIosArrowUp className="arrow-btn" />
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {selectedRowsOrdered.map((row) => (
              <tr>{renderRow(row)}</tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
