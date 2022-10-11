import BarsWrapper from "@/components/layouts/BarsWrapper";
import { Tag, useData } from "@/hooks/useUserData";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const TagPage = () => {
  const router = useRouter();
  const { tagLabel } = router.query;
  const { checktTag, activeTagLabel, isSuccess, tags } = useData();

  const [routerWasCalled, setRouterWasCalled] = useState(false);
  const [activeTag, setActiveTag] = useState<Tag | null>(null);
  const [tagIsEmpty, setTagIsEmpty] = useState(false);
  const [tagError, setTagError] = useState<string | null>(null);

  useEffect(() => {
    if (isSuccess && router.isReady && !routerWasCalled) {
      const { valid, isEmpty, path } = checktTag(tagLabel as string);

      if (!valid) {
        setTagError("This tag does not exist");
      }

      if (path) {
        setRouterWasCalled(true);
        router.replace({ pathname: path });
      }

      const tag = tags?.find((t) => t.label === tagLabel);
      tag && setActiveTag(tag);

      if (isEmpty) {
        setTagIsEmpty(true);
      }
    }
  }, [checktTag, isSuccess, router, routerWasCalled, tagLabel, tags]);

  if (tagError) {
    return <div>ERROR: {tagError}</div>;
  }

  if (tagIsEmpty) {
    return <div>You do not have a snippet yet under #{activeTag?.label}</div>;
  }

  return <div>Loading...last:</div>;
};

TagPage.authRequired = true;
TagPage.getLayout = (page: React.ReactElement) => {
  return <BarsWrapper mode="tag">{page}</BarsWrapper>;
};

export default TagPage;
