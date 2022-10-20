import { useData } from "@/hooks/useUserData";
import SideBar from "@/components/SideBar";
import ListBar from "@/components/ListBar";
import TagBar from "@/components/TagBar";
import SearchBar from "../SearchBar";

export type BarsFilter = "list" | "tag" | "search";

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
      </div>

      <div className="flex-1 h-screen overflow-auto">{children}</div>
    </div>
  );
};

export default BarsWrapper;
