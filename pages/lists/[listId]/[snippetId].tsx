import BarsWrapper from "@/components/layouts/BarsWrapper";
import { useData } from "@/hooks/useUserData";
import Snippet from "@/models/Snippet";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ListSnippetPage = () => {
  const router = useRouter();
  const { listId, snippetId } = router.query;
  const { isSuccess, checkListSnippet, snippets } = useData();

  const [snippetError, setSnippetError] = useState<string | null>(null);
  const [activeSnippet, setActiveSnippet] = useState<Snippet | null>(null);

  useEffect(() => {
    if (isSuccess) {
      const { valid } = checkListSnippet({
        listId: listId as string,
        snippetId: snippetId as string,
      });

      if (!valid) {
        setSnippetError("Something went wrong");
      } else {
        const snippet = snippets?.find(
          (s) =>
            s._id.toString() === snippetId && s.listId.toString() === listId
        );
        snippet && setActiveSnippet(snippet);
      }
    }
  }, [checkListSnippet, isSuccess, listId, snippetId, snippets]);

  if (snippetError) {
    return <div>ERROR: {snippetError}</div>;
  }

  if (!activeSnippet) {
    return <div>Loading...</div>;
  }

  return <div>Active Snippet : {activeSnippet?.title}</div>;
};

ListSnippetPage.authRequired = true;
ListSnippetPage.getLayout = (page: React.ReactElement) => {
  return <BarsWrapper mode="list">{page}</BarsWrapper>;
};

export default ListSnippetPage;
