import BarsWrapper from "@/components/layouts/BarsWrapper";
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
      <div className="flex flex-col w-full mt-12">
        <h3 className="text-2xl font-bold">{activeSnippet.title}</h3>
        <p className="mt-4">{activeSnippet.description}</p>

        <div className="flex items-center justify-between w-full mt-12">
          <span className="text-sm">{activeSnippet.language}</span>
          <ul className="flex flex-nowrap gap-x-2">
            {activeSnippet.tags &&
              activeSnippet.tags.map((tag, i) => (
                <li
                  key={tag + i}
                  className="flex items-center justify-center px-4 py-1 text-sm bg-black rounded-sm"
                >
                  {tag}
                </li>
              ))}
          </ul>
        </div>

        <pre className="p-8 mt-2 rounded bg-carbon-600 h-96">
          {activeSnippet.content}
        </pre>
        <div className="flex justify-between mt-2 text-sm text-carbon-300">
          {activeSnippet.updatedAt !== activeSnippet.createdAt && (
            <span>
              edited the{" "}
              {new Date(activeSnippet.updatedAt).toLocaleDateString()} at{" "}
              {new Date(activeSnippet.updatedAt).toLocaleTimeString()}
            </span>
          )}

          <span>
            created the {new Date(activeSnippet.updatedAt).toLocaleDateString()}{" "}
            at {new Date(activeSnippet.updatedAt).toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
};

SnippetPage.authRequired = true;
SnippetPage.getLayout = (page: ReactElement) => {
  return <BarsWrapper filter="tag">{page}</BarsWrapper>;
};
export default SnippetPage;
