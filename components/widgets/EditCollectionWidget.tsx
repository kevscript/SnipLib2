import { CollectionType } from "models/Collection";
import { useState } from "react";
import EditIcon from "../icons/Edit";
import Modal from "../Modal";

type EditCollectionWidgetProps = {
  collection: CollectionType;
};

const EditCollectionWidget = ({ collection }: EditCollectionWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <li
        className="flex items-center justify-center w-6 h-6 rounded cursor-pointer bg-carbon-400 group hover:bg-carbon-300"
        onClick={() => setIsOpen(true)}
      >
        <EditIcon className="w-3.5 h-3.5" />
      </li>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h1>Edit {collection.label}</h1>
      </Modal>
    </>
  );
};

export default EditCollectionWidget;
