import List from "@/models/List";
import { UserData } from "@/models/UserData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UseCreateListParams = {
  onQuerySettled?: (newList: List, err: any) => void;
};

export const useCreateList = ({ onQuerySettled }: UseCreateListParams) => {
  const queryClient = useQueryClient();
  const useCreateList = useMutation(
    (newList: List) => {
      return fetch("/api/list/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newList),
      });
    },
    {
      onMutate: async (newList) => {
        await queryClient.cancelQueries(["userData"]);
        const previousData: UserData | undefined = queryClient.getQueryData([
          "userData",
        ]);
        let newData: UserData | null = null;
        if (previousData) {
          newData = { ...previousData };
          newData.lists.push(newList);
          queryClient.setQueryData(["userData"], newData);
        }

        return { previousData, newData };
      },
      onError: (error, newList, ctx) => {
        queryClient.setQueryData(["userData"], ctx?.previousData);
        console.error("error", error);
      },
      onSettled: (data, error, newList, ctx) => {
        queryClient.invalidateQueries(["userData"]);
        onQuerySettled && onQuerySettled(newList, error);
      },
    }
  );

  return useCreateList;
};