import { useData } from "@/hooks/useData";
import React, { useState } from "react";
import FavoriteIcon from "../icons/Favorite";
import FolderIcon from "../icons/Folder";
import PlusIcon from "../icons/Plus";
import TagIcon from "../icons/Tag";
import Switcher from "../shared/Switcher";
import CreateCollectionWidget from "../widgets/CreateCollectionWidget";
import Authbox from "./Authbox";
import CollectionsList from "./CollectionsList";
import Searchbox from "./Searchbox";
import TagsList from "./TagsList";

const Sidebar = () => {
  const { collections, snippets, activeCollectionId, tags, activeTagLabel } =
    useData();

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

          <CreateCollectionWidget />
        </div>
      </div>

      {collections && snippets && (
        <CollectionsList
          collections={collections}
          snippets={snippets}
          activeCollectionId={activeCollectionId}
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
