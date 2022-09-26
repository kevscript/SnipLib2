import BarsWrapper from "@/components/layouts/BarsWrapper";
import { useUserData } from "@/hooks/useUserData";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { NextCustomPage } from "../_app";

const ListsPage: NextCustomPage = () => {
  const router = useRouter();
  const { activeListId, data, initState, checkListsRoutePath } = useUserData();

  const [listErrorMessage, setListErrorMessage] = useState("");

  useEffect(() => {
    console.log("/lists")
    if (data && router.isReady) {
      const check = checkListsRoutePath();

      if (check.valid) {
        router.push(check.redirectPath);
      } else {
        setListErrorMessage("No original List");
      }
    }
  }, [checkListsRoutePath, data, router]);

  return (
    <div>
      <h3>Lists Page</h3>
      {listErrorMessage && <h1>{listErrorMessage}</h1>}
    </div>
  );
};

ListsPage.authRequired = true;
ListsPage.getLayout = (page: ReactElement) => {
  return <BarsWrapper filter="list">{page}</BarsWrapper>;
};

export default ListsPage;
