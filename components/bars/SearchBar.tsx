import Snippet from "@/models/Snippet";
import { filterMatchingSnippets } from "@/utils/filterMatchingSnippets";
import { langList } from "@/utils/langList";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Loader from "../shared/Loader";
import BarHeaderWrapper from "./BarHeaderWrapper";
import SnipItem from "./SnipItem";

export type SearchBarProps = {
  activeSearchValue: string;
  snippets: Snippet[] | undefined;
  activeSnippetId: string;
};

const SearchBar = ({
  activeSearchValue,
  snippets,
  activeSnippetId,
}: SearchBarProps) => {
  const [matchingSnippets, setMatchingSnippet] = useState<Snippet[] | null>(
    null
  );

  useEffect(() => {
    if (snippets && activeSearchValue) {
      const filteredSnippets = filterMatchingSnippets({
        searchValue: activeSearchValue,
        snippets: snippets,
      });

      setMatchingSnippet(filteredSnippets);
    }
  }, [activeSearchValue, snippets]);

  return (
    <motion.div
      className="flex flex-col flex-shrink-0 h-screen overflow-hidden w-96 bg-carbon-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <BarHeaderWrapper title="search" label={activeSearchValue} />

      {matchingSnippets === null && (
        <div className="flex items-center justify-start w-full h-16 px-8">
          <Loader />
        </div>
      )}

      {matchingSnippets && matchingSnippets.length === 0 && (
        <div className="w-full p-8 text-sm bg-carbon-400">
          <span>
            No snippet matching &apos;
            <span className="font-bold">{activeSearchValue}</span>&apos;.
          </span>
        </div>
      )}

      {matchingSnippets && matchingSnippets.length > 0 && (
        <ul
          className="flex flex-col flex-1 overflow-y-auto"
          data-cy="active-list"
        >
          {matchingSnippets.map((snippet, i) => (
            <SnipItem
              key={snippet._id.toString()}
              snippet={snippet}
              isActive={activeSnippetId === snippet._id.toString()}
              path={`/search/${snippet._id.toString()}`}
              color={langList.find((l) => l.id === snippet.language)?.color}
            />
          ))}
        </ul>
      )}
    </motion.div>
  );
};

export default SearchBar;
