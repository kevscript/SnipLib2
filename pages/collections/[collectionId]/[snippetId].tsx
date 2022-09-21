import BarsWrapper from "@/components/layouts/BarsWrapper";
import { useData } from "@/hooks/useData";
import { SnippetType } from "models/Snippet";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";

const SnippetPage = () => {
  const router = useRouter();
  const { snippetId, collectionId } = router.query;

  const [snippet, setSnippet] = useState<SnippetType | null>(null);

  const {
    activeCollectionId,
    activeSnippetId,
    collections,
    snippets,
    checkSnippet,
  } = useData();

  useEffect(() => {
    if (collections && snippets) {
      if (
        activeCollectionId === collectionId &&
        activeSnippetId === snippetId
      ) {
        const activeSnippet = snippets.find((s) => s._id === snippetId);
        activeSnippet && setSnippet(activeSnippet);
      } else {
        checkSnippet({
          collectionId: collectionId as string,
          snippetId: snippetId as string,
        });
      }
    }
  }, [
    activeCollectionId,
    activeSnippetId,
    checkSnippet,
    collectionId,
    collections,
    snippetId,
    snippets,
  ]);

  if (!snippet) {
    return (
      <div>
        <h1>No snippet</h1>
      </div>
    );
  }

  return <h1>Snippet title : {snippet.title}</h1>;
};

SnippetPage.authRequired = true;
SnippetPage.getLayout = (page: ReactElement) => {
  return <BarsWrapper filter="collection">{page}</BarsWrapper>;
};
export default SnippetPage;
