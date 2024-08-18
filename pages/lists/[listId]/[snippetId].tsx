import BarsWrapper from "@/components/layouts/BarsWrapper";
import Loader from "@/components/shared/Loader";
import { useData } from "@/hooks/useUserData";
import Snippet from "@/models/Snippet";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import SnippetReader from "@/components/SnippetReadOnly";
import ErrorMessage from "@/components/messages/ErrorMessage";
import SnippetForm from "@/components/forms/SnippetForm";
import useEditSnippet from "@/hooks/useEditSnippet";
import Head from "next/head";
import { useToasts } from "@/hooks/useToasts";

const ListSnippetPage = () => {
  const router = useRouter();
  const { listId, snippetId } = router.query;
  const { isSuccess, checkListSnippet, snippets, lists, activeListId } =
    useData();

  const { addToast } = useToasts();

  const [snippetError, setSnippetError] = useState<string | null>(null);
  const [activeSnippet, setActiveSnippet] = useState<Snippet | null>(null);

  const [mode, setMode] = useState<"read" | "edit">("read");

  const { mutate: editSnippet } = useEditSnippet({
    onQuerySuccess: () => {
      addToast({
        id: Date.now(),
        type: "success",
        title: "Snippet was edited",
      });
    },
    onQueryError: () => {
      addToast({
        id: Date.now(),
        type: "success",
        title: "Something went wrong",
      });
    },
  });

  const { mutate: favSnippet } = useEditSnippet({
    onQuerySuccess: () => {
      activeSnippet &&
        addToast({
          id: Date.now(),
          type: "success",
          title: activeSnippet.favorite
            ? "Favorite was removed"
            : "New favorite added",
        });
    },
    onQueryError: () => {
      addToast({
        id: Date.now(),
        type: "fail",
        title: "Something went wrong",
      });
    },
  });

  const { mutate: publicSnippet } = useEditSnippet({
    onQuerySuccess: () => {
      activeSnippet &&
        addToast({
          id: Date.now(),
          type: "success",
          title: activeSnippet.public
            ? "Snippet is private"
            : "Snippet is public",
        });
    },
    onQueryError: () => {
      addToast({
        id: Date.now(),
        type: "fail",
        title: "Something went wrong",
      });
    },
  });

  const onFavoriteToggle = () => {
    if (activeSnippet) {
      favSnippet({
        snippetData: { ...activeSnippet, favorite: !activeSnippet.favorite },
      });
    }
  };

  const onPublicToggle = () => {
    if (activeSnippet) {
      publicSnippet({
        snippetData: { ...activeSnippet, public: !activeSnippet.public },
      });
    }
  };

  const handleSnippetEdit = (snippet: Snippet) => {
    editSnippet({ snippetData: snippet });
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
      <div className="flex items-center justify-center w-full h-screen">
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
      </div>
    );
  }

  if (!activeSnippet) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
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
    <>
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
            onEditToggle={() => setMode("edit")}
            onFavoriteToggle={onFavoriteToggle}
            onPublicToggle={onPublicToggle}
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
    </>
  );
};

ListSnippetPage.authRequired = true;
ListSnippetPage.getLayout = (page: React.ReactElement) => {
  return <BarsWrapper mode="list">{page}</BarsWrapper>;
};

export default ListSnippetPage;
