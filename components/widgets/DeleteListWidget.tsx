import List from "models/List";
import { useState } from "react";
import CrossIcon from "../icons/Cross";
import Modal from "../Modal";

type DeleteListWidgetProps = {
  list: List;
};

const DeleteListWidget = ({ list }: DeleteListWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <li
        className="flex items-center justify-center w-6 h-6 rounded cursor-pointer bg-carbon-400 group hover:bg-red-600"
        onClick={() => setIsOpen(true)}
      >
        <CrossIcon className="w-4 h-4" />
      </li>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h1>Delete {list.label}</h1>
      </Modal>
    </>
  );
};

export default DeleteListWidget;
