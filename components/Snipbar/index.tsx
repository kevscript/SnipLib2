import { Collection } from "@/mocks/collections";
import SnipbarHeader from "./SnipbarHeader";
import SnipItem from "./SnipItem";

import { useEffect, useState } from "react";
import { useUserData } from "@/hooks/useUserData";

const Snipbar = () => {
  const { collections, activeCollectionId, activeSnippetId } = useUserData();

  const [activeCollection, setActiveCollection] = useState<Collection | null>(
    null
  );

  useEffect(() => {
    if (collections && activeCollectionId) {
      const currActiveCollection = collections.find(
        (c) => c._id === activeCollectionId
      );
      currActiveCollection && setActiveCollection(currActiveCollection);
    }
  }, [activeCollectionId, collections]);

  if (!activeCollection) {
    return (
      <div className="flex flex-col flex-shrink-0 h-screen pt-8 overflow-hidden w-96 bg-carbon-500">
        <h1>No active collection</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-shrink-0 h-screen pt-8 overflow-hidden w-96 bg-carbon-500">
      {activeCollection && (
        <>
          <SnipbarHeader label={activeCollection.label} />
          <div className="w-full h-[2px] bg-carbon-600"></div>
          <ul className="flex flex-col flex-1 overflow-y-auto">
            {activeCollection &&
              activeCollection.snippets &&
              activeCollection.snippets.map((snippet, i) => (
                <SnipItem
                  key={snippet._id}
                  snippet={snippet}
                  collectionId={activeCollectionId}
                  isActive={activeSnippetId === snippet._id}
                />
              ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Snipbar;
