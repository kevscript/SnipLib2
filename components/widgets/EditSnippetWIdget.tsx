import { useState } from "react";
import Modal from "../Modal";

type EditSnippetWidgetProps = {
  onConfirm: () => void;
};

const EditSnippetWidget = ({ onConfirm }: EditSnippetWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Save</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h1>Are you sure you want to update this snippet?</h1>
        <button onClick={handleConfirm}>Confirm</button>
        <button onClick={() => setIsOpen(false)}>Cancel</button>
      </Modal>
    </>
  );
};

export default EditSnippetWidget;
