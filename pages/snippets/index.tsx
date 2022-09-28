import BarsWrapper from "@/components/layouts/BarsWrapper";
import { useData } from "@/hooks/useData";
import { useRouter } from "next/router";
import { useEffect } from "react";

const SnippetsPage = () => {
  const router = useRouter();
  const { activeSnippetId } = useData();

  useEffect(() => {
    if (activeSnippetId) {
      router.push({
        pathname: "/snippets/[snippetId]",
        query: { snippetId: activeSnippetId },
      });
    }
  }, [activeSnippetId, router]);
  return <h1>Snippets Page</h1>;
};

SnippetsPage.authRequired = true;
SnippetsPage.getLayout = (page: React.ReactElement) => {
  return <BarsWrapper>{page}</BarsWrapper>;
};

export default SnippetsPage;
