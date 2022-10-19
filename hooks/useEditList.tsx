import List from "@/models/List";
import { UserData } from "@/models/UserData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UseEditListParams = {
  onQuerySettled?: () => void;
};

export const useEditList = ({ onQuerySettled }: UseEditListParams) => {
  const queryClient = useQueryClient();
  const useEditList = useMutation(
    (editList: List) => {
      return fetch("/api/list/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editList),
      });
    },
    {
      onMutate: async (editList) => {
        await queryClient.cancelQueries(["userData"]);
        const previousData: UserData | undefined = queryClient.getQueryData([
          "userData",
        ]);
        let newData: UserData | null = null;
        if (previousData) {
          newData = { ...previousData };

          const listToEditIndex = newData.lists.findIndex(
            (l) => l._id.toString() === editList._id.toString()
          );

          if (listToEditIndex) {
            newData.lists[listToEditIndex].label = editList.label;
          }

          queryClient.setQueryData(["userData"], newData);
        }

        return { previousData, newData };
      },
      onError: (error, listToEdit, ctx) => {
        queryClient.setQueryData(["userData"], ctx?.previousData);
        console.log("editList error", error);
      },
      onSettled: (data, err, listToDelete, ctx) => {
        queryClient.invalidateQueries(["userData"]);
        onQuerySettled && onQuerySettled();
      },
    }
  );

  return useEditList;
};
