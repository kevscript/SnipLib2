import Sidebar from "@/components/Sidebar";
import Snipbar from "@/components/Snipbar";
import type { NextPage } from "next";
import { userData } from "@/mocks/userData";
import { useData } from "@/hooks/useData";
import { useEffect } from "react";

const Home: NextPage = () => {
  const { data, handleActiveCollection, handleActiveSnippet, initData } =
    useData();

  useEffect(() => {
    if (!data) {
      initData(userData);
      // set initial active collection and snippet
      const firstCollection =
        userData.collections.length > 0 ? userData.collections[0] : null;
      firstCollection && handleActiveCollection(firstCollection.id);
      firstCollection &&
        firstCollection.snippets?.length > 0 &&
        handleActiveSnippet({
          id: firstCollection.snippets[0].id,
          collectionIdOfSnippet: firstCollection.id,
        });
    }
  }, []);

  if (!userData) return <h1>Loading....</h1>;

  return (
    <div className="flex w-screen h-screen overflow-x-hidden bg-carbon-700 flex-nowrap">
      <Sidebar />
      <Snipbar />
    </div>
  );
};

export default Home;
