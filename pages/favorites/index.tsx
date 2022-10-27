import BarsWrapper from "@/components/layouts/BarsWrapper";
import Loader from "@/components/shared/Loader";
import { useData } from "@/hooks/useUserData";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const FavoritesPage = () => {
  const router = useRouter();
  const { isSuccess, initDefaultFavorite } = useData();

  const [favIsEmpty, setFavIsEmpty] = useState(false);
  const [routerWasCalled, setRouterWasCalled] = useState(false);

  useEffect(() => {
    if (isSuccess && router.isReady && !routerWasCalled) {
      const { path, isEmpty } = initDefaultFavorite();
      if (isEmpty) {
        setFavIsEmpty(true);
      } else {
        setRouterWasCalled(true);
        router.replace({ pathname: path });
      }
    }
  }, [initDefaultFavorite, isSuccess, router, routerWasCalled]);

  if (favIsEmpty) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <span className="text-gray-400">
          You do not have a favorite snippet yet
        </span>
      </div>
    );
  }

  <div className="flex items-center justify-center w-full h-full">
    <Loader />
  </div>;
};

FavoritesPage.authRequired = true;
FavoritesPage.getLayout = (page: React.ReactElement) => {
  return <BarsWrapper mode="fav">{page}</BarsWrapper>;
};

export default FavoritesPage;
