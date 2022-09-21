import BarsWrapper from "@/components/layouts/BarsWrapper";
import { useCreateSnippet } from "@/hooks/useCreateSnippet";
import { useData } from "@/hooks/useData";
import { createNewSnippet } from "@/utils/createNewSnippet";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";

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

  const mutation = useCreateSnippet();

  useEffect(() => {
    if (collections && activeCollectionId !== collectionId) {
      checkCollection(collectionId as string);
    }
  }, [checkCollection, collectionId, collections, activeCollectionId]);

  useEffect(() => {
    if (activeCollectionId) {
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
            onClick={() => mutation.mutate(createNewSnippet(collectionId))}
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

CollectionPage.authRequired = true;
CollectionPage.getLayout = (page: ReactElement) => {
  return <BarsWrapper filter="collection">{page}</BarsWrapper>;
};
export default CollectionPage;
