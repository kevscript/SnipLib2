import { useData } from "@/hooks/useUserData";
import List from "@/models/List";
import { UserData } from "@/models/UserData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ObjectID } from "bson";
import { useRouter } from "next/router";
import React, { useState } from "react";
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
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold uppercase">
              New List creation
            </h3>
            <p className="mt-8">Name your new list:</p>
          </div>
          <div className="flex mt-2 gap-x-2">
            <input
              value={newListLabel}
              onChange={handleLabelChange}
              className={`flex-1 h-10 px-2 rounded-sm bg-carbon-700 border-none focus:outline focus:outline-marine-500`}
              placeholder="List name"
            />
            <div className="flex items-center gap-x-2">
              <button
                onClick={handleCreateList}
                className="h-10 px-3 py-1 border-none rounded-sm bg-marine-500 drop-shadow min-w-[96px]"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-x-2">
                    <span>Creating...</span>
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
                  <span>Create</span>
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
        </div>
      </Modal>
    </>
  );
};

export default CreateListWidget;
