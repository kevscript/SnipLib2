import BarsWrapper from "@/components/layouts/BarsWrapper";
import { useData } from "@/hooks/useUserData";
import Head from "next/head";
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
      <div className="flex items-center justify-center w-full h-screen">
        <Head>
          <title>Favorites - SnipLib</title>
          <meta name="description" content="Favorite snippets" />
        </Head>
        <span className="text-gray-400">
          You do not have a favorite snippet yet.
        </span>
      </div>
    );
  }
};

FavoritesPage.authRequired = true;
FavoritesPage.getLayout = (page: React.ReactElement) => {
  return <BarsWrapper mode="fav">{page}</BarsWrapper>;
};

export default FavoritesPage;
