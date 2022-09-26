import { useUserData } from "@/hooks/useUserData";
import React, { useState } from "react";
import FavoriteIcon from "../icons/Favorite";
import FolderIcon from "../icons/Folder";
import TagIcon from "../icons/Tag";
import { BarsFilter } from "../layouts/BarsWrapper";
import Switcher from "../shared/Switcher";
import CreateListWidget from "../widgets/CreateListWidget";
import Authbox from "./Authbox";
import Lists from "./Lists";
import Searchbox from "./Searchbox";
import TagsList from "./TagsList";

export type SidebarProps = {
  filter: BarsFilter;
};

const Sidebar = ({ filter }: SidebarProps) => {
  const { data, tags, activeListId, activeTagLabel } = useUserData();

  const [searchValue, setSearchValue] = useState("");
  const handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="flex flex-col flex-shrink-0 h-screen p-8 overflow-hidden w-96 bg-carbon-600">
      <div className="flex items-center justify-between flex-nowrap">
        <h1 className="text-2xl font-bold uppercase">Sniplib</h1>
        <Switcher />
      </div>

      <Searchbox
        value={searchValue}
        handleValueChange={handleSearchValueChange}
      />

      <div className="flex items-center justify-between mt-8 flex-nowrap">
        <div className="flex items-center flex-nowrap">
          <FavoriteIcon className="w-4 h-4 stroke-marine" />
          <span className="ml-4 text-xs font-bold uppercase">Favorites</span>
        </div>
        <div className="flex justify-center w-6">
          <span className="text-sm">18</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-8 flex-nowrap">
        <div className="flex items-center flex-nowrap">
          <FolderIcon className="w-4 h-4 stroke-marine" />
          <span className="ml-4 text-xs font-bold uppercase">Lists</span>
        </div>
        <div className="flex items-center flex-nowrap">
          {data?.lists && (
            <span className="text-sm text-carbon-300">
              {data.lists.length}/32
            </span>
          )}

          <CreateListWidget />
        </div>
      </div>

      {data?.lists && data?.snippets && (
        <Lists
          lists={data.lists}
          snippets={data.snippets}
          activeListId={filter === "list" ? activeListId : ""}
        />
      )}

      <div className="flex items-center justify-between mt-8 flex-nowrap">
        <div className="flex items-center flex-nowrap">
          <TagIcon className="w-4 h-4 stroke-marine" />
          <span className="ml-4 text-xs font-bold uppercase">Tags</span>
        </div>
      </div>

      {tags && <TagsList tags={tags} activeTagLabel={activeTagLabel} />}

      <Authbox />
    </div>
  );
};

export default Sidebar;
