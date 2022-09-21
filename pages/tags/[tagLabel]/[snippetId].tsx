import BarsWrapper from "@/components/layouts/BarsWrapper";
import SnippetReadOnly from "@/components/SnippetReadOnly";
import { useData } from "@/hooks/useData";
import { SnippetType } from "models/Snippet";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";

const SnippetPage = () => {
  const router = useRouter();
  const { snippetId, tagLabel } = router.query;

  const [activeSnippet, setActiveSnippet] = useState<SnippetType | null>(null);

  const { activeSnippetId, snippets, tags, activeTagLabel, checkTagSnippet } =
    useData();

  useEffect(() => {
    if (tags && snippets) {
      if (activeTagLabel === tagLabel && activeSnippetId === snippetId) {
        const activeSnip = snippets.find((s) => s._id === snippetId);
        activeSnip && setActiveSnippet(activeSnip);
      } else {
        checkTagSnippet({
          tagLabel: tagLabel as string,
          snippetId: snippetId as string,
        });
      }
    }
  }, [
    activeSnippetId,
    activeTagLabel,
    checkTagSnippet,
    snippetId,
    snippets,
    tagLabel,
    tags,
  ]);

  if (!activeSnippet) {
    return (
      <div>
        <h1>No snippet</h1>
      </div>
    );
  }

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
  return <BarsWrapper filter="tag">{page}</BarsWrapper>;
};
export default SnippetPage;
