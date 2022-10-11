import BarsWrapper from "@/components/layouts/BarsWrapper";
import { useData } from "@/hooks/useUserData";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const TagsPage = () => {
  const router = useRouter();
  const { status } = useSession();
  const { isSuccess, tags, initOriginalList, initDefaultTag } = useData();

  useEffect(() => {
    if (isSuccess && status === "authenticated") {
      if (tags && tags.length > 0) {
        const { path: tagPath } = initDefaultTag();
        router.replace({ pathname: tagPath });
      } else {
        const { path: listPath } = initOriginalList();
        router.replace({ pathname: listPath });
      }
    }
  }, [initDefaultTag, initOriginalList, isSuccess, router, status, tags]);

  return <div>Tags Page</div>;
};

TagsPage.authRequired = true;
TagsPage.getLayout = (page: React.ReactElement) => {
  return <BarsWrapper mode="tag">{page}</BarsWrapper>;
};

export default TagsPage;
