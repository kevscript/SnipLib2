import Snippet from "@/models/Snippet";
import { filterMatchingSnippets } from "@/utils/filterMatchingSnippets";
import { snippets } from "@codemirror/lang-javascript";
import { useEffect, useState } from "react";
import SearchBarHeader from "./SearchBarHeader";
import SearchSnipItem from "./SearchSnipItem";

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
    <div className="flex flex-col flex-shrink-0 h-screen pt-8 overflow-hidden w-96 bg-carbon-500">
      <SearchBarHeader searchValue={activeSearchValue} />

      {matchingSnippets === null && <span>Loading snippets...</span>}

      {matchingSnippets && matchingSnippets.length === 0 && (
        <span>No snippet matching {activeSearchValue}</span>
      )}

      {matchingSnippets && matchingSnippets.length > 0 && (
        <ul className="flex flex-col flex-1 overflow-y-auto">
          {matchingSnippets.map((snippet, i) => (
            <SearchSnipItem
              key={snippet._id.toString()}
              snippet={snippet}
              isActive={activeSnippetId === snippet._id.toString()}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
