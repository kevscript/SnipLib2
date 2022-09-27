import { useData } from "@/hooks/useData";
import { useState } from "react";
import Sidebar from "../Sidebar";
import Snipbar from "../Snipbar";
import ListBar from "../Snipbar/list/ListBar";
import TagBar from "../Snipbar/tag/TagBar";

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
    activeBarMode,
    activateList,
    activateTag,
  } = useData();

  const [searchValue, setSearchValue] = useState("");
  const handleSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="flex w-screen h-screen overflow-x-hidden bg-carbon-700 flex-nowrap">
      <div className="flex flex-shrink-0 flex-nowrap">
        <Sidebar
          lists={lists}
          snippets={snippets}
          tags={tags}
          activeListId={activeListId}
          activeTagLabel={activeTagLabel}
          activeBarMode={activeBarMode}
          searchValue={searchValue}
          handleSearchValue={handleSearchValue}
          activateList={activateList}
          activateTag={activateTag}
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
      </div>
      {children}
    </div>
  );
};

export default BarsWrapper;
