import { useData } from "@/hooks/useData";
import List from "@/models/List";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ObjectID } from "bson";
import React, { useState } from "react";
import PlusIcon from "../icons/Plus";
import Modal from "../Modal";

type CreateListWidgetProps = {};

const CreateListWidget = ({}: CreateListWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newListLabel, setNewListLabel] = useState("");

  const { forceActivateList } = useData();

  const queryClient = useQueryClient();
  const { mutate: createList, isLoading } = useMutation(
    (newList: List) => {
      return fetch("/api/list/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newList),
      });
    },
    {
      onError: (error, newList, ctx) => {
        console.error("error", error);
      },
      onSettled: (data, error, newList, ctx) => {
        queryClient.invalidateQueries(["userData"]);
        setIsOpen(false);
        setNewListLabel("");
        if (!error) {
          console.log("no ERORRRR");
          forceActivateList(newList._id.toString());
        }
      },
    }
  );

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewListLabel(e.target.value);
  };

  const handleCreateList = () => {
    const newList: List = {
      _id: new ObjectID(),
      label: newListLabel,
      original: false,
      snippetIds: [],
    };

    createList(newList);
  };

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
        <input
          value={newListLabel}
          onChange={handleLabelChange}
          className="h-10 px-2 bg-carbon-700"
        />
        <button
          onClick={handleCreateList}
          className="h-10 px-2 py-1 bg-marine-500"
        >
          Create
        </button>
        {isLoading && <span>Loading...</span>}
      </Modal>
    </>
  );
};

export default CreateListWidget;
