import BarsWrapper from "@/components/layouts/BarsWrapper";
import InfoMessage from "@/components/messages/InfoMessage";
import { useData } from "@/hooks/useUserData";
import Head from "next/head";
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
      <div className="flex items-center justify-center w-full h-screen">
        <Head>
          <title>Search: {activeSearchValue} - Sniplib</title>
          <meta name="description" content="Snippets by search value." />
        </Head>
        <InfoMessage>
          <span className="text-marine-100">
            No snippet matching the search value:
          </span>
          <span>`{activeSearchValue}`</span>
        </InfoMessage>
      </div>
    );
  }
};

SearchPage.authRequired = true;
SearchPage.getLayout = (page: React.ReactElement) => {
  return <BarsWrapper mode="search">{page}</BarsWrapper>;
};

export default SearchPage;
