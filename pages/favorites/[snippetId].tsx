import SnippetForm from "@/components/forms/SnippetForm";
import BarsWrapper from "@/components/layouts/BarsWrapper";
import ErrorMessage from "@/components/messages/ErrorMessage";
import Loader from "@/components/shared/Loader";
import SnippetReader from "@/components/SnippetReadOnly";
import useEditSnippet from "@/hooks/useEditSnippet";
import useFavSnippet from "@/hooks/useFavSnippet";
import { useData } from "@/hooks/useUserData";
import Snippet from "@/models/Snippet";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const FavSnippetPage = () => {
  const router = useRouter();
  const { snippetId } = router.query;
  const { isSuccess, snippets, lists, checkFavSnippet, activeListId } =
    useData();

  const [snippetError, setSnippetError] = useState<string | null>(null);
  const [activeSnippet, setActiveSnippet] = useState<Snippet | null>(null);

  const [mode, setMode] = useState<"read" | "edit">("read");

  const { mutate: favSnippet } = useFavSnippet({
    onQuerySettled: () => router.replace("/favorites"),
  });
  const { mutate: editSnippet } = useEditSnippet();

  const handleSnippetEdit = (s: Snippet) => {
    editSnippet(s);
    setMode("read");
  };

  const toggleFavorite = () => {
    if (activeSnippet) {
      favSnippet({
        snippetId: activeSnippet._id.toString(),
        favorite: !activeSnippet.favorite,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      const { valid } = checkFavSnippet({ snippetId: snippetId as string });

      if (!valid) {
        setSnippetError("Something went wrong");
      } else {
        const snippet = snippets?.find((s) => s._id.toString() === snippetId);
        setSnippetError(null);
        snippet && setActiveSnippet(snippet);
      }
    }
  }, [checkFavSnippet, isSuccess, snippetId, snippets]);

  if (snippetError) {
    return (
      <ErrorMessage>
        <span className="text-red-600">Something went wrong</span>
        <span>Couldn&apos;t find a favorite snippet at this url</span>
      </ErrorMessage>
    );
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
        <SnippetForm
          snippet={activeSnippet}
          activeListId={activeListId}
          lists={lists || []}
          onCancel={() => setMode("read")}
          onSubmit={handleSnippetEdit}
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
