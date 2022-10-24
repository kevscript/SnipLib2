import BarsWrapper from "@/components/layouts/BarsWrapper";
import Loader from "@/components/shared/Loader";
import SnippetEditer from "@/components/SnippetEditer";
import SnippetReader from "@/components/SnippetReader";
import { useData } from "@/hooks/useUserData";
import Snippet from "@/models/Snippet";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const FavSnippetPage = () => {
  const router = useRouter();
  const { snippetId } = router.query;
  const { isSuccess, snippets, lists, checkFavSnippet } = useData();

  const [snippetError, setSnippetError] = useState<string | null>(null);
  const [activeSnippet, setActiveSnippet] = useState<Snippet | null>(null);

  const [mode, setMode] = useState<"read" | "edit">("read");

  useEffect(() => {
    if (isSuccess) {
      const { valid } = checkFavSnippet({ snippetId: snippetId as string });

      if (!valid) {
        setSnippetError("Something went wrong");
      } else {
        const snippet = snippets?.find((s) => s._id.toString() === snippetId);
        snippet && setActiveSnippet(snippet);
      }
    }
  }, [checkFavSnippet, isSuccess, snippetId, snippets]);

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

FavSnippetPage.authRequired = true;
FavSnippetPage.getLayout = (page: React.ReactElement) => {
  return <BarsWrapper mode="fav">{page}</BarsWrapper>;
};

export default FavSnippetPage;
