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

  const router = useRouter();

  // const { forceActivateList } = useData();

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
      onMutate: async (newList) => {
        await queryClient.cancelQueries(["userData"]);
        const previousData: UserData | undefined = queryClient.getQueryData([
          "userData",
        ]);
        let newData: UserData | null = null;
        if (previousData) {
          newData = { ...previousData };
          newData.lists.push(newList);
          queryClient.setQueryData(["userData"], newData);
        }

        return { previousData, newData };
      },
      onError: (error, newList, ctx) => {
        queryClient.setQueryData(["userData"], ctx?.previousData);
        console.error("error", error);
      },
      onSettled: (data, error, newList, ctx) => {
        queryClient.invalidateQueries(["userData"]);
        setIsOpen(false);
        setNewListLabel("");
        if (!error) {
          console.log("no ERORRRR");
          router.replace(`/lists/${newList._id.toString()}`);
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
                <span>Label</span>
                <input
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
