import { useEffect, useState } from "react";
import Snippet from "@/models/Snippet";
import { Tag } from "@/hooks/useUserData";
import { UserData } from "@/models/UserData";
import { langList } from "@/utils/langList";
import { motion } from "framer-motion";
import SnipItem from "./SnipItem";
import BarHeaderWrapper from "./BarHeaderWrapper";

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
  const [activeTagSnippets, setActiveTagSnippets] = useState<Snippet[] | null>(
    null
  );

  useEffect(() => {
    if (snippets && activeTagLabel && tags) {
      const snippetsWithTag = snippets
        .filter((s) => s.tags?.includes(activeTagLabel))
        .sort((a, b) => (a.title > b.title ? 1 : -1));
      snippetsWithTag && setActiveTagSnippets(snippetsWithTag);
    }
  }, [activeTagLabel, snippets, tags]);

  if (!activeTagLabel) {
    return null;
  }

  return (
    <motion.div
      className="flex flex-col flex-shrink-0 h-screen overflow-hidden w-96 bg-carbon-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <BarHeaderWrapper title="tag" label={`#${activeTagLabel}`} />

      {activeTagSnippets && activeTagSnippets.length > 0 && (
        <ul
          className="flex flex-col flex-1 overflow-y-auto"
          data-cy="active-list"
        >
          {activeTagSnippets.map((snippet) => (
            <SnipItem
              key={snippet._id.toString()}
              snippet={snippet}
              isActive={activeSnippetId === snippet._id.toString()}
              path={`/tags/${activeTagLabel}/${snippet._id.toString()}`}
              color={langList.find((l) => l.id === snippet.language)?.color}
            />
          ))}
        </ul>
      )}

      {activeTagSnippets && activeTagSnippets.length === 0 && (
        <div className="w-full p-8 text-sm bg-carbon-400">
          <span>No snippet yet with the tag &apos;{activeTagLabel}&apos;</span>
        </div>
      )}
    </motion.div>
  );
};

export default TagBar;
