import "../styles/globals.css";
import type { AppProps } from "next/app";
import { dataContext, useDataProvider } from "@/hooks/useData";
import Sidebar from "@/components/Sidebar";
import { useEffect } from "react";
import { userData } from "@/mocks/userData";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  const {
    data,
    initData,
    handleActiveCollection,
    handleActiveSnippet,
    ...restData
  } = useDataProvider();

  useEffect(() => {
    if (!data) {
      initData(userData);
      // set initial active collection and snippet
      const firstCollection =
        userData.collections.length > 0 ? userData.collections[0] : null;

      if (firstCollection) {
        handleActiveCollection(firstCollection.id);

        if (firstCollection.snippets?.length > 0) {
          handleActiveSnippet({
            id: firstCollection.snippets[0].id,
            collectionIdOfSnippet: firstCollection.id,
          });
        }

        router.push(`/collection/${firstCollection.id}`);
      }
    }
  });

  if (!data) {
    return (
      <div className="flex w-screen h-screen overflow-x-hidden bg-carbon-700 flex-nowrap">
        <h1>Loading skeleton.....</h1>
      </div>
    );
  }

  return (
    <SessionProvider session={session}>
      <dataContext.Provider
        value={{
          data,
          initData,
          handleActiveCollection,
          handleActiveSnippet,
          ...restData,
        }}
      >
        <div className="flex w-screen h-screen overflow-x-hidden bg-carbon-700 flex-nowrap">
          <Sidebar />
          <Component {...pageProps} />
        </div>
      </dataContext.Provider>
    </SessionProvider>
  );
}

export default MyApp;
