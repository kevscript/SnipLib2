import BarsWrapper from "@/components/layouts/BarsWrapper";
import { useData } from "@/hooks/useUserData";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SearchPage = () => {
  const router = useRouter();
  const { isSuccess, activeSearchValue, initOriginalList, checkSearch } =
    useData();

  const [routerWasCalled, setRouterWasCalled] = useState(false);
  const [hasNoMatch, setHasNoMatch] = useState(false);

  useEffect(() => {
    if (isSuccess && !routerWasCalled) {
      if (!activeSearchValue.trim()) {
        const { path: listPath } = initOriginalList();

        setRouterWasCalled(true);
        router.replace({ pathname: listPath });
      }

      const { hasMatches, path: snippetPath } = checkSearch(activeSearchValue);

      if (hasMatches === false) {
        setHasNoMatch(true);
      }

      if (snippetPath) {
        setRouterWasCalled(true);
        router.replace({ pathname: snippetPath });
      }
    }
  }, [
    activeSearchValue,
    checkSearch,
    initOriginalList,
    isSuccess,
    router,
    routerWasCalled,
  ]);

  if (hasNoMatch) {
    return (
      <div>
        No snippet matches the following search :{" "}
        <span className="font-bold">{activeSearchValue}</span>
      </div>
    );
  }

  return <div>Search Page</div>;
};

SearchPage.authRequired = true;
SearchPage.getLayout = (page: React.ReactElement) => {
  return <BarsWrapper mode="search">{page}</BarsWrapper>;
};

export default SearchPage;