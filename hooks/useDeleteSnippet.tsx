import Snippet from "@/models/Snippet";
import { UserData } from "@/models/UserData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UseDeleteSnippetParams = {
  onQuerySettled?: (snippetToDelete: Snippet, err: any) => void;
};

export const useDeleteSnippet = ({
  onQuerySettled,
}: UseDeleteSnippetParams) => {
  const queryClient = useQueryClient();
  const useDeleteSnippet = useMutation(
    (snippetToDelete: Snippet) => {
      return fetch(`/api/snippet/${snippetToDelete._id.toString()}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ listId: snippetToDelete.listId.toString() }),
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
        onQuerySettled && onQuerySettled(snippetToDelete, error);
      },
    }
  );

  return useDeleteSnippet;
};
