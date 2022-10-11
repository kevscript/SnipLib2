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
    <div className="flex">
      <div className="flex flex-shrink-0 h-screen overflow-hidden flex-nowrap">
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
        <div className="h-full w-96">
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
      </div>

      <div className="flex-1 h-screen overflow-auto ">{children}</div>
    </div>
  );
};

export default BarsWrapper;
