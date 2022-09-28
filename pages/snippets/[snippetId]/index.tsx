import BarsWrapper from "@/components/layouts/BarsWrapper";
import SnippetReadOnly from "@/components/SnippetReadOnly";
import { useData } from "@/hooks/useData";
import Snippet from "@/models/Snippet";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";

const SnippetPage = () => {
  const router = useRouter();
  const { snippetId } = router.query;
  const { snippets, activateSnippet, activeSnippetId } = useData();

  const [activeSnippet, setActiveSnippet] = useState<Snippet | null>(null);
  const [snippetError, setSnippetError] = useState<string | null>(null);

  useEffect(() => {
    // check url to set activeSnippet
    if (snippetId && snippets) {
      const snippet = snippets.find((s) => s._id.toString() === snippetId);
      if (snippet) {
        activateSnippet(snippetId as string);
        setActiveSnippet(snippet);
      }
    }
  }, [activateSnippet, snippetId, snippets]);

  useEffect(() => {
    // if url check could not set an active snippet, check state for activeSnippetId
    if (!activeSnippet && activeSnippetId && activeSnippetId !== snippetId) {
      router.push({
        pathname: "/snippets/[snippetId]",
        query: { snippetId: activeSnippetId },
      });
    }
  }, [activeSnippetId, router, snippetId, activeSnippet]);

  if (snippetError) {
    return (
      <div>
        <h1>{snippetError}</h1>
      </div>
    );
  }

  if (!activeSnippet) return <h1>Loading snippet...</h1>;

  return (
    <div className="flex-1 p-16">
      <div className="flex justify-between w-full">
        <div className="flex text-xs font-bold gap-x-2">
          <span className="uppercase text-carbon-300">snippet</span>
          <span>/</span>
          <span>{activeSnippet.title}</span>
        </div>
        <div className="flex flex-nowrap gap-x-4">
          <button className="px-4 py-1 text-sm rounded-sm bg-marine">
            snap
          </button>
          <button className="px-4 py-1 text-sm rounded-sm bg-marine">
            edit
          </button>
          <button className="px-4 py-1 text-sm rounded-sm bg-marine">
            delete
          </button>
        </div>
      </div>
      <SnippetReadOnly snippet={activeSnippet} />
    </div>
  );
};

SnippetPage.authRequired = true;
SnippetPage.getLayout = (page: ReactElement) => {
  return <BarsWrapper>{page}</BarsWrapper>;
};

export default SnippetPage;
