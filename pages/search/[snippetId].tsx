import DangerIcon from "@/components/icons/Danger";
import BarsWrapper from "@/components/layouts/BarsWrapper";
import Button from "@/components/shared/Button";
import Loader from "@/components/shared/Loader";
import SnippetEditer from "@/components/SnippetEditer";
import SnippetReader from "@/components/SnippetReader";
import useFavSnippet from "@/hooks/useFavSnippet";
import { useData } from "@/hooks/useUserData";
import Snippet from "@/models/Snippet";
import Link from "next/link";
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
    lists,
  } = useData();

  const [routerWasCalled, setRouterWasCalled] = useState(false);
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
    <div className="flex items-center justify-center w-full h-screen p-16">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex items-center p-8 w-[480px] border rounded border-red-900/50 bg-gradient-to-r from-red-600/10 to-carbon-700 gap-x-8 drop-shadow">
          <DangerIcon className="w-8 h-8 fill-transparent stroke-red-600" />
          <div className="flex flex-col gap-y-2">
            <span className="text-red-600">Something went wrong</span>
            <span>Couldn&apos;t find a snippet at this url</span>
          </div>
        </div>
        <Link href={{ pathname: "/lists" }}>
          <Button
            label="Back to main page"
            className="w-48 py-2 mt-8 text-white"
            variety="secondary"
          />
        </Link>
      </div>
    </div>;
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

SearchSnippetPage.authRequired = true;
SearchSnippetPage.getLayout = (page: React.ReactElement) => {
  return <BarsWrapper mode="search">{page}</BarsWrapper>;
};

export default SearchSnippetPage;
