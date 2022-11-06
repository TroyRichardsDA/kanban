import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  isAllBoardsModal?: boolean;
  toggle?: () => void;
};

function Modal(props: Props) {
  const { children, isAllBoardsModal } = props;
  const { toggle } = props;

  function preventChild(e: any) {
    e.stopPropagation();
  }

  const position = isAllBoardsModal ? "start" : "center";
  const modalWidth = isAllBoardsModal ? "264px" : "343px";

  return (
    <div className="modal_bg" style={{ alignItems: position }} onClick={toggle}>
      <div
        className="modal_container"
        style={{ width: modalWidth }}
        onClick={(e) => preventChild(e)}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
