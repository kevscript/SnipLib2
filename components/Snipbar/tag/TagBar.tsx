import { useEffect, useState } from "react";
import { useUserData } from "@/hooks/useUserData";
import { Snippet } from "@/mocks/snippets";
import TagBarHeader from "./TagBarHeader";
import TagSnipItem from "./TagSnipItem";
import { useRouter } from "next/router";

const TagBar = () => {
  const router = useRouter();
  const { activeTagLabel, collections, activeSnippetId } = useUserData();

  const [snippetsList, setSnippetsList] = useState<Snippet[]>([]);

  useEffect(() => {
    if (collections && router.isReady) {
      const snippetsWithTag: Snippet[] = [];

      collections.forEach((col) => {
        col.snippets.forEach((snip) => {
          snip.tags.includes(router.query.tagLabel as string) &&
            snippetsWithTag.push(snip);
        });
      });

      setSnippetsList(snippetsWithTag);
    }
  }, [collections, router]);

  if (snippetsList.length === 0) {
    return (
      <div className="flex flex-col flex-shrink-0 h-screen pt-8 overflow-hidden w-96 bg-carbon-500">
        <h1>No snippets with tag {router.query.tagLabel}</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-shrink-0 h-screen pt-8 overflow-hidden w-96 bg-carbon-500">
      <>
        <TagBarHeader label={router.query.tagLabel as string} />
        <div className="w-full h-[2px] bg-carbon-600"></div>

        {snippetsList.length > 0 ? (
          <ul className="flex flex-col flex-1 overflow-y-auto">
            {snippetsList.map((snippet, i) => (
              <TagSnipItem
                key={snippet._id}
                snippet={snippet}
                activeTagLabel={router.query.tagLabel as string}
                isActive={activeSnippetId === snippet._id}
              />
            ))}
          </ul>
        ) : (
          <div className="bg-red">
            <span>No snippet yet in this collection</span>
          </div>
        )}
      </>
    </div>
  );
};

export default TagBar;
