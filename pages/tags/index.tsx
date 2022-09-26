import BarsWrapper from "@/components/layouts/BarsWrapper";
import { useUserData } from "@/hooks/useUserData";

import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";

const TagsPage = () => {
  const router = useRouter();
  const { data, tags, checkTagsRootPath } = useUserData();

  useEffect(() => {
    if (data && tags && router.isReady) {
      const check = checkTagsRootPath();
      router.replace(check.redirectPath);
    }
  }, [checkTagsRootPath, data, router, tags]);

  return <h1>Tags Page</h1>;
};

TagsPage.authRequired = true;
TagsPage.getLayout = (page: ReactElement) => {
  return <BarsWrapper filter="tag">{page}</BarsWrapper>;
};

export default TagsPage;
