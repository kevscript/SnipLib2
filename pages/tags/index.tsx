import BarsWrapper from "@/components/layouts/BarsWrapper";
import Loader from "@/components/shared/Loader";
import { useData } from "@/hooks/useUserData";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const TagsPage = () => {
  const router = useRouter();
  const { isSuccess, tags, initOriginalList, initDefaultTag } = useData();

  const [routerWasCalled, setRouterWasCalled] = useState(false);

  useEffect(() => {
    if (isSuccess && !routerWasCalled && tags) {
      if (tags && tags.length > 0) {
        const { path: tagPath } = initDefaultTag();
        setRouterWasCalled(true);
        router.replace({ pathname: tagPath });
      } else {
        const { path: listPath } = initOriginalList();
        setRouterWasCalled(true);
        router.replace({ pathname: listPath });
      }
    }
  }, [
    initDefaultTag,
    initOriginalList,
    isSuccess,
    router,
    routerWasCalled,
    tags,
  ]);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <Loader />
    </div>
  );
};

TagsPage.authRequired = true;
TagsPage.getLayout = (page: React.ReactElement) => {
  return <BarsWrapper mode="tag">{page}</BarsWrapper>;
};

export default TagsPage;
