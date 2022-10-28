import { useData } from "@/hooks/useUserData";
import MainBar from "@/components/bars/MainBar";
import ListBar from "@/components/bars/ListBar";
import TagBar from "@/components/bars/TagBar";
import SearchBar from "../bars/SearchBar";
import FavBar from "../bars/FavBar";
import { AnimatePresence } from "framer-motion";

export type BarsFilter = "list" | "tag" | "search" | "fav";

export type BarsWrapperProps = {
  children: React.ReactNode;
  mode: BarsFilter;
};

const BarsWrapper = ({ children, mode }: BarsWrapperProps) => {
  const {
    lists,
    snippets,
    tags,
    activeListId,
    activeSnippetId,
    activeTagLabel,
    activeSearchValue,
    activeBarMode,
    updateSearchValue,
  } = useData();

  return (
    <div className="flex">
      <div className="flex flex-shrink-0 h-screen flex-nowrap">
        <MainBar
          lists={lists}
          snippets={snippets}
          tags={tags}
          activeListId={activeListId}
          activeTagLabel={activeTagLabel}
          activeBarMode={activeBarMode}
          updateSearchValue={updateSearchValue}
        />

        <div className="bg-carbon-500 w-96">
          <AnimatePresence>
            {mode === "list" && (
              <ListBar
                lists={lists}
                snippets={snippets}
                activeListId={activeListId}
                activeSnippetId={activeSnippetId}
              />
            )}
            {mode === "tag" && (
              <TagBar
                tags={tags}
                snippets={snippets}
                activeTagLabel={activeTagLabel}
                activeSnippetId={activeSnippetId}
              />
            )}
            {mode === "search" && (
              <SearchBar
                snippets={snippets}
                activeSearchValue={activeSearchValue}
                activeSnippetId={activeSnippetId}
              />
            )}
            {mode === "fav" && (
              <FavBar
                favSnippets={snippets?.filter((s) => s.favorite)}
                activeSnippetId={activeSnippetId}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex-1 h-screen overflow-auto">
        <div className="min-w-[768px] w-full h-full md:p-16 sm:p-8 xs:p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BarsWrapper;
