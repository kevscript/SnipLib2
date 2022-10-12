import BarsWrapper from "@/components/layouts/BarsWrapper";
import Loader from "@/components/shared/Loader";
import { useData } from "@/hooks/useUserData";
import Snippet from "@/models/Snippet";
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
  } = useData();

  const [routerWasCalled, setRouterWasCalled] = useState(false);
  const [snippetError, setSnippetError] = useState<string | null>(null);
  const [activeSnippet, setActiveSnippet] = useState<Snippet | null>(null);

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
    return <div>ERROR: {snippetError}</div>;
  }

  if (activeSnippet) {
    return <div>Active snippet: {activeSnippet.title}</div>;
  }

  return (
    <div className="flex items-center justify-center w-full h-full">
      <Loader />
    </div>
  );
};

SearchSnippetPage.authRequired = true;
SearchSnippetPage.getLayout = (page: React.ReactElement) => {
  return <BarsWrapper mode="search">{page}</BarsWrapper>;
};

export default SearchSnippetPage;
