import BarsWrapper from "@/components/layouts/BarsWrapper";
import SnippetReadOnly from "@/components/SnippetReadOnly";
import { useUserData } from "@/hooks/useUserData";
import Snippet from "models/Snippet";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";

const SnippetPage = () => {
  const router = useRouter();
  const { listId, snippetId } = router.query;
  const { data, checkSnippetPathFromList } = useUserData();

  const [activeSnippet, setActiveSnippet] = useState<Snippet | null>(null);

  const [calledPush, setCalledPush] = useState(false);

  useEffect(() => {
    if (data && router.isReady) {
      const check = checkSnippetPathFromList({
        listId: listId as string,
        snippetId: snippetId as string,
      });

      if (!check.valid && !calledPush) {
        router.replace(check.redirectPath);
        setCalledPush(true);
      }

      const snippet = data.snippets.find((s) => s._id.toString() === snippetId);
      snippet && setActiveSnippet(snippet);
    }
  }, [data, listId, snippetId, checkSnippetPathFromList, calledPush, router]);

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
  return <BarsWrapper filter="list">{page}</BarsWrapper>;
};

export default SnippetPage;
