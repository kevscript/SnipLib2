import BarsWrapper from "@/components/layouts/BarsWrapper";
import { useData } from "@/hooks/useData";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";

const CollectionsPage = () => {
  const router = useRouter();
  const { status } = useSession();

  const { activeCollectionId, activeSnippetId } = useData();

  useEffect(() => {
    if (activeCollectionId && status === "authenticated") {
      router.push(`/collections/${activeCollectionId}/${activeSnippetId}`);
    }
  }, [activeCollectionId, activeSnippetId, router, status]);

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <h1>Loading from /collections/...</h1>
    </div>
  );
};

CollectionsPage.authRequired = true;
CollectionsPage.getLayout = (page: ReactElement) => {
  return <BarsWrapper filter="collection">{page}</BarsWrapper>;
};
export default CollectionsPage;
