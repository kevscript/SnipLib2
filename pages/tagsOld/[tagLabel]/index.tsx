import SidebarWrapper from "@/components/layouts/SidebarWrapper";
import SnipbarWrapper from "@/components/layouts/SnipbarWrapper";
import { useUserData } from "@/hooks/useUserData";
import { NextCustomPage } from "@/pages/_app";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";

const TagPage: NextCustomPage = () => {
  const router = useRouter();

  const { tags, checkTagPath } = useUserData();

  const [pushWasCalled, setPushWasCalled] = useState(false);

  useEffect(() => {
    if (tags && router.isReady && !pushWasCalled) {
      const pathData = checkTagPath({
        tagLabel: router.query.tagLabel as string,
      });

      if (pathData.isCorrect) {
        if (pathData.snippetId) {
          router.push(`/tags/${pathData.tagLabel}/${pathData.snippetId}`);
          setPushWasCalled(true);
        }
      } else {
        router.push(
          `/collections/${pathData.collectionId}/${pathData.snippetId}`
        );
        setPushWasCalled(true);
      }
    }
  }, [checkTagPath, tags, router, pushWasCalled]);

  return <h1>Loading tag {router.query.tagLabel}...</h1>;
};

TagPage.authRequired = true;
TagPage.getLayout = (page: ReactElement) => {
  return (
    <SidebarWrapper>
      <SnipbarWrapper filter="tag">{page}</SnipbarWrapper>
    </SidebarWrapper>
  );
};
export default TagPage;
