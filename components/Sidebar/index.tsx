import { useUserData } from "@/hooks/useUserData";
import React, { useState } from "react";
import FavoriteIcon from "../icons/Favorite";
import FolderIcon from "../icons/Folder";
import PlusIcon from "../icons/Plus";
import TagIcon from "../icons/Tag";
import Switcher from "../shared/Switcher";
import Authbox from "./Authbox";
import CollectionsList from "./CollectionsList";
import Searchbox from "./Searchbox";
import TagsList from "./TagsList";

const Sidebar = () => {
  const { collections, activeCollectionId } = useUserData();

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
          <span className="ml-4 text-xs font-bold uppercase">Collections</span>
        </div>
        <div className="flex items-center flex-nowrap">
          {collections && (
            <span className="text-sm text-carbon-300">
              {collections.length}/32
            </span>
          )}

          <div className="flex items-center justify-center w-6 h-6 ml-4 rounded cursor-pointer bg-carbon-400 hover:bg-carbon-300">
            <PlusIcon className="w-4 h-4" />
          </div>
        </div>
      </div>

      {collections && (
        <CollectionsList
          collections={collections}
          activeId={activeCollectionId}
        />
      )}

      <div className="flex items-center justify-between mt-8 flex-nowrap">
        <div className="flex items-center flex-nowrap">
          <TagIcon className="w-4 h-4 stroke-marine" />
          <span className="ml-4 text-xs font-bold uppercase">Tags</span>
        </div>
      </div>

      {/* <TagsList
        tags={tags}
        activeTag={activeTagLabel}
        handleActiveTag={handleActiveTag}
      /> */}

      <Authbox />
    </div>
  );
};

export default Sidebar;
