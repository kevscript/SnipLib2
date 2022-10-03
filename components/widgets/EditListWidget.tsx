import { UserData } from "@/models/UserData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import List from "models/List";
import { useEffect, useState } from "react";
import EditIcon from "../icons/Edit";
import Modal from "../Modal";

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
        className="flex items-center justify-center w-6 h-6 rounded cursor-pointer bg-carbon-400 group hover:bg-carbon-300"
        onClick={() => setIsOpen(true)}
      >
        <EditIcon className="w-3.5 h-3.5" />
      </li>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h1>Edit {list.label}</h1>
        <input
          value={newListLabel}
          onChange={handleLabelChange}
          className="h-10 px-2 bg-carbon-700"
        />
        <button
          onClick={handleEditList}
          className="h-10 px-2 py-1 bg-marine-500"
        >
          Update
        </button>
      </Modal>
    </>
  );
};

export default EditListWidget;
