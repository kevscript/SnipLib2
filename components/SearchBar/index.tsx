import Snippet from "@/models/Snippet";
import { filterMatchingSnippets } from "@/utils/filterMatchingSnippets";
import { useEffect, useState } from "react";
import Loader from "../shared/Loader";
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
    <div className="flex flex-col flex-shrink-0 h-full pt-8 overflow-hidden w-96 bg-carbon-500">
      <SearchBarHeader searchValue={activeSearchValue} />

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
