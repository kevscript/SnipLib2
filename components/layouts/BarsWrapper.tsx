import { useData } from "@/hooks/useData";
import { useState } from "react";
import SideBar from "@/components/SideBar";
import ListBar from "@/components/ListBar";
import TagBar from "@/components/TagBar";
import SearchBar from "../SearchBar";

export type BarsFilter = "list" | "tag" | "search";

export type BarsWrapperProps = {
  children: React.ReactNode;
};

const BarsWrapper = ({ children }: BarsWrapperProps) => {
  const {
    lists,
    snippets,
    tags,
    activeListId,
    activeSnippetId,
    activeTagLabel,
    activeSearchValue,
    activeBarMode,
    activateList,
    activateTag,
    activateSearch,
  } = useData();

  return (
    <div className="flex w-screen h-screen overflow-x-hidden bg-carbon-700 flex-nowrap">
      <div className="flex flex-shrink-0 flex-nowrap">
        <SideBar
          lists={lists}
          snippets={snippets}
          tags={tags}
          activeListId={activeListId}
          activeTagLabel={activeTagLabel}
          activeBarMode={activeBarMode}
          activateList={activateList}
          activateTag={activateTag}
          activateSearch={activateSearch}
        />
        {activeBarMode === "list" && (
          <ListBar
            lists={lists}
            snippets={snippets}
            activeListId={activeListId}
            activeSnippetId={activeSnippetId}
          />
        )}
        {activeBarMode === "tag" && (
          <TagBar
            tags={tags}
            snippets={snippets}
            activeTagLabel={activeTagLabel}
            activeSnippetId={activeSnippetId}
          />
        )}
        {activeBarMode === "search" && (
          <SearchBar
            snippets={snippets}
            activeSearchValue={activeSearchValue}
            activeSnippetId={activeSnippetId}
          />
        )}
      </div>
      {children}
    </div>
  );
};

export default BarsWrapper;
