import { useEffect, useState } from "react";
import TagBarHeader from "./TagBarHeader";
import TagSnipItem from "./TagSnipItem";
import { useRouter } from "next/router";
import Snippet from "@/models/Snippet";
import { Tag } from "@/hooks/useData";
import { UserData } from "@/models/UserData";

export type TagBarProps = {
  tags: Tag[] | undefined;
  snippets: UserData["snippets"] | undefined;
  activeTagLabel: string;
  activeSnippetId: string;
};

const TagBar = ({
  tags,
  snippets,
  activeSnippetId,
  activeTagLabel,
}: TagBarProps) => {
  const router = useRouter();

  const [activeTagSnippets, setActiveTagSnippets] = useState<Snippet[] | null>(
    null
  );

  useEffect(() => {
    if (snippets && activeTagLabel && tags) {
      const snippetsWithTag = snippets.filter((s) =>
        s.tags?.includes(activeTagLabel)
      );
      setActiveTagSnippets(snippetsWithTag);
    }
  }, [activeTagLabel, snippets, tags]);

  if (!activeTagLabel) {
    return (
      <div className="flex flex-col flex-shrink-0 h-screen pt-8 overflow-hidden w-96 bg-carbon-500">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-shrink-0 h-screen pt-8 overflow-hidden w-96 bg-carbon-500">
      <TagBarHeader label={activeTagLabel} />
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
    </div>
  );
};

export default TagBar;
