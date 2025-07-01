import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { moreInfoBtn } from "../../assets/svgs";
import { Table } from "../../models/table.model";
import MoreActionsButton from "./MoreActionsButton";
import { useState } from "react";

const TableComponent = ({ table }: { table: Table }) => {
  const [selectedRows, setSelectedRows] = useState(table.rows);
  const [selectedRowsOrdered, setSelectedRowsOrdered] = useState(table.rows);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [showTableFilterList, setShowTableFilterList] = useState(false);
  const [filterListCheckedBoxes, setFilterListCheckedBoxes] = useState(
    Object.fromEntries(table.rows.map((row) => [row.id, true]))
  );
  // const checkedCount = Object.values(filterListCheckedBoxes).filter(
  //   (isChecked) => isChecked
  // ).length;

  function handleCheckboxChange(
    changeEvent: React.ChangeEvent<HTMLInputElement>
  ) {
    setFilterListCheckedBoxes((prevCheckedBoxes) => ({
      ...prevCheckedBoxes,
      [changeEvent.target.id]: changeEvent.target.checked,
    }));
  }

  function renderTableRows() {
    return selectedRowsOrdered.map((row) => (
      <tr>
        {Object.keys(row).map((key) =>
          key !== "id" ? (
            <td className="bold">
              {row[key] ? (
                typeof row[key] === "number" ? (
                  <div className="row-numerical-field">
                    <div className="percentage-bar">
                      <div
                        className="inner-bar"
                        style={{
                          width: `${row[key]}%`,
                        }}
                      />
                      <div
                        className="outer-bar"
                        style={{ width: `${100 - row[key]}%` }}
                      />
                    </div>
                    <div>{row[key]}%</div>
                  </div>
                ) : (
                  row[key]
                )
              ) : (
                "אין מידע"
              )}
            </td>
          ) : null
        )}
      </tr>
    ));
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
    setSelectedRowsOrdered(sortedRows);
  }

  function onSubmitFilteredRows() {
    const filteredRows = table.rows.filter(
      (row) => filterListCheckedBoxes[row.id] ?? false
    );
    setSelectedRows(filteredRows);
    setSelectedRowsOrdered(filteredRows);
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
          {`${selectedRows.length} בתי חולים/מוסדות נבחרו`}
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
                    Object.fromEntries(table.rows.map((row) => [row.id, true]))
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
                    id={row.id + ""}
                    checked={filterListCheckedBoxes?.[row.id] ?? false}
                    onChange={handleCheckboxChange}
                  />
                  <div>{row.hospitalName}</div>
                </div>
              ))}
            </div>

            <div className="table-filter__list-buttons">
              <button onClick={onSubmitFilteredRows}>אישור</button>
              <button onClick={() => setShowTableFilterList(false)}>ביטול</button>
            </div>
          </div>
        )}
      </div>

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

          <tbody>{renderTableRows()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
