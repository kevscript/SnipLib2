import SidebarWrapper from "@/components/layouts/SidebarWrapper";
import SnipbarWrapper from "@/components/layouts/SnipbarWrapper";
import { useUserData } from "@/hooks/useUserData";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import { NextCustomPage } from "../_app";

const CollectionsPage: NextCustomPage = () => {
  const router = useRouter();
  const { collections, activeCollectionId, activeSnippetId } = useUserData();

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

  return <h1>Collections Page</h1>;
};

CollectionsPage.authRequired = true;
CollectionsPage.getLayout = (page: ReactElement) => {
  return (
    <SidebarWrapper>
      <SnipbarWrapper>{page}</SnipbarWrapper>
    </SidebarWrapper>
  );
};
export default CollectionsPage;
