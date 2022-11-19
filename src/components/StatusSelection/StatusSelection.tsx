import { ReactComponent as ChevronDown } from "../../assets/icon-chevron-down.svg";
import { IColumn } from "../../models/IColumn";

type Props = {
  status: string;
  statusListIsOpen: boolean;
  columns: IColumn[];
  changeStatus: (e: string) => void;
  toggleStatus: () => void;
};

const StatusSelection = (props: Props) => {
  const { status, statusListIsOpen, columns, changeStatus, toggleStatus } =
    props;

  const options = columns.map(({ name }, id) => (
    <p
      key={id}
      className="status-sel_option"
      onClick={(e: any) => changeStatus(e.target.innerText)}
    >
      {name}
    </p>
  ));

  return (
    <div className="status-sel_container">
      <input
        className={`status-sel_current ${
          statusListIsOpen && "status_sel-open"
        }`}
        value={status}
        type="text"
        readOnly
        onClick={() => toggleStatus()}
      />
      <ChevronDown />
      {statusListIsOpen && <div className="status-sel_options">{options}</div>}
    </div>
  );
};

export default StatusSelection;
