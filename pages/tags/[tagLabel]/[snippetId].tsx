import SnippetForm from "@/components/forms/SnippetForm";
import BarsWrapper from "@/components/layouts/BarsWrapper";
import ErrorMessage from "@/components/messages/ErrorMessage";
import Loader from "@/components/shared/Loader";
import SnippetReader from "@/components/SnippetReadOnly";
import useEditSnippet from "@/hooks/useEditSnippet";
import useFavSnippet from "@/hooks/useFavSnippet";
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
      <>
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
      </>
    );
  }

  if (!activeSnippet) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Head>
          <title>Tag: {tagLabel} - Sniplib</title>
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

TagSnippetPage.authRequired = true;
TagSnippetPage.getLayout = (page: React.ReactElement) => {
  return <BarsWrapper mode="tag">{page}</BarsWrapper>;
};

export default TagSnippetPage;
