import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateSnippet = () => {
  const creatSnippet = async (newSnippet: any) => {
    fetch("/api/snippet/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSnippet),
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation((newSnippet: any) => creatSnippet(newSnippet), {
    onMutate: async (newSnippet) => {
      // cancel the refetch of query
      await queryClient.cancelQueries(["userData"]);

      // make copy of previous data state to reuse it if error
      const previousData = queryClient.getQueryData(["userData"]);

      // update the query with new data
      queryClient.setQueryData(["userData"], (old: any) => {
        const prevData = { ...old };
        const collectionIndex = prevData.collections.findIndex(
          (c: any) => c._id === newSnippet.collectionId
        );
        collectionIndex &&
          prevData.collections[collectionIndex].snippetIds.push(newSnippet._id);

        return {
          ...prevData,
          snippets: [...prevData.snippets, newSnippet],
          collections: [...prevData.collections],
        };
      });

      // return the copy of previous data, will be used in onError if needed
      return { previousData };
    },
    onError: (err, newSnippet, context) => {
      queryClient.setQueryData(["userData"], context?.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["userData"]);
    },
  });

  return mutation;
};
