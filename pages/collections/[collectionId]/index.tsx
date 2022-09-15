import SidebarWrapper from "@/components/layouts/SidebarWrapper";
import SnipbarWrapper from "@/components/layouts/SnipbarWrapper";
import { useUserData } from "@/hooks/useUserData";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import { NextCustomPage } from "../../_app";

const CollectionPage: NextCustomPage = () => {
  const router = useRouter();
  const { collections, initSnippet, activeCollectionId, activeSnippetId } =
    useUserData();

  useEffect(() => {
    if (collections && router) {
      initSnippet({
        snippetId: null,
        collectionId: router.query.collectionId as string,
      });
    }
  }, [collections, initSnippet, router]);

  useEffect(() => {
    if (collections && router) {
      if (activeCollectionId) {
        if (activeSnippetId) {
          router.push(`/collections/${activeCollectionId}/${activeSnippetId}`);
        } else {
          router.push(`/collections/${activeCollectionId}`);
        }
      }
    }
  }, [activeCollectionId, activeSnippetId, collections, router]);

  return (
    <div>
      <h1>Collection id: {router.query.collectionId}</h1>
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
