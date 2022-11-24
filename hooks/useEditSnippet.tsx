import List from "@/models/List";
import Snippet from "@/models/Snippet";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ObjectID } from "bson";

type UseEditSnippetParams = {
  onQueryError?: () => void;
  onQuerySuccess?: () => void;
  onQuerySettled?: () => void;
};

const useEditSnippet = ({
  onQuerySettled,
  onQueryError,
  onQuerySuccess,
}: UseEditSnippetParams) => {
  const queryClient = useQueryClient();
  const useEditSnippet = useMutation(
    ({ snippetData }: { snippetData: Snippet }) => {
      return fetch(`/api/snippet/${snippetData._id.toString()}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ snippetData }),
      });
    },
    {
      onMutate: async ({ snippetData }) => {
        await queryClient.cancelQueries(["userData"]);
        const previousData = queryClient.getQueryData(["userData"]);
        queryClient.setQueryData(["userData"], (old: any) => {
          let newData = { ...old };

          let snippetToEdit: Snippet | null = newData.snippets.find(
            (s: Snippet) => s._id.toString() === snippetData._id.toString()
          );

          if (!snippetToEdit) {
            console.error("snippetToEdit is falsy");
            return { previousData };
          }

          const updatedSnippet = { ...snippetToEdit, ...snippetData };

          let prevListIdx = newData.lists.findIndex(
            (l: List) => l._id.toString() === snippetToEdit?.listId.toString()
          );

          newData.lists[prevListIdx].snippetIds = newData.lists[
            prevListIdx
          ].snippetIds.filter(
            (sId: ObjectID) => sId.toString() !== snippetToEdit?._id.toString()
          );

          let nextListIdx = newData.lists.findIndex(
            (l: List) => l._id.toString() === updatedSnippet.listId.toString()
          );

          newData.lists[nextListIdx].snippetIds.push(snippetToEdit?._id);

          snippetToEdit = updatedSnippet;

          return newData;
        });

        return { previousData };
      },

      onError: (error, {}, ctx) => {
        queryClient.setQueryData(["userData"], ctx?.previousData);
        console.log("editSnippet error", error);
      },
      onSettled: (data, err, {}, ctx) => {
        queryClient.invalidateQueries(["userData"]);

        onQuerySettled && onQuerySettled();
        data && onQuerySuccess && onQuerySuccess();
        err && onQueryError && onQueryError();
      },
    }
  );

  return useEditSnippet;
};

export default useEditSnippet;
