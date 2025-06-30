import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { moreInfoBtn } from "../../assets/svgs";
import { Table } from "../../models/table.model";
import MoreActionsButton from "./MoreActionsButton";
import { useState } from "react";

const TableComponent = ({ table }: { table: Table }) => {
  const [rows, setRows] = useState(table.rows);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  function renderTableRows() {
    return rows.map((row) => (
      <tr>
        {Object.keys(row).map((key) =>
          key !== "id" ? (
            <td className="bold">
              {row[key] ? (
                typeof row[key] === "number" ? (
                  <div className="row-field">
                    <div>{row[key]} %</div>
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

  function sortRows(sortKey) {
    const direction =
      sortKey === sortColumn && sortDirection === "asc" ? "desc" : "asc";

    const sortedRows = [...rows].sort((a, b) => {
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
    setRows(sortedRows);
  }

  return (
    <div className="responsive-container card">
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

      <div className="table-container">
        <table>
          <thead>
            <tr>
              {table.columns.map((column) => (
                <th
                  className={`${
                    column.key === sortColumn
                      ? "table-column-focused bold"
                      : "medium"
                  }`}
                  onClick={() => sortRows(column.key)}
                >
                  {column.value}
                  {sortDirection === "asc" && sortColumn === column.key && (
                    <IoIosArrowDown className="arrow-btn" />
                  )}
                  {sortDirection === "desc" && sortColumn === column.key && (
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
