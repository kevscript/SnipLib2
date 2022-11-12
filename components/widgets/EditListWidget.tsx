import { useEditList } from "@/hooks/useEditList";
import { UserData } from "@/models/UserData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import List from "models/List";
import { useEffect, useState } from "react";
import CrossIcon from "../icons/Cross";
import EditIcon from "../icons/Edit";
import Modal from "../shared/Modal";
import Button from "../shared/Button";
import IconButton from "../shared/IconButton";
import Loader from "../shared/Loader";

type EditListWidgetProps = {
  list: List;
};

const EditListWidget = ({ list }: EditListWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newListLabel, setNewListLabel] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onListEdition = () => {
    setIsOpen(false);
  };
  const { mutate: editList, isLoading } = useEditList({
    onQuerySettled: onListEdition,
  });

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 32 && !error) {
      setError("Label can't be longer than 32 characters");
    }

    if (e.target.value.length === 0 && !error) {
      setError("Label can't be empty");
    }
    if (e.target.value.length <= 32 && e.target.value.length !== 0 && error) {
      setError(null);
    }
    setNewListLabel(e.target.value);
  };

  const handleEditList = () => {
    const newLabel = newListLabel.trim();
    if (newLabel && newLabel !== list.label) {
      const editedList: List = { ...list, label: newLabel };
      editList(editedList);
    } else {
      console.log("Label is empty");
    }
  };

  useEffect(() => {
    list && setNewListLabel(list.label);
  }, [list]);

  return (
    <>
      <IconButton
        onClick={() => setIsOpen(true)}
        icon={
          <EditIcon className="w-3.5 h-3.5 transition-all ease-out group-hover:scale-105" />
        }
        scale="small"
        className="hover:bg-carbon-300"
        tooltipId="edit-list"
        tooltipText="Edit list"
        data-cy="edit-list"
      />

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex flex-col w-full" data-cy="edit-list-modal">
          <div className="w-full p-8">
            <div className="flex items-center justify-between w-full">
              <h3 className="font-bold">Editing List</h3>
              <div
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center p-1 cursor-pointer group"
              >
                <CrossIcon className="w-5 h-5 stroke-gray-200 group-hover:stroke-white" />
              </div>
            </div>
            <div className="mt-8">
              <label className="flex flex-col">
                <span className="text-sm">Label</span>
                <input
                  value={newListLabel}
                  onChange={handleLabelChange}
                  type="text"
                  className="h-10 px-2 mt-2 bg-black border-none rounded-sm outline outline-1 outline-carbon-300 focus:outline-marine-500"
                  autoFocus
                />
              </label>
              {error && <span className="text-sm text-red-600">{error}</span>}
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
              <Button
                label="Save"
                onClick={handleEditList}
                variety="primary"
                disabled={error ? true : false}
              />
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

export default EditListWidget;
