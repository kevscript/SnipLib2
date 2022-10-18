import { useData } from "@/hooks/useUserData";
import Snippet from "@/models/Snippet";
import { UserData } from "@/models/UserData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import List from "models/List";
import { useRouter } from "next/router";
import { useState } from "react";
import CrossIcon from "../icons/Cross";
import Modal from "../Modal";
import Loader from "../shared/Loader";

type DeleteListWidgetProps = {
  list: List;
};

const DeleteListWidget = ({ list }: DeleteListWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const queryClient = useQueryClient();
  const { mutate: deleteList, isLoading } = useMutation(
    (listToDelete: List) => {
      return fetch("/api/list/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(listToDelete),
      });
    },
    {
      onMutate: async (listToDelete) => {
        await queryClient.cancelQueries(["userData"]);

        const previousData: UserData | undefined = queryClient.getQueryData([
          "userData",
        ]);

        let newData: UserData | null = null;

        if (previousData) {
          newData = {
            ...previousData,
            lists: previousData.lists.filter(
              (l: List) => l._id.toString() !== listToDelete._id.toString()
            ),
            snippets: previousData.snippets.filter(
              (s: Snippet) =>
                s.listId.toString() !== listToDelete._id.toString()
            ),
          };

          queryClient.setQueryData(["userData"], newData);
        }

        return { previousData, newData };
      },
      onError: (err, listToDelete, ctx) => {
        queryClient.setQueryData(["userData"], ctx?.previousData);
        console.log("deleteList error", err);
      },
      onSettled: (data, err, listToDelete, ctx) => {
        queryClient.invalidateQueries(["userData"]);
        setIsOpen(false);
        if (!err && ctx) {
          ctx.newData && router.replace("/lists");
        }
      },
    }
  );

  return (
    <>
      <li
        className="flex items-center justify-center w-6 h-6 rounded cursor-pointer bg-carbon-400 group hover:bg-red-600"
        onClick={() => setIsOpen(true)}
      >
        <CrossIcon className="w-4 h-4" />
      </li>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex flex-col w-full">
          <div className="w-full p-8">
            <div className="flex items-center justify-between w-full">
              <h3 className="font-bold">Deleting List</h3>
              <div
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center p-1 cursor-pointer group"
              >
                <CrossIcon className="w-5 h-5 stroke-gray-200 group-hover:stroke-white" />
              </div>
            </div>
            <div className="mt-8">
              <p>
                Are you sure you want to delete{" "}
                <span className="font-bold text-red-600">{list.label}</span>{" "}
                from lists? It will also delete every single snippet it
                contains. This action is{" "}
                <span className="font-bold">irreversible</span>.
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
              <button
                className="min-w-[96px] h-10 px-4 text-sm font-semibold text-gray-200 uppercase rounded hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className="min-w-[96px] h-10 px-4 text-sm font-semibold uppercase rounded bg-red-600 hover:bg-opacity-90"
                onClick={() => deleteList(list)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteListWidget;
