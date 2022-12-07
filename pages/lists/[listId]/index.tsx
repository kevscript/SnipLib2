import BarsWrapper from "@/components/layouts/BarsWrapper";
import ErrorMessage from "@/components/messages/ErrorMessage";
import Button from "@/components/shared/Button";
import { useData } from "@/hooks/useUserData";
import List from "@/models/List";
import Head from "next/head";
import Link from "next/link";
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
      setListIsEmpty(false);
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
  }, [checkList, isSuccess, listId, lists, router, routerWasCalled]);

  if (listError) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Head>
          <title>List: {activeList?.label || ""} - Sniplib</title>
          <meta name="description" content="Snippets by list." />
        </Head>
        <ErrorMessage>
          <span className="text-red-600">{listError}</span>
        </ErrorMessage>
      </div>
    );
  }

  if (listIsEmpty) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Head>
          <title>List: {activeList?.label || ""} - Sniplib</title>
          <meta name="description" content="Snippets by list." />
        </Head>
        <div className="flex flex-col items-center justify-center gap-y-8">
          <p>
            The `
            <span className="font-bold text-marine-100">
              {activeList?.label}
            </span>
            ` list is empty.
          </p>

          <Link href={{ pathname: "/snippet/create" }}>
            <div>
              <Button label="Add a snippet" className="w-48 py-2 text-white" />
            </div>
          </Link>
        </div>
      </div>
    );
  }
};

ListPage.authRequired = true;
ListPage.getLayout = (page: React.ReactElement) => {
  return <BarsWrapper mode="list">{page}</BarsWrapper>;
};

export default ListPage;
