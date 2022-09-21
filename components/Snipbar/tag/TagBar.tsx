import { useEffect, useState } from "react";
import { Snippet } from "@/mocks/snippets";
import TagBarHeader from "./TagBarHeader";
import TagSnipItem from "./TagSnipItem";
import { useRouter } from "next/router";
import { useData } from "@/hooks/useData";
import { tags } from "@/mocks/tags";
import { SnippetType } from "models/Snippet";

const TagBar = () => {
  const router = useRouter();
  const { activeTagLabel, snippets, activeSnippetId } = useData();

  const [activeTagSnippets, setActiveTagSnippets] = useState<
    SnippetType[] | null
  >(null);

  useEffect(() => {
    if (snippets && activeTagLabel && tags) {
      const snippetsWithTag = snippets.filter((s) =>
        s.tags?.includes(activeTagLabel)
      );
      setActiveTagSnippets(snippetsWithTag);
    }
  }, [activeTagLabel, snippets]);

  if (!activeTagLabel) {
    return (
      <div className="flex flex-col flex-shrink-0 h-screen pt-8 overflow-hidden w-96 bg-carbon-500">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-shrink-0 h-screen pt-8 overflow-hidden w-96 bg-carbon-500">
      <>
        <TagBarHeader label={router.query.tagLabel as string} />
        <div className="w-full h-[2px] bg-carbon-600"></div>

        {activeTagSnippets && activeTagSnippets.length > 0 && (
          <ul className="flex flex-col flex-1 overflow-y-auto">
            {activeTagSnippets.map((snippet, i) => (
              <TagSnipItem
                key={snippet._id.toString()}
                snippet={snippet}
                activeTagLabel={activeTagLabel}
                isActive={activeSnippetId === snippet._id}
              />
            ))}
          </ul>
        )}

        {activeTagSnippets && activeTagSnippets.length === 0 && (
          <h1>No snippet yet with this Tag</h1>
        )}
      </>
    </div>
  );
};

export default TagBar;
