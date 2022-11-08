import BarsWrapper from "@/components/layouts/BarsWrapper";
import Loader from "@/components/shared/Loader";
import { useData } from "@/hooks/useUserData";
import Snippet from "@/models/Snippet";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SnippetReader from "@/components/SnippetReadOnly";
import useFavSnippet from "@/hooks/useFavSnippet";
import ErrorMessage from "@/components/messages/ErrorMessage";
import SnippetForm from "@/components/forms/SnippetForm";
import useEditSnippet from "@/hooks/useEditSnippet";
import Head from "next/head";

const ListSnippetPage = () => {
  const router = useRouter();
  const { listId, snippetId } = router.query;
  const { isSuccess, checkListSnippet, snippets, lists, activeListId } =
    useData();

  const [snippetError, setSnippetError] = useState<string | null>(null);
  const [activeSnippet, setActiveSnippet] = useState<Snippet | null>(null);

  const [mode, setMode] = useState<"read" | "edit">("read");

  const { mutate: favSnippet } = useFavSnippet({});
  const { mutate: editSnippet } = useEditSnippet();

  const toggleFavorite = () => {
    if (activeSnippet) {
      favSnippet({
        snippetId: activeSnippet._id.toString(),
        favorite: !activeSnippet.favorite,
      });
    }
  };

  const handleSnippetEdit = (s: Snippet) => {
    editSnippet(s);
    setMode("read");
  };

  useEffect(() => {
    if (isSuccess) {
      const { valid } = checkListSnippet({
        listId: listId as string,
        snippetId: snippetId as string,
      });

      if (!valid) {
        setSnippetError("Something went wrong");
      } else {
        setSnippetError(null);
        const snippet = snippets?.find(
          (s) =>
            s._id.toString() === snippetId && s.listId.toString() === listId
        );
        snippet && setActiveSnippet(snippet);
      }
    }
  }, [checkListSnippet, isSuccess, listId, snippetId, snippets]);

  if (snippetError) {
    return (
      <>
        <Head>
          <title>
            List: {lists?.find((l) => activeListId === l._id.toString())?.label}{" "}
            - Sniplib
          </title>
          <meta
            name="description"
            content="Could not find a snippet at this url."
          />
        </Head>
        <ErrorMessage>
          <span className="text-red-600">Something went wrong</span>
          <span>Couldn&apos;t find a snippet at this url</span>
        </ErrorMessage>
      </>
    );
  }

  if (!activeSnippet) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Head>
          <title>
            List: {lists?.find((l) => activeListId === l._id.toString())?.label}{" "}
            - SnipLib
          </title>
          <meta name="description" content="Loading current active snippet." />
        </Head>
        <Loader />
      </div>
    );
  }

  return (
    <div>
      {mode === "read" && (
        <>
          <Head>
            <title>{activeSnippet.title} - SnipLib</title>
            <meta
              name="description"
              content="Displaying current active snippet."
            />
          </Head>
          <SnippetReader
            snippet={activeSnippet}
            triggerEditMode={() => setMode("edit")}
            toggleFavorite={toggleFavorite}
          />
        </>
      )}
      {mode === "edit" && (
        <>
          <Head>
            <title>[Edit] {activeSnippet.title} - SnipLib</title>
            <meta
              name="description"
              content="Editing current active snippet."
            />
          </Head>
          <SnippetForm
            snippet={activeSnippet}
            activeListId={activeListId}
            lists={lists || []}
            onCancel={() => setMode("read")}
            onSubmit={handleSnippetEdit}
          />
        </>
      )}
    </div>
  );
};

ListSnippetPage.authRequired = true;
ListSnippetPage.getLayout = (page: React.ReactElement) => {
  return <BarsWrapper mode="list">{page}</BarsWrapper>;
};

export default ListSnippetPage;
