import Modal from "../../components/Modals/Modal";
import BoardsNav from "../../components/BoardsNav/BoardsNav";

type Props = {};

const MobileBoardsNav = (props: Props) => {
  return (
    <div className="mobile-boards-nav">
      <Modal isAllBoardsModal={true}>
        <BoardsNav />
      </Modal>
    </div>
  );
};

export default MobileBoardsNav;
