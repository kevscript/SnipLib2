import SidebarWrapper from "@/components/layouts/SidebarWrapper";
import SnipbarWrapper from "@/components/layouts/SnipbarWrapper";
import { useUserData } from "@/hooks/useUserData";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import { NextCustomPage } from "../_app";

const TagsPage: NextCustomPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { collections, activeTagLabel, activeSnippetId, initializeFromTags } =
    useUserData();

  useEffect(() => {
    if (collections && status === "authenticated") {
      initializeFromTags();
    }
  }, [collections, initializeFromTags, status]);

  useEffect(() => {
    if (activeTagLabel) {
      if (activeSnippetId) {
        router.push(`/tags/${activeTagLabel}/${activeSnippetId}`);
      } else {
        router.push(`/tags/${activeTagLabel}`);
      }
    }
  }, [activeTagLabel, activeSnippetId, router]);

  return <h1>Tags Page</h1>;
};

TagsPage.authRequired = true;
TagsPage.getLayout = (page: ReactElement) => {
  return (
    <SidebarWrapper>
      <SnipbarWrapper filter="tag">{page}</SnipbarWrapper>
    </SidebarWrapper>
  );
};
export default TagsPage;
