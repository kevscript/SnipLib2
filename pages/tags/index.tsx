import BarsWrapper from "@/components/layouts/BarsWrapper";
import { useData } from "@/hooks/useData";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";

const TagsPage = () => {
  const router = useRouter();
  const { status } = useSession();

  const { activeTagLabel, activeSnippetId } = useData();

  useEffect(() => {
    if (activeTagLabel && status === "authenticated") {
      router.push(`/tags/${activeTagLabel}/${activeSnippetId}`);
    }
  }, [activeTagLabel, activeSnippetId, router, status]);

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <h1>Loading from /tags/...</h1>
    </div>
  );
};

TagsPage.authRequired = true;
TagsPage.getLayout = (page: ReactElement) => {
  return <BarsWrapper filter="tag">{page}</BarsWrapper>;
};
export default TagsPage;
