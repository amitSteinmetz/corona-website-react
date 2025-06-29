import { moreInfoBtn } from "../../assets/svgs";
import { Table } from "../../models/table.model";
import MoreActionsButton from "./MoreActionsButton";

const TableComponent = ({ table }: { table: Table }) => {
  function renderTableRows() {
    return table.rows.map((row) => (
      <tr>
        {Object.keys(row).map((key) =>
          key !== "id" ? <td>{row[key]}</td> : null
        )}
      </tr>
    ));
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

      <table>
        <tr>
          {table.columns.map((column) => (
            <th>{column}</th>
          ))}
        </tr>

        {renderTableRows()}
      </table>
    </div>
  );
};

export default TableComponent;
