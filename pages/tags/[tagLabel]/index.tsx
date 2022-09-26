import BarsWrapper from "@/components/layouts/BarsWrapper";
import { useUserData } from "@/hooks/useUserData";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";

const TagPage = () => {
  const router = useRouter();
  const { tagLabel } = router.query;
  const { data, tags, checkTagPath } = useUserData();

  const [calledPush, setCalledPush] = useState(false);

  useEffect(() => {
    if (data && tags && router.isReady) {
      const check = checkTagPath(tagLabel as string);

      if (!check.valid && !calledPush) {
        router.replace(check.redirectPath);
        setCalledPush(true);
      }
    }
  }, [calledPush, checkTagPath, data, router, tagLabel, tags]);

  return <h1>Tag Page</h1>;
};

TagPage.authRequired = true;
TagPage.getLayout = (page: ReactElement) => {
  return <BarsWrapper filter="tag">{page}</BarsWrapper>;
};

export default TagPage;
