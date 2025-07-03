import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { moreInfoBtn } from "../../assets/svgs";
import {
  HospitalBedOccupancyItem,
  IncomingPersonsItem,
  Table,
} from "../../models/table.model";
import MoreActionsButton from "./MoreActionsButton";
import { useEffect, useState } from "react";
import RiskLevelMap from "./RiskLevelMap";

const TableComponent = ({ table }: { table: Table }) => {
  const [selectedRows, setSelectedRows] = useState<
    HospitalBedOccupancyItem[] | IncomingPersonsItem[]
  >(table.rows);
  const [selectedRowsOrdered, setSelectedRowsOrdered] = useState<
    HospitalBedOccupancyItem[] | IncomingPersonsItem[]
  >(table.rows);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [showTableFilterList, setShowTableFilterList] = useState(false);
  const [filterListCheckedBoxes, setFilterListCheckedBoxes] = useState(
    Object.fromEntries(table.rows.map((row) => [getRowKey(row), true]))
  );
  const riskLevelsColors = {
    High: "red",
    Medium: "orange",
    Low: "yellow",
  };

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
    }
  }

  function getFilterPlaceholder() {
    if (table.type === "IncomingPersons") {
      return "מדינות";
    } else if (table.type === "hospitalBedOccupancy") {
      return "בתי חולים/מוסדות";
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
          <td className="risk-level-square-container">
            <div
              className={`risk-level-square ${
                riskLevelsColors[row[columnName]]
              }`}
            ></div>
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
      sortedRows as HospitalBedOccupancyItem[] | IncomingPersonsItem[]
    );
  }

  function onSubmitFilteredRows() {
    const filteredRows = (
      table.rows as (HospitalBedOccupancyItem | IncomingPersonsItem)[]
    ).filter((row) => filterListCheckedBoxes[getRowKey(row)] ?? false);
    setSelectedRows(
      filteredRows as HospitalBedOccupancyItem[] | IncomingPersonsItem[]
    );
    setSelectedRowsOrdered(
      filteredRows as HospitalBedOccupancyItem[] | IncomingPersonsItem[]
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

      {table.type === "IncomingPersons" && (
        <RiskLevelMap riskLevelsColors={riskLevelsColors} />
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
