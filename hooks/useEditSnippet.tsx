import { useMutation, useQueryClient } from "@tanstack/react-query";

const useEditSnippet = () => {
  const queryClient = useQueryClient();
  const useEditSnippet = useMutation(
    (editedSnippet: any) => {
      return fetch("/api/snippet/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedSnippet),
      });
    },
    {
      onMutate: async (editedSnippet) => {
        await queryClient.cancelQueries(["userData"]);
        const previousData = queryClient.getQueryData(["userData"]);
        queryClient.setQueryData(["userData"], (old: any) => {
          let newData = { ...old };

          let snippetToEditIdx = newData.snippets.findIndex(
            (s: any) => s._id.toString() === editedSnippet._id.toString()
          );

          if (snippetToEditIdx < 0) {
            console.log("error snippetToEditIdx is < 0");
          }

          if (
            newData.snippets[snippetToEditIdx].listId !== editedSnippet.listId
          ) {
            let oldListIdx = newData.lists.findIndex(
              (l: any) => l._id === newData.snippets[snippetToEditIdx].listId
            );
            let newListIdx = newData.lists.findIndex(
              (l: any) => l._id === editedSnippet.listId
            );

            if (oldListIdx >= 0 && newListIdx >= 0) {
              newData.lists[oldListIdx].snippets = newData.lists[
                oldListIdx
              ].snippetIds.filter((s: any) => s !== editedSnippet._id);
              newData.lists[newListIdx].snippetIds.push(editedSnippet._id);
            }
          }

          newData.snippets[snippetToEditIdx] = { ...editedSnippet };
          return newData;
        });

        return { previousData };
      },

      onError: (error, editedSnippet, ctx) => {
        queryClient.setQueryData(["userData"], ctx?.previousData);
        console.log("editSnippet error", error);
      },
      onSettled: (data, err, editedSnippet, ctx) => {
        queryClient.invalidateQueries(["userData"]);
      },
    }
  );

  return useEditSnippet;
};

export default useEditSnippet;
