import Snipbar from "@/components/Snipbar";
import { useData } from "@/hooks/useData";
import { Snippet } from "@/mocks/snippets";
import { useEffect, useState } from "react";

const CollectionSnippetPage = () => {
  const {
    data,
    collectionIdOfActiveSnippet,
    activeSnippetId,
    activeCollectionId,
  } = useData();

  const [activeSnippet, setActiveSnippet] = useState<Snippet | null>(null);

  useEffect(() => {
    if (data) {
      const currActiveSnippet = data?.collections
        .find((c) => c.id === collectionIdOfActiveSnippet)
        ?.snippets.find((s) => s.id === activeSnippetId);
      currActiveSnippet && setActiveSnippet(currActiveSnippet);
    }
  }, [activeSnippet, activeSnippetId, collectionIdOfActiveSnippet, data]);

  if (!activeSnippet) return <h1>No snippet</h1>;

  return (
    <div className="flex w-full flex-nowrap">
      <Snipbar />
      <div>
        <h1>Collection Snippet Page</h1>
        <h6>current oppened collection: {activeCollectionId}</h6>
        <h6>collection id of active snippet: {collectionIdOfActiveSnippet}</h6>
        <h6>active snippet id : {activeSnippet.id}</h6>
        <h3>{activeSnippet.title}</h3>
        <p>{activeSnippet.description}</p>
        <pre>{activeSnippet.content}</pre>
      </div>
    </div>
  );
};
export default CollectionSnippetPage;
