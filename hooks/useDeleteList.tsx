import List from "@/models/List";
import Snippet from "@/models/Snippet";
import { UserData } from "@/models/UserData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UseDeleteListParams = {
  onQuerySettled?: (err: any) => void;
};

export const useDeleteList = ({ onQuerySettled }: UseDeleteListParams) => {
  const queryClient = useQueryClient();
  const useDeleteList = useMutation(
    (listToDelete: List) => {
      return fetch(`/api/list/${listToDelete._id.toString()}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
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
        onQuerySettled && onQuerySettled(err);
      },
    }
  );

  return useDeleteList;
};
