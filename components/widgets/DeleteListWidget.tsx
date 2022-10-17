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
        <p>
          Do you really want to delete{" "}
          <span className="font-bold text-marine-500">{list.label}</span> ?
        </p>
        <p>
          It will also delete all the snippets it contains. This action is
          irreversible.
        </p>
        <div className="flex mt-8 gap-x-2">
          <button
            className="h-10 px-3 py-1 rounded-sm bg-slate-700 min-w-[96px]"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button
            className="h-10 px-3 py-1 bg-red-600 rounded-sm min-w-[96px]"
            onClick={() => deleteList(list)}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-x-2">
                <span>Deleting...</span>
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
              <span>Delete</span>
            )}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteListWidget;
