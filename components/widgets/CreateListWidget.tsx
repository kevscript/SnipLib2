import { useCreateList } from "@/hooks/useCreateList";
import { useData } from "@/hooks/useUserData";
import List from "@/models/List";
import { UserData } from "@/models/UserData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ObjectID } from "bson";
import { useRouter } from "next/router";
import React, { useState } from "react";
import CrossIcon from "../icons/Cross";
import PlusIcon from "../icons/Plus";
import Modal from "../Modal";
import Loader from "../shared/Loader";

type CreateListWidgetProps = {};

const CreateListWidget = ({}: CreateListWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newListLabel, setNewListLabel] = useState("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const onListCreation = (newList: List, err: any) => {
    setIsOpen(false);
    setNewListLabel("");
    if (!err) {
      router.replace(`/lists/${newList._id.toString()}`);
    }
  };

  const { mutate: createList, isLoading } = useCreateList({
    onQuerySettled: onListCreation,
  });

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 32 && !error) {
      setError("Label can't be longer than 32 characters");
    }
    if (e.target.value.length <= 32 && error) {
      setError(null);
    }
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
        <div className="flex flex-col w-full">
          <div className="w-full p-8">
            <div className="flex items-center justify-between w-full">
              <h3 className="font-bold">Creating List</h3>
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
                  type="text"
                  onChange={handleLabelChange}
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
              <button
                className="min-w-[96px] h-10 px-4 text-sm font-semibold text-gray-200 uppercase rounded hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                disabled={error ? true : false}
                className="min-w-[96px] h-10 px-4 text-sm font-semibold uppercase rounded bg-marine-500 hover:bg-opacity-90 disabled:bg-carbon-300"
                onClick={handleCreateList}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CreateListWidget;
