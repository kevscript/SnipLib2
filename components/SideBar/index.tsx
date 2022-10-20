import { BarMode, Tag } from "@/hooks/useUserData";
import { UserData } from "models/UserData";
import React from "react";
import FavoriteIcon from "@/components/icons/Favorite";
import FolderIcon from "@/components/icons/Folder";
import TagIcon from "@/components/icons/Tag";
import Switcher from "@/components/shared/Switcher";
import CreateListWidget from "@/components/widgets/CreateListWidget";
import Authbox from "./Authbox";
import Lists from "./Lists";
import Searchbox from "./Searchbox";
import TagsList from "./TagsList";

export type SideBarProps = {
  activeBarMode: BarMode;
  lists: UserData["lists"] | undefined;
  snippets: UserData["snippets"] | undefined;
  tags: Tag[] | undefined;
  activeListId: string;
  activeTagLabel: string;
  updateSearchValue: (val: string) => void;
};

const SideBar = ({
  activeBarMode,
  activeListId,
  activeTagLabel,
  lists,
  snippets,
  tags,
  updateSearchValue,
}: SideBarProps) => {
  return (
    <div className="flex flex-col h-full p-8 overflow-auto w-80 bg-carbon-600">
      <div className="flex items-center justify-between flex-nowrap">
        <h1 className="text-2xl font-bold uppercase">Sniplib</h1>
        <Switcher />
      </div>

      <Searchbox updateSearchValue={updateSearchValue} />

      <div className="flex-1 mt-8 overflow-y-auto">
        <div className="flex items-center justify-between flex-nowrap">
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
            activeTagLabel={activeBarMode === "tag" ? activeTagLabel : ""}
          />
        )}
      </div>

      <Authbox />
    </div>
  );
};

export default SideBar;
