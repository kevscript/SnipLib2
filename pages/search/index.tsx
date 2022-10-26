import DangerIcon from "@/components/icons/Danger";
import InfoIcon from "@/components/icons/Info";
import BarsWrapper from "@/components/layouts/BarsWrapper";
import Button from "@/components/shared/Button";
import Loader from "@/components/shared/Loader";
import { useData } from "@/hooks/useUserData";
import Link from "next/link";
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
      <div className="flex items-center justify-center w-full h-screen p-16">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="flex items-center p-8 w-[480px] border rounded border-marine-900/50 bg-gradient-to-r from-marine-600/10 to-carbon-700 gap-x-8 drop-shadow">
            <InfoIcon className="w-8 h-8 fill-transparent stroke-marine-100" />
            <div className="flex flex-col gap-y-2">
              <span className="text-marine-100">
                No snippet matching the search value:
              </span>
              <span>`{activeSearchValue}`</span>
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
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full h-full">
      <Loader />
    </div>
  );
};

SearchPage.authRequired = true;
SearchPage.getLayout = (page: React.ReactElement) => {
  return <BarsWrapper mode="search">{page}</BarsWrapper>;
};

export default SearchPage;
