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
  mode?: BarsFilter;
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
    <div className="flex h-screen overflow-x-auto">
      <div
        className={`sticky top-0 z-50 flex-shrink-0 h-screen flex-nowrap flex`}
      >
        <MainBar
          lists={lists}
          snippets={snippets}
          tags={tags}
          activeListId={activeListId}
          activeTagLabel={activeTagLabel}
          activeBarMode={activeBarMode}
          updateSearchValue={updateSearchValue}
        />

        <div className={`${mode && "bg-carbon-500"}`}>
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

      {/* <div className={mode ? "page ml-[44rem]" : "page ml-80"}>{children}</div> */}
      <div className={mode ? "page" : "page"}>{children}</div>
    </div>
  );
};

export default BarsWrapper;
