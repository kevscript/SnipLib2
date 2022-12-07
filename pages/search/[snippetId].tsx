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

const SearchSnippetPage = () => {
  const router = useRouter();
  const { snippetId } = router.query;
  const {
    isSuccess,
    snippets,
    activeSearchValue,
    initOriginalList,
    checkSearchSnippet,
    activeListId,
    lists,
  } = useData();

  const { addToast } = useToasts();
  const [routerWasCalled, setRouterWasCalled] = useState(false);
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
        type: "fail",
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

  const toggleFavorite = () => {
    if (activeSnippet) {
      favSnippet({
        snippetData: { ...activeSnippet, favorite: !activeSnippet.favorite },
      });
    }
  };

  const togglePublic = () => {
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
    if (isSuccess && !routerWasCalled) {
      if (!activeSearchValue.trim()) {
        const { path: listPath } = initOriginalList();
        setRouterWasCalled(true);
        router.replace({ pathname: listPath });
      }

      const { valid } = checkSearchSnippet({
        searchValue: activeSearchValue,
        snippetId: snippetId as string,
      });

      if (!valid) {
        setSnippetError("Something went wrong");
        setActiveSnippet(null);
      } else {
        const snippet = snippets?.find((s) => s._id.toString() === snippetId);
        setSnippetError(null);
        snippet && setActiveSnippet(snippet);
      }
    }
  }, [
    activeSearchValue,
    checkSearchSnippet,
    initOriginalList,
    isSuccess,
    router,
    routerWasCalled,
    snippetId,
    snippets,
  ]);

  if (snippetError) {
    <div className="flex items-center justify-center w-full h-screen">
      <Head>
        <title>Search: {activeSearchValue} - Sniplib</title>
        <meta name="description" content="Snippets by search value." />
      </Head>
      <ErrorMessage>
        <span className="text-red-600">Something went wrong</span>
        <span>Couldn&apos;t find a snippet at this url</span>
      </ErrorMessage>
      ;
    </div>;
  }

  if (!activeSnippet) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Head>
          <title>Search: {activeSearchValue} - Sniplib</title>
          <meta name="description" content="Snippets by search value." />
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
            <title>{activeSnippet.title} - Sniplib</title>
            <meta name="description" content="Active snippet by search" />
          </Head>
          <SnippetReader
            snippet={activeSnippet}
            triggerEditMode={() => setMode("edit")}
            toggleFavorite={toggleFavorite}
            togglePublic={togglePublic}
          />
        </>
      )}
      {mode === "edit" && (
        <>
          <Head>
            <title>[Edit] {activeSnippet.title} - Sniplib</title>
            <meta name="description" content="Edit active snippet by search" />
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

SearchSnippetPage.authRequired = true;
SearchSnippetPage.getLayout = (page: React.ReactElement) => {
  return <BarsWrapper mode="search">{page}</BarsWrapper>;
};

export default SearchSnippetPage;
