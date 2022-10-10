import BarsWrapper from "@/components/layouts/BarsWrapper";
import DeleteSnippetWidget from "@/components/widgets/DeleteSnippetWidget";
import { useCodeMirror } from "@/hooks/useCodeMirror";
import { useData } from "@/hooks/useData";
import Snippet from "@/models/Snippet";
import { langList, LanguageIds } from "@/utils/langList";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";

const SnippetPage = () => {
  const router = useRouter();
  const { snippetId } = router.query;
  const { snippets, activateSnippet, activeSnippetId } = useData();

  const [activeSnippet, setActiveSnippet] = useState<Snippet | null>(null);
  const [snippetError, setSnippetError] = useState<string | null>(null);

  const { container, editor } = useCodeMirror({
    readOnly: true,
    doc: activeSnippet?.content,
    lang: (activeSnippet?.language as LanguageIds) || "javascript",
  });

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
          <DeleteSnippetWidget snippet={activeSnippet} />
        </div>
      </div>
      <div className="flex flex-col w-full mt-12">
        <h3 className="text-2xl font-bold">{activeSnippet.title}</h3>
        <p className="mt-4">{activeSnippet.description}</p>

        <div className="flex items-center justify-between w-full mt-12">
          <span className="text-sm">
            {langList.find((l) => l.id === activeSnippet.language)?.label}
          </span>
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

        {editor && (
          <div className="mt-4">
            <div className={`mt-2 w-full overflow-auto rounded bg-carbon-600`}>
              <p className="sr-only">
                The Editor uses Tab key to indent code. If you are focused on
                the editor and want to keep navigating instead of indenting code
                : press Escape, then Tab to move to the field after the editor.
                Or Escape, Shift-Tab to move to the field before the editor.
              </p>
              <div ref={container}></div>
            </div>
          </div>
        )}
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
  return <BarsWrapper>{page}</BarsWrapper>;
};

export default SnippetPage;
