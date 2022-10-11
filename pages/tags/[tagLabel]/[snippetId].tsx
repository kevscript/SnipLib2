import BarsWrapper from "@/components/layouts/BarsWrapper";
import { useData } from "@/hooks/useUserData";
import Snippet from "@/models/Snippet";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const TagSnippetPage = () => {
  const router = useRouter();
  const { tagLabel, snippetId } = router.query;
  const { isSuccess, snippets, checkTagSnippet, tags } = useData();

  const [snippetError, setSnippetError] = useState<string | null>(null);
  const [activeSnippet, setActiveSnippet] = useState<Snippet | null>(null);

  useEffect(() => {
    if (isSuccess && tags) {
      const { valid } = checkTagSnippet({
        tagLabel: tagLabel as string,
        snippetId: snippetId as string,
      });

      if (!valid) {
        setSnippetError("Something went wrong");
      } else {
        const snippet = snippets?.find(
          (s) =>
            s._id.toString() === snippetId &&
            s.tags.includes(tagLabel as string)
        );
        snippet && setActiveSnippet(snippet);
      }
    }
  }, [checkTagSnippet, isSuccess, snippetId, snippets, tagLabel, tags]);

  if (snippetError) {
    return <div>ERROR: {snippetError}</div>;
  }

  if (!activeSnippet) {
    return <div>Loading...</div>;
  }

  return <div>Active Snippet : {activeSnippet?.title}</div>;
};

TagSnippetPage.authRequired = true;
TagSnippetPage.getLayout = (page: React.ReactElement) => {
  return <BarsWrapper mode="tag">{page}</BarsWrapper>;
};

export default TagSnippetPage;
