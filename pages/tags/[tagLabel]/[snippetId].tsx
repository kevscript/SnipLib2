import BarsWrapper from "@/components/layouts/BarsWrapper";
import Loader from "@/components/shared/Loader";
import SnippetBody from "@/components/Snippet/SnippetBody";
import SnippetHeader from "@/components/Snippet/SnippetHeader";
import DeleteSnippetWidget from "@/components/widgets/DeleteSnippetWidget";
import { useCodeMirror } from "@/hooks/useCodeMirror";
import { useData } from "@/hooks/useUserData";
import Snippet from "@/models/Snippet";
import { langList, LanguageIds } from "@/utils/langList";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const TagSnippetPage = () => {
  const router = useRouter();
  const { tagLabel, snippetId } = router.query;
  const { isSuccess, snippets, checkTagSnippet, tags } = useData();

  const [snippetError, setSnippetError] = useState<string | null>(null);
  const [activeSnippet, setActiveSnippet] = useState<Snippet | null>(null);

  const { container } = useCodeMirror({
    readOnly: true,
    doc: activeSnippet?.content,
    lang: (activeSnippet?.language as LanguageIds) || "javascript",
  });

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
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex-1 p-16 min-w-[640px]">
      <SnippetHeader snippet={activeSnippet} />
      <SnippetBody
        snippet={activeSnippet}
        editorContainer={container}
        language={langList.find((l) => l.id === activeSnippet.language)!}
      />
    </div>
  );
};

TagSnippetPage.authRequired = true;
TagSnippetPage.getLayout = (page: React.ReactElement) => {
  return <BarsWrapper mode="tag">{page}</BarsWrapper>;
};

export default TagSnippetPage;
