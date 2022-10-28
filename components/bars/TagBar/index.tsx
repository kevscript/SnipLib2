import { useEffect, useState } from "react";
import TagBarHeader from "./TagBarHeader";
import TagSnipItem from "./TagSnipItem";
import { useRouter } from "next/router";
import Snippet from "@/models/Snippet";
import { Tag } from "@/hooks/useUserData";
import { UserData } from "@/models/UserData";
import { langList } from "@/utils/langList";
import { motion } from "framer-motion";

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
      className="flex flex-col flex-shrink-0 h-full pt-8 overflow-hidden w-96 bg-carbon-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      <TagBarHeader label={activeTagLabel} />

      {activeTagSnippets && activeTagSnippets.length > 0 && (
        <ul className="flex flex-col flex-1 overflow-y-auto">
          {activeTagSnippets.map((snippet) => (
            <TagSnipItem
              key={snippet._id.toString()}
              snippet={snippet}
              activeTagLabel={activeTagLabel}
              isActive={activeSnippetId === snippet._id.toString()}
              color={
                langList.find((l) => l.id === snippet.language)?.color || "#FFF"
              }
            />
          ))}
        </ul>
      )}

      {activeTagSnippets && activeTagSnippets.length === 0 && (
        <h1>No snippet yet with this Tag</h1>
      )}
    </motion.div>
  );
};

export default TagBar;
