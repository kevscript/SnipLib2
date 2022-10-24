import BarsWrapper from "@/components/layouts/BarsWrapper";
import Loader from "@/components/shared/Loader";
import SnippetEditer from "@/components/SnippetEditer";
import SnippetReader from "@/components/SnippetReader";
import useFavSnippet from "@/hooks/useFavSnippet";
import { useData } from "@/hooks/useUserData";
import Snippet from "@/models/Snippet";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const TagSnippetPage = () => {
  const router = useRouter();
  const { tagLabel, snippetId } = router.query;
  const { isSuccess, snippets, checkTagSnippet, tags, lists } = useData();

  const [snippetError, setSnippetError] = useState<string | null>(null);
  const [activeSnippet, setActiveSnippet] = useState<Snippet | null>(null);

  const [mode, setMode] = useState<"read" | "edit">("read");

  const { mutate: favSnippet } = useFavSnippet({});

  const toggleFavorite = () => {
    if (activeSnippet) {
      favSnippet({
        snippetId: activeSnippet._id.toString(),
        favorite: !activeSnippet.favorite,
      });
    }
  };

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
    <div>
      {mode === "read" && (
        <SnippetReader
          snippet={activeSnippet}
          triggerEditMode={() => setMode("edit")}
          toggleFavorite={toggleFavorite}
        />
      )}
      {mode === "edit" && (
        <SnippetEditer
          snippet={activeSnippet}
          lists={lists || []}
          triggerReadMode={() => setMode("read")}
        />
      )}
    </div>
  );
};

TagSnippetPage.authRequired = true;
TagSnippetPage.getLayout = (page: React.ReactElement) => {
  return <BarsWrapper mode="tag">{page}</BarsWrapper>;
};

export default TagSnippetPage;
