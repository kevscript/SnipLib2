import List from "@/models/List";
import { UserData } from "@/models/UserData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UseEditListParams = {
  onQuerySettled?: () => void;
};

export const useEditList = ({ onQuerySettled }: UseEditListParams) => {
  const queryClient = useQueryClient();
  const useEditList = useMutation(
    (listData: List) => {
      return fetch(`/api/list/${listData._id.toString()}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ listData: listData }),
      });
    },
    {
      onMutate: async (listData) => {
        await queryClient.cancelQueries(["userData"]);
        const previousData: UserData | undefined = queryClient.getQueryData([
          "userData",
        ]);
        let newData: UserData | null = null;
        if (previousData) {
          newData = { ...previousData };

          const listToEditIndex = newData.lists.findIndex(
            (l) => l._id.toString() === listData._id.toString()
          );

          if (listToEditIndex) {
            newData.lists[listToEditIndex].label = listData.label;
          }

          queryClient.setQueryData(["userData"], newData);
        }

        return { previousData, newData };
      },
      onError: (error, listData, ctx) => {
        queryClient.setQueryData(["userData"], ctx?.previousData);
        console.log("editList error", error);
      },
      onSettled: (data, err, listData, ctx) => {
        queryClient.invalidateQueries(["userData"]);
        onQuerySettled && onQuerySettled();
      },
    }
  );

  return useEditList;
};
