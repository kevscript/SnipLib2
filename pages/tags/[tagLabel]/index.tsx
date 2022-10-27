import BarsWrapper from "@/components/layouts/BarsWrapper";
import ErrorMessage from "@/components/messages/ErrorMessage";
import InfoMessage from "@/components/messages/InfoMessage";
import Loader from "@/components/shared/Loader";
import { Tag, useData } from "@/hooks/useUserData";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const TagPage = () => {
  const router = useRouter();
  const { tagLabel } = router.query;
  const { checktTag, isSuccess, tags } = useData();

  const [routerWasCalled, setRouterWasCalled] = useState(false);
  const [activeTag, setActiveTag] = useState<Tag | null>(null);
  const [tagIsEmpty, setTagIsEmpty] = useState(false);
  const [tagError, setTagError] = useState<string | null>(null);

  useEffect(() => {
    if (isSuccess && router.isReady && !routerWasCalled && tags) {
      const { valid, isEmpty, path } = checktTag(tagLabel as string);

      if (!valid) {
        setTagError("This tag does not exist");
      } else {
        setTagError(null);
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
    return (
      <ErrorMessage>
        <span className="text-red-600">
          The following tag doesn&apos;t exists :
        </span>
        <span>`{tagLabel}`</span>
      </ErrorMessage>
    );
  }

  if (tagIsEmpty) {
    return (
      <InfoMessage>
        <span className="text-marine-100">No snippet with the tag:</span>
        <span>`{activeTag?.label}`</span>
      </InfoMessage>
    );
  }

  return (
    <div className="flex items-center justify-center w-full h-full">
      <Loader />
    </div>
  );
};

TagPage.authRequired = true;
TagPage.getLayout = (page: React.ReactElement) => {
  return <BarsWrapper mode="tag">{page}</BarsWrapper>;
};

export default TagPage;
