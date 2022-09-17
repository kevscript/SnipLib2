import SidebarWrapper from "@/components/layouts/SidebarWrapper";
import SnipbarWrapper from "@/components/layouts/SnipbarWrapper";
import { useUserData } from "@/hooks/useUserData";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { NextCustomPage } from "../../_app";

const CollectionPage: NextCustomPage = () => {
  const router = useRouter();
  const { collections, checkCollectionPath } = useUserData();

  const [pushWasCalled, setPushWasCalled] = useState(false);

  const [collectionIsEmpty, setCollectionIsEmpty] = useState(false);

  useEffect(() => {
    if (collections && router.isReady && !pushWasCalled) {
      const pathData = checkCollectionPath({
        collectionId: router.query.collectionId as string,
      });

      if (pathData.isCorrect) {
        if (pathData.snippetId) {
          router.push(
            `/collections/${pathData.collectionId}/${pathData.snippetId}`
          );
          setPushWasCalled(true);
        } else {
          setCollectionIsEmpty(true);
        }
      } else {
        router.push(
          `/collections/${pathData.collectionId}/${pathData.snippetId}`
        );
        setPushWasCalled(true);
      }
    }
  }, [checkCollectionPath, collections, router, pushWasCalled]);

  if (collectionIsEmpty) return <h1>Collection Is Empty</h1>;

  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
};

CollectionPage.authRequired = true;
CollectionPage.getLayout = (page: ReactElement) => {
  return (
    <SidebarWrapper>
      <SnipbarWrapper>{page}</SnipbarWrapper>
    </SidebarWrapper>
  );
};
export default CollectionPage;
