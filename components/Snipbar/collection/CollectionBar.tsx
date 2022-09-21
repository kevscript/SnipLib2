import { Collection } from "@/mocks/collections";
import CollectionBarHeader from "./CollectionBarHeader";
import { useEffect, useState } from "react";
import CollectionSnipItem from "./CollectionSnipItem";
import { useData } from "@/hooks/useData";
import { SnippetType } from "models/Snippet";
import { CollectionType } from "models/Collection";

const CollectionBar = () => {
  const { snippets, activeCollectionId, activeSnippetId, collections } =
    useData();

  const [activeCollection, setActiveCollection] =
    useState<CollectionType | null>(null);
  const [activeCollectionSnippets, setActiveCollectionSnippets] = useState<
    SnippetType[] | null
  >(null);

  useEffect(() => {
    if (activeCollectionId && snippets && collections) {
      const col = collections.find(
        (c) => c._id.toString() === activeCollectionId
      );
      const colSnippets = snippets.filter(
        (s) => s.collectionId.toString() === activeCollectionId
      );
      col && setActiveCollection(col);
      colSnippets && setActiveCollectionSnippets(colSnippets);
    }
  }, [activeCollectionId, snippets, collections]);

  if (!activeCollection) {
    return (
      <div className="flex flex-col flex-shrink-0 h-screen pt-8 overflow-hidden w-96 bg-carbon-500">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-shrink-0 h-screen pt-8 overflow-hidden w-96 bg-carbon-500">
      <>
        <CollectionBarHeader label={activeCollection.label} />
        <div className="w-full h-[2px] bg-carbon-600"></div>

        {activeCollectionSnippets && activeCollectionSnippets.length > 0 && (
          <ul className="flex flex-col flex-1 overflow-y-auto">
            {activeCollectionSnippets.map((snippet, i) => (
              <CollectionSnipItem
                key={snippet._id.toString()}
                snippet={snippet}
                collectionId={activeCollectionId}
                isActive={activeSnippetId === snippet._id.toString()}
              />
            ))}
          </ul>
        )}

        {activeCollectionSnippets && activeCollectionSnippets.length === 0 && (
          <h1>No snippet yet in this collection</h1>
        )}
      </>
    </div>
  );
};

export default CollectionBar;
