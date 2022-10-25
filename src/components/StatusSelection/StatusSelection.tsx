import styles from "./StatusSelection.module.scss";
import ChevronDown from "../../assets/icon-chevron-down.svg";
import { IColumn } from "../../models/IColumn";

type Props = {
  status: string;
  statusListIsOpen: boolean;
  columns: IColumn[];
  changeStatus: (params: string) => void;
  toggleStatus: () => void;
};

const StatusSelection = (props: Props) => {
  const { status, statusListIsOpen, columns, changeStatus, toggleStatus } =
    props;

  const options = columns.map(({ name }, id) => (
    <p
      key={id}
      className={styles.option}
      onClick={(e: any) => changeStatus(e.target.innerText)}
    >
      {name}
    </p>
  ));

  return (
    <>
      <div className={styles.status_container}>
        <input
          value={status}
          type="text"
          readOnly
          onClick={() => toggleStatus()}
          className={`${styles.current_option} ${
            statusListIsOpen && styles.open
          }`}
        />
        <img src={ChevronDown} alt="" />
      </div>
      {statusListIsOpen && (
        <div className={styles.status_options}>{options}</div>
      )}
    </>
  );
};

export default StatusSelection;
