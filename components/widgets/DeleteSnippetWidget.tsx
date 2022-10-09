import { useData } from "@/hooks/useData";
import Snippet from "@/models/Snippet";
import { UserData } from "@/models/UserData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import CrossIcon from "../icons/Cross";
import Modal from "../Modal";

type DeleteSnippetWidgetProps = {
  snippet: Snippet;
};

const DeleteSnippetWidget = ({ snippet }: DeleteSnippetWidgetProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const { initState, lists } = useData();

  const queryClient = useQueryClient();
  const { mutate: deleteSnippet, isLoading } = useMutation(
    (snippetToDelete: Snippet) => {
      return fetch("/api/snippet/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(snippetToDelete),
      });
    },
    {
      onMutate: async (snippetToDelete) => {
        await queryClient.cancelQueries(["userData"]);

        const previousData: UserData | undefined = queryClient.getQueryData([
          "userData",
        ]);

        let newData: UserData | null = null;

        if (previousData) {
          newData = {
            ...previousData,
            snippets: previousData.snippets.filter(
              (s) => s._id.toString() !== snippetToDelete._id.toString()
            ),
          };

          const listOfSnippet = previousData.lists.find(
            (l) => l._id.toString() === snippetToDelete.listId.toString()
          );
          if (listOfSnippet) {
            listOfSnippet.snippetIds = listOfSnippet.snippetIds.filter(
              (id) => id.toString() !== snippetToDelete._id.toString()
            );
          }

          queryClient.setQueriesData(["userData"], newData);
        }

        return { previousData, newData };
      },
      onError: (error, snippetToDelete, ctx) => {
        queryClient.setQueryData(["userData"], ctx?.previousData);
        console.log("deleteSnippet error", error);
      },
      onSettled: (data, error, snippetToDelete, ctx) => {
        queryClient.invalidateQueries(["userData"]);
        setIsOpen(false);

        if (!error && ctx) {
          router.push("/snippets");
        }
      },
    }
  );

  return (
    <>
      <button
        className="px-4 py-1 text-sm rounded-sm bg-marine"
        onClick={() => setIsOpen(true)}
      >
        Delete
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <p>
          Do you really want to delete{" "}
          <span className="font-bold text-marine-500">{snippet.title}</span>{" "}
          from{" "}
          <span className="font-bold">
            {
              lists?.find((l) => l._id.toString() === snippet.listId.toString())
                ?.label
            }
          </span>{" "}
          ?
        </p>
        <button
          className="px-2 py-1 bg-red-600"
          onClick={() => deleteSnippet(snippet)}
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

export default DeleteSnippetWidget;
