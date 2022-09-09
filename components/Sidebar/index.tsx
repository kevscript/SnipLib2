import { collections } from "@/mocks/collections";
import { tags } from "@/mocks/tags";
import { useState } from "react";
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
  const [activeCollectionId, setActiveCollectionId] = useState("");
  const [activeTagLabel, setActiveTagLabel] = useState("");

  const handleActiveCollection = (id: string) => {
    if (id !== activeCollectionId) {
      activeTagLabel && setActiveTagLabel("");
      setActiveCollectionId(id);
    }
  };

  const handleActiveTag = (label: string) => {
    if (label !== activeTagLabel) {
      activeCollectionId && setActiveCollectionId("");
      setActiveTagLabel(label);
    }
  };

  return (
    <div className="flex flex-col h-screen p-8 overflow-y-auto w-96 bg-carbon-600">
      <div className="flex items-center justify-between flex-nowrap">
        <h1 className="text-2xl font-bold uppercase">Sniplib</h1>
        <Switcher />
      </div>

      <Searchbox />

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
          <span className="text-sm text-carbon-300">5/32</span>
          <div className="flex items-center justify-center w-6 h-6 ml-4 rounded cursor-pointer bg-carbon-400 hover:bg-carbon-300">
            <PlusIcon className="w-4 h-4" />
          </div>
        </div>
      </div>

      <CollectionsList
        collections={collections}
        activeId={activeCollectionId}
        handleActiveCollection={handleActiveCollection}
      />

      <div className="flex items-center justify-between mt-8 flex-nowrap">
        <div className="flex items-center flex-nowrap">
          <TagIcon className="w-4 h-4 stroke-marine" />
          <span className="ml-4 text-xs font-bold uppercase">Tags</span>
        </div>
      </div>

      <TagsList
        tags={tags}
        activeTag={activeTagLabel}
        handleActiveTag={handleActiveTag}
      />

      <Authbox />
    </div>
  );
};

export default Sidebar;
