import { useData } from "@/hooks/useData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ObjectID } from "bson";
import { useRouter } from "next/router";
import { useEffect } from "react";

const createNewSnippetObject = (collectionId: string) => {
  return {
    _id: new ObjectID().toString(),
    title: `Test Snippet ${Date.now()}`,
    description: "Im a description",
    content: "console.log('test')",
    language: "javascript",
    favorite: false,
    public: false,
    collectionId: collectionId,
    tags: ["hello", "world"],
  };
};

const creatSnippet = async (newSnippet: any) => {
  fetch("/api/snippet/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newSnippet),
  });
};

const CollectionPage = () => {
  const router = useRouter();
  const { collectionId } = router.query;

  const {
    collections,
    snippets,
    activeCollectionId,
    activeSnippetId,
    checkCollection,
  } = useData();

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
    onSettled: () => queryClient.invalidateQueries(["userData"]),
  });

  useEffect(() => {
    if (collections && activeCollectionId !== collectionId) {
      checkCollection(collectionId as string);
    }
  }, [checkCollection, collectionId, collections, activeCollectionId]);

  useEffect(() => {
    if (activeCollectionId && activeCollectionId !== collectionId) {
      if (activeSnippetId) {
        router.push(`/collections/${activeCollectionId}/${activeSnippetId}`);
      } else {
        router.push(`/collections/${activeCollectionId}`);
      }
    }
  }, [activeCollectionId, activeSnippetId, collectionId, router]);

  if (activeCollectionId !== collectionId) {
    return <h1>Loading ...</h1>;
  }

  return (
    <div>
      {collections && (
        <>
          <h1>
            Collection label :{" "}
            {collections.find((c) => c._id === activeCollectionId)!.label}
          </h1>
          <button
            onClick={() =>
              mutation.mutate(createNewSnippetObject(collectionId))
            }
            className="p-2 bg-blue-500"
          >
            Create new Snippet in this Collection
          </button>
          <ul>
            {snippets &&
              snippets
                .filter((s) => s.collectionId === collectionId)
                .map((s) => <li key={s._id.toString()}>{s.title}</li>)}
          </ul>
        </>
      )}
      {snippets &&
        !snippets.some(
          (s) => s.collectionId.toString() === activeCollectionId
        ) && <h1>This collection is empty, no snippet yet</h1>}
    </div>
  );
};

export default CollectionPage;
