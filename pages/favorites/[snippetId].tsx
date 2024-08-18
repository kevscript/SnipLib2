import SnippetForm from "@/components/forms/SnippetForm";
import BarsWrapper from "@/components/layouts/BarsWrapper";
import ErrorMessage from "@/components/messages/ErrorMessage";
import Loader from "@/components/shared/Loader";
import SnippetReader from "@/components/SnippetReadOnly";
import useEditSnippet from "@/hooks/useEditSnippet";
import { useToasts } from "@/hooks/useToasts";
import { useData } from "@/hooks/useUserData";
import Snippet from "@/models/Snippet";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const FavSnippetPage = () => {
  const router = useRouter();
  const { snippetId } = router.query;
  const { isSuccess, snippets, lists, checkFavSnippet, activeListId } =
    useData();

  const [snippetError, setSnippetError] = useState<string | null>(null);
  const [activeSnippet, setActiveSnippet] = useState<Snippet | null>(null);
  const { addToast } = useToasts();

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
        type: "fail",
        title: "Something went wrong",
      });
    },
  });

  const { mutate: favSnippet } = useEditSnippet({
    onQuerySettled: () => router.replace("/favorites"),
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

  const handleSnippetEdit = (snippet: Snippet) => {
    editSnippet({ snippetData: snippet });
    setMode("read");
  };

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
      <div className="flex items-center justify-center w-full h-screen">
        <Head>
          <title>Favorites - SnipLib</title>
          <meta
            name="description"
            content="Could not find a snippet at this url"
          />
        </Head>
        <ErrorMessage>
          <span className="text-red-600">Something went wrong</span>
          <span>Couldn&apos;t find a favorite snippet at this url</span>
        </ErrorMessage>
      </div>
    );
  }

  if (!activeSnippet) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Head>
          <title>Favorites - SnipLib</title>
          <meta name="description" content="Favorite snippets" />
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
              content="Displaying current active snippet"
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
            <meta name="description" content="Editing current active snippet" />
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

FavSnippetPage.authRequired = true;
FavSnippetPage.getLayout = (page: React.ReactElement) => {
  return <BarsWrapper mode="fav">{page}</BarsWrapper>;
};

export default FavSnippetPage;
