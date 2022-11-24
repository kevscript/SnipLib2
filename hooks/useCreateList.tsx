import List from "@/models/List";
import { UserData } from "@/models/UserData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UseCreateListParams = {
  onQuerySettled?: (newList: List, err: any) => void;
  onQueryError?: () => void;
  onQuerySuccess?: () => void;
};

export const useCreateList = ({
  onQuerySettled,
  onQueryError,
  onQuerySuccess,
}: UseCreateListParams) => {
  const queryClient = useQueryClient();
  const useCreateList = useMutation(
    (newList: List) => {
      return fetch("/api/list", {
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
      onSettled: (data, err, newList, ctx) => {
        queryClient.invalidateQueries(["userData"]);
        onQuerySettled && onQuerySettled(newList, err);
        data && onQuerySuccess && onQuerySuccess();
        err && onQueryError && onQueryError();
      },
    }
  );

  return useCreateList;
};
