import BarsWrapper from "@/components/layouts/BarsWrapper";
import { useUserData } from "@/hooks/useUserData";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";

const ListPage = () => {
  const router = useRouter();
  const { listId } = router.query;
  const { activeListId, data, checkListPath } = useUserData();

  const [calledPush, setCalledPush] = useState(false);

  useEffect(() => {
    if (data && router.isReady) {
      const check = checkListPath(listId as string);

      if (!check.valid && !calledPush) {
        router.replace(check.redirectPath);
        setCalledPush(true);
      }
    }
  }, [checkListPath, data, listId, calledPush, router]);

  return (
    <div>
      <h1>{activeListId === listId && "The list is active"}</h1>
    </div>
  );
};

ListPage.authRequired = true;
ListPage.getLayout = (page: ReactElement) => {
  return <BarsWrapper filter="list">{page}</BarsWrapper>;
};

export default ListPage;
