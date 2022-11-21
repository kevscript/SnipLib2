import Snippet from "@/models/Snippet";
import { UserData } from "@/models/UserData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UseCreateSnippetParams = {
  onQuerySettled?: (newSnippet: Snippet, err: any) => void;
};

export const useCreateSnippet = ({
  onQuerySettled,
}: UseCreateSnippetParams) => {
  const queryClient = useQueryClient();
  const useCreateSnippet = useMutation(
    (newSnippet: Snippet) => {
      return fetch("/api/snippet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSnippet),
      });
    },
    {
      onMutate: async (newSnippet) => {
        await queryClient.cancelQueries(["userData"]);
        const previousData: UserData | undefined = queryClient.getQueryData([
          "userData",
        ]);
        let newData: UserData | null = null;
        if (previousData) {
          newData = { ...previousData };
          // add new snippet
          newData.snippets.push(newSnippet);
          // add snippet id to list
          const newSnippetListIdIndex = newData.lists.findIndex(
            (l) => l._id.toString() === newSnippet.listId.toString()
          );
          if (newSnippetListIdIndex >= 0) {
            newData.lists[newSnippetListIdIndex].snippetIds.push(
              newSnippet._id
            );
          }

          queryClient.setQueryData(["userData"], newData);
        }

        return { previousData, newData };
      },
      onError: (error, newSnippet, ctx) => {
        queryClient.setQueryData(["userData"], ctx?.previousData);
        console.log("error", error);
      },
      onSettled: (data, error, newSnippet, ctx) => {
        queryClient.invalidateQueries(["userData"]);

        onQuerySettled && onQuerySettled(newSnippet, error);
      },
    }
  );

  return useCreateSnippet;
};
