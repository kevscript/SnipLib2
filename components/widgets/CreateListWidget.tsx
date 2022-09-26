import { useState } from "react";
import PlusIcon from "../icons/Plus";
import Modal from "../Modal";

type CreateListWidgetProps = {};

const CreateListWidget = ({}: CreateListWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="flex items-center justify-center w-6 h-6 ml-4 rounded cursor-pointer group bg-carbon-400 hover:bg-marine-500"
        onClick={() => setIsOpen(true)}
      >
        <PlusIcon className="w-4 h-4" />
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h1>Create New List</h1>
      </Modal>
    </>
  );
};

export default CreateListWidget;
