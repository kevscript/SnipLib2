import Snippet from "@/models/Snippet";
import { useState } from "react";
import CrossIcon from "../icons/Cross";
import Modal from "../shared/Modal";
import Button from "../shared/Button";
import Loader from "../shared/Loader";

type EditSnippetWidgetProps = {
  snippet: Snippet;
  onConfirm: () => void;
  isLoading?: boolean;
};

const EditSnippetWidget = ({
  snippet,
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
      <Button
        label="Save"
        onClick={() => setIsOpen(true)}
        variety="primary"
        data-cy="edit-snippet"
      />
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex flex-col w-full">
          <div className="w-full p-8">
            <div className="flex items-center justify-between w-full">
              <h3 className="font-bold">Editing Snippet</h3>
              <div
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center p-1 cursor-pointer group"
              >
                <CrossIcon className="w-5 h-5 stroke-gray-200 group-hover:stroke-white" />
              </div>
            </div>
            <div className="mt-8">
              <p>
                Are you sure you want to edit snippet &apos;
                <span className="font-bold text-marine-500">
                  {snippet.title}
                </span>
                &apos; ?
              </p>
            </div>
          </div>
          <div className="flex justify-between w-full p-8 pt-4 bg-carbon-600 gap-x-4">
            <div>
              {isLoading && (
                <Loader
                  color="#fff"
                  height={6}
                  margin={-9}
                  width={3}
                  speedMultiplier={2}
                  className="translate-x-2.5 translate-y-5"
                />
              )}
            </div>
            <div className="flex gap-x-4">
              <Button label="Save" onClick={handleConfirm} variety="primary" />
              <Button
                label="Cancel"
                onClick={() => setIsOpen(false)}
                variety="secondary"
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditSnippetWidget;
