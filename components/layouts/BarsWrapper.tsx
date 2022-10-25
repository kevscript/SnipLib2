import { useData } from "@/hooks/useUserData";
import SideBar from "@/components/SideBar";
import ListBar from "@/components/ListBar";
import TagBar from "@/components/TagBar";
import SearchBar from "../SearchBar";
import FavBar from "../FavBar";

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
        <SideBar
          lists={lists}
          snippets={snippets}
          tags={tags}
          activeListId={activeListId}
          activeTagLabel={activeTagLabel}
          activeBarMode={activeBarMode}
          updateSearchValue={updateSearchValue}
        />

        <div className="bg-carbon-400">
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
        </div>
      </div>

      <div className="flex-1 h-screen overflow-auto">{children}</div>
    </div>
  );
};

export default BarsWrapper;
