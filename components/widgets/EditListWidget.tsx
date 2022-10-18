import { UserData } from "@/models/UserData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import List from "models/List";
import { useEffect, useState } from "react";
import CrossIcon from "../icons/Cross";
import EditIcon from "../icons/Edit";
import Modal from "../Modal";
import Loader from "../shared/Loader";

type EditListWidgetProps = {
  list: List;
};

const EditListWidget = ({ list }: EditListWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newListLabel, setNewListLabel] = useState("");

  const queryClient = useQueryClient();
  const { mutate: editList, isLoading } = useMutation(
    (editList: List) => {
      return fetch("/api/list/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editList),
      });
    },
    {
      onMutate: async (editList) => {
        await queryClient.cancelQueries(["userData"]);
        const previousData: UserData | undefined = queryClient.getQueryData([
          "userData",
        ]);
        let newData: UserData | null = null;
        if (previousData) {
          newData = { ...previousData };

          const listToEditIndex = newData.lists.findIndex(
            (l) => l._id.toString() === editList._id.toString()
          );

          if (listToEditIndex) {
            newData.lists[listToEditIndex].label = editList.label;
          }

          queryClient.setQueryData(["userData"], newData);
        }

        return { previousData, newData };
      },
      onError: (error, listToEdit, ctx) => {
        queryClient.setQueryData(["userData"], ctx?.previousData);
        console.log("editList error", error);
      },
      onSettled: (data, err, listToDelete, ctx) => {
        queryClient.invalidateQueries(["userData"]);
        setIsOpen(false);
      },
    }
  );

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      <li
        className="flex items-center justify-center w-6 h-6 transition-all ease-out rounded cursor-pointer bg-carbon-400 group hover:bg-carbon-300 hover:scale-105"
        onClick={() => setIsOpen(true)}
      >
        <EditIcon className="w-3.5 h-3.5 transition-all ease-out group-hover:scale-105" />
      </li>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {/* <div className="flex flex-col w-full">
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold uppercase">List Editing</h3>
            <p className="mt-8">Change the name of your list:</p>
          </div>
          <div className="flex mt-2 gap-x-2">
            <input
              value={newListLabel}
              onChange={handleLabelChange}
              className={`flex-1 h-10 px-2 rounded-sm bg-carbon-700 border-none focus:outline focus:outline-marine-500`}
              placeholder="List name"
              autoFocus
            />
            <div className="flex items-center gap-x-2">
              <button
                onClick={handleEditList}
                className="h-10 px-3 py-1 border-none rounded-sm bg-marine-500 drop-shadow min-w-[96px]"
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
                  <span>Save</span>
                )}
              </button>
              <button
                className="h-10 px-3 py-1 rounded-sm bg-slate-700 min-w-[96px]"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div> */}
        <div className="flex flex-col w-full">
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
                <span>Label</span>
                <input
                  value={newListLabel}
                  onChange={handleLabelChange}
                  type="text"
                  className="h-10 px-2 mt-2 bg-black border-none rounded-sm outline outline-1 outline-carbon-300 focus:outline-marine-500"
                  autoFocus
                />
              </label>
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
              <button
                className="min-w-[96px] h-10 px-4 text-sm font-semibold text-gray-200 uppercase rounded hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className="min-w-[96px] h-10 px-4 text-sm font-semibold uppercase rounded bg-marine-500 hover:bg-opacity-90"
                onClick={handleEditList}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditListWidget;
