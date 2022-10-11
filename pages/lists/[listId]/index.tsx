import { useData } from "@/hooks/useUserData";
import List from "@/models/List";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ListPage = () => {
  const router = useRouter();
  const { listId } = router.query;
  const { checkList, activeListId, isSuccess, lists } = useData();

  const [activeList, setActiveList] = useState<List | null>(null);
  const [listError, setListError] = useState<string | null>(null);
  const [listIsEmpty, setListIsEmpty] = useState(false);
  const [routerWasCalled, setRouterWasCalled] = useState(false);

  useEffect(() => {
    if (isSuccess && router.isReady && !routerWasCalled) {
      const { valid, isEmpty, path } = checkList(listId as string);

      if (!valid) {
        setListError("This list does not exist");
      }

      if (path) {
        setRouterWasCalled(true);
        router.replace({ pathname: path });
      }

      const list = lists?.find((l) => l._id.toString() === listId);
      list && setActiveList(list);

      if (isEmpty) {
        setListIsEmpty(true);
      }
    }
  }, [
    activeListId,
    setRouterWasCalled,
    checkList,
    isSuccess,
    listId,
    lists,
    router,
    routerWasCalled,
  ]);

  if (listError) {
    return <div>ERROR: {listError}</div>;
  }

  if (listIsEmpty) {
    return <div>You do not have a snippet yet in {activeList?.label}</div>;
  }

  return <div>Loading...</div>;
};

export default ListPage;
