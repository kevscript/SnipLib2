import { useEffect, useState } from "react";
import TagBarHeader from "./TagBarHeader";
import TagSnipItem from "./TagSnipItem";
import { useRouter } from "next/router";
import { tags } from "@/mocks/tags";
import Snippet from "models/Snippet";
import { useUserData } from "@/hooks/useUserData";

const TagBar = () => {
  const router = useRouter();
  const { activeTagLabel, data, activeSnippetId } = useUserData();

  const [activeTagSnippets, setActiveTagSnippets] = useState<Snippet[] | null>(
    null
  );

  useEffect(() => {
    if (data && activeTagLabel && tags) {
      const snippetsWithTag = data.snippets.filter((s) =>
        s.tags?.includes(activeTagLabel)
      );
      setActiveTagSnippets(snippetsWithTag);
    }
  }, [activeTagLabel, data]);

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
                isActive={activeSnippetId === snippet._id.toString()}
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
