import { BarMode } from "@/hooks/useData";
import { Tag, useUserData } from "@/hooks/useUserData";
import { UserData } from "models/UserData";
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
  activeBarMode: BarMode;
  searchValue: string;
  handleSearchValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  lists: UserData["lists"] | undefined;
  snippets: UserData["snippets"] | undefined;
  tags: Tag[] | undefined;
  activeListId: string;
  activeTagLabel: string;
  activateList: (id: string) => void;
  activateTag: (label: string) => void;
};

const Sidebar = ({
  activeBarMode,
  activeListId,
  activeTagLabel,
  lists,
  snippets,
  tags,
  searchValue,
  handleSearchValue,
  activateList,
  activateTag,
}: SidebarProps) => {
  return (
    <div className="flex flex-col flex-shrink-0 h-screen p-8 overflow-hidden w-96 bg-carbon-600">
      <div className="flex items-center justify-between flex-nowrap">
        <h1 className="text-2xl font-bold uppercase">Sniplib</h1>
        <Switcher />
      </div>

      <Searchbox value={searchValue} handleValueChange={handleSearchValue} />

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
          {lists && (
            <span className="text-sm text-carbon-300">{lists.length}/32</span>
          )}

          <CreateListWidget />
        </div>
      </div>

      {lists && snippets && (
        <Lists
          lists={lists}
          snippets={snippets}
          activeListId={activeBarMode === "list" ? activeListId : ""}
          activateList={activateList}
        />
      )}

      <div className="flex items-center justify-between mt-8 flex-nowrap">
        <div className="flex items-center flex-nowrap">
          <TagIcon className="w-4 h-4 stroke-marine" />
          <span className="ml-4 text-xs font-bold uppercase">Tags</span>
        </div>
      </div>

      {tags && (
        <TagsList
          tags={tags}
          activeTagLabel={activeTagLabel}
          activateTag={activateTag}
        />
      )}

      <Authbox />
    </div>
  );
};

export default Sidebar;
