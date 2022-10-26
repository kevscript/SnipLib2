import DangerIcon from "@/components/icons/Danger";
import InfoIcon from "@/components/icons/Info";
import BarsWrapper from "@/components/layouts/BarsWrapper";
import Button from "@/components/shared/Button";
import Loader from "@/components/shared/Loader";
import { Tag, useData } from "@/hooks/useUserData";
import Link from "next/link";
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
      <div className="flex items-center justify-center w-full h-screen p-16">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="flex items-center p-8 w-[480px] border rounded border-red-900/50 bg-gradient-to-r from-red-600/10 to-carbon-700 gap-x-8 drop-shadow">
            <DangerIcon className="w-8 h-8 fill-transparent stroke-red-600" />
            <div className="flex flex-col gap-y-2">
              <span className="text-red-600">
                The following tag doesn&apos;t exists :
              </span>
              <span>`{tagLabel}`</span>
            </div>
          </div>
          <Link href={{ pathname: "/lists" }}>
            <Button
              label="Back to main page"
              className="w-48 py-2 mt-8 text-white"
              variety="secondary"
            />
          </Link>
        </div>
      </div>
    );
  }

  if (tagIsEmpty) {
    return (
      <div className="flex items-center justify-center w-full h-screen p-16">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="flex items-center p-8 w-[480px] border rounded border-marine-900/50 bg-gradient-to-r from-marine-600/10 to-carbon-700 gap-x-8 drop-shadow">
            <InfoIcon className="w-8 h-8 fill-transparent stroke-marine-100" />
            <div className="flex flex-col gap-y-2">
              <span className="text-marine-100">No snippet with the tag:</span>
              <span>`{activeTag?.label}`</span>
            </div>
          </div>
          <Link href={{ pathname: "/lists" }}>
            <Button
              label="Back to main page"
              className="w-48 py-2 mt-8 text-white"
              variety="secondary"
            />
          </Link>
        </div>
      </div>
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
