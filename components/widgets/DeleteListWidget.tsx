import { useData } from "@/hooks/useUserData";
import Snippet from "@/models/Snippet";
import { UserData } from "@/models/UserData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import List from "models/List";
import { useRouter } from "next/router";
import { useState } from "react";
import CrossIcon from "../icons/Cross";
import Modal from "../Modal";

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
        <button
          className="px-2 py-1 bg-red-600"
          onClick={() => deleteList(list)}
        >
          Delete
        </button>
        <button
          className="px-2 py-1 bg-carbon-300"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </button>
        {isLoading && <span>Loading...</span>}
      </Modal>
    </>
  );
};

export default DeleteListWidget;
