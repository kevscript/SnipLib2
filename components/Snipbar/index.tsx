import { Collection } from "@/mocks/collections";
import SnipbarHeader from "./SnipbarHeader";
import SnipItem from "./SnipItem";
import { useData } from "@/hooks/useData";
import { useEffect, useState } from "react";

const Snipbar = () => {
  const {
    data,
    activeCollectionId,
    activeSnippetId,
    collectionIdOfActiveSnippet,
    handleActiveSnippet,
  } = useData();

  const [activeCollection, setActiveCollection] = useState<Collection>(
    {} as Collection
  );

  useEffect(() => {
    if (data && activeCollectionId) {
      const col = data.collections.find((col) => col.id === activeCollectionId);
      col && setActiveCollection(col);
    }
  }, [activeCollectionId, data]);

  return (
    <div className="flex flex-col h-screen pt-8 overflow-hidden w-96 bg-carbon-500">
      <SnipbarHeader label={activeCollection.label} />
      <div className="w-full h-[2px] bg-carbon-600"></div>
      <ul className="flex flex-col flex-1 overflow-y-auto">
        {activeCollection &&
          activeCollection.snippets &&
          activeCollection.snippets.map((snippet, i) => (
            <SnipItem
              key={snippet.id}
              snippet={snippet}
              isActive={
                activeSnippetId === snippet.id &&
                collectionIdOfActiveSnippet === activeCollectionId
              }
              handleActive={() =>
                handleActiveSnippet({
                  id: snippet.id,
                  collectionIdOfSnippet: activeCollection.id,
                })
              }
            />
          ))}
      </ul>
    </div>
  );
};

export default Snipbar;
