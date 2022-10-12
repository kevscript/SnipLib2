import BarsWrapper from "@/components/layouts/BarsWrapper";
import { useData } from "@/hooks/useUserData";
import { useSession } from "next-auth/react";
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

  return <div>Lists Page</div>;
};

ListsPage.authRequired = true;
ListsPage.getLayout = (page: React.ReactElement) => {
  return <BarsWrapper mode="list">{page}</BarsWrapper>;
};

export default ListsPage;