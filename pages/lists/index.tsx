import BarsWrapper from "@/components/layouts/BarsWrapper";
import Loader from "@/components/shared/Loader";
import { useData } from "@/hooks/useUserData";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ListsPage = () => {
  const router = useRouter();
  const { status } = useSession();
  const { isSuccess, initOriginalList } = useData();

  useEffect(() => {
    if (isSuccess && status === "authenticated" && router.isReady) {
      const { path } = initOriginalList();
      router.replace({ pathname: path });
    }
  }, [initOriginalList, router, status, isSuccess]);

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Head>
        <title>Lists - Sniplib</title>
        <meta name="description" content="Snippets by list" />
      </Head>
      <Loader />
    </div>
  );
};

ListsPage.authRequired = true;
ListsPage.getLayout = (page: React.ReactElement) => {
  return <BarsWrapper mode="list">{page}</BarsWrapper>;
};

export default ListsPage;
