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

const TagSnippetPage = () => {
  const router = useRouter();
  const { tagLabel, snippetId } = router.query;
  const { isSuccess, snippets, checkTagSnippet, tags, lists, activeListId } =
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
    if (isSuccess && tags) {
      const { valid } = checkTagSnippet({
        tagLabel: tagLabel as string,
        snippetId: snippetId as string,
      });

      if (!valid) {
        setSnippetError("Something went wrong");
      } else {
        setSnippetError(null);
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
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Head>
          <title>Tag: {tagLabel} - Sniplib</title>
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
          <title>Tag: {tagLabel} - Sniplib</title>
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

TagSnippetPage.authRequired = true;
TagSnippetPage.getLayout = (page: React.ReactElement) => {
  return <BarsWrapper mode="tag">{page}</BarsWrapper>;
};

export default TagSnippetPage;
