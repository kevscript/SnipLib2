import { useMutation, useQueryClient } from "@tanstack/react-query";

type UsePublicSnippetParams = {
  onQuerySettled?: () => void;
};

const usePublicSnippet = ({ onQuerySettled }: UsePublicSnippetParams) => {
  const queryClient = useQueryClient();
  const usePublicSnippet = useMutation(
    (updateData: any) => {
      return fetch("/api/snippet/public", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });
    },
    {
      onMutate: async (updateData) => {
        await queryClient.cancelQueries(["userData"]);
        const previousData = queryClient.getQueriesData(["userData"]);
        queryClient.setQueryData(["userData"], (old: any) => {
          let newData = { ...old };

          let snippetToEditIdx = newData.snippets.findIndex(
            (s: any) => s._id.toString() === updateData.snippetId
          );

          if (snippetToEditIdx < 0) {
            throw new Error(
              `Couldn't find a snippet with id ${updateData.snippetId}`
            );
          }

          newData.snippets[snippetToEditIdx].public = updateData.public;

          return newData;
        });

        return { previousData };
      },

      onError: (error, updateData, ctx) => {
        queryClient.setQueryData(["userData"], ctx?.previousData);
        console.log("publicSnippet error", error);
      },
      onSettled: (data, err, updateData, ctx) => {
        queryClient.invalidateQueries(["userData"]);
        onQuerySettled && onQuerySettled();
      },
    }
  );

  return usePublicSnippet;
};

export default usePublicSnippet;
