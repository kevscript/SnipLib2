import { useState } from "react";
import Modal from "../Modal";
import Loader from "../shared/Loader";

type EditSnippetWidgetProps = {
  onConfirm: () => void;
  isLoading?: boolean;
};

const EditSnippetWidget = ({
  onConfirm,
  isLoading,
}: EditSnippetWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Save</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold uppercase">Snippet editing</h3>
          <p className="mt-8">Are you sure you want to edit this snippet?</p>
        </div>
        <div className="flex mt-8 gap-x-2">
          <button
            className="h-10 px-3 py-1 rounded-sm bg-slate-700 min-w-[96px]"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button
            className="h-10 px-3 py-1 bg-marine-500 rounded-sm min-w-[96px]"
            onClick={handleConfirm}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-x-2">
                <span>Saving...</span>
                <Loader
                  color="#fff"
                  height={6}
                  margin={-9}
                  width={3}
                  speedMultiplier={2}
                  className="translate-x-2.5 translate-y-2.5"
                />
              </div>
            ) : (
              <span>Save changes</span>
            )}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default EditSnippetWidget;
