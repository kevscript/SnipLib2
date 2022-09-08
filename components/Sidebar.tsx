import Branch from "./Branch";
import FavoriteIcon from "./icons/Favorite";
import FolderIcon from "./icons/Folder";
import MoreIcon from "./icons/More";
import PlusIcon from "./icons/Plus";
import SearchIcon from "./icons/Search";
import TagIcon from "./icons/Tag";
import Switcher from "./shared/Switcher";

const Sidebar = () => {
  return (
    <div className="flex flex-col h-screen p-8 overflow-y-auto w-96 bg-carbon-600">
      <div className="flex items-center justify-between flex-nowrap">
        <h1 className="text-2xl font-bold uppercase">Sniplib</h1>
        <Switcher />
      </div>

      <label htmlFor="searchbox" className="relative mt-8">
        <input
          type="text"
          id="searchbox"
          className="w-full h-12 px-4 border rounded-sm outline-none bg-carbon-700 border-carbon-400 focus:border-carbon-300 peer"
          placeholder="Search"
        />

        <SearchIcon className="absolute w-4 h-4 right-4 top-4 stroke-carbon-300 peer-focus:stroke-white" />
      </label>

      <div className="flex items-center justify-between mt-8 flex-nowrap">
        <div className="flex items-center flex-nowrap">
          <FolderIcon className="w-4 h-4 stroke-marine" />
          <span className="ml-4">Collections</span>
        </div>
        <div className="flex items-center flex-nowrap">
          <span className="text-carbon-300">5/32</span>
          <div className="flex items-center justify-center w-6 h-6 ml-4 rounded cursor-pointer bg-carbon-400 hover:bg-carbon-300">
            <PlusIcon className="w-4 h-4" />
          </div>
        </div>
      </div>

      <ul className="flex flex-col justify-start w-full pt-4 overflow-y-auto list-none flex-nowrap min-h-[180px] scroll-hide">
        <li className="relative flex justify-between flex-shrink-0 h-10 flex-nowrap">
          <div className="flex flex-nowrap">
            <Branch short />
            <span className="ml-4 text-carbon-300">Testing</span>
          </div>
          <div className="flex justify-center w-6">
            <span className="text-carbon-300">18</span>
          </div>
        </li>
        <li className="relative flex justify-between flex-shrink-0 h-10 flex-nowrap">
          <div className="flex flex-nowrap">
            <Branch active />
            <span className="ml-4 text-white">Testing</span>
          </div>
          <div className="flex justify-center w-6">
            <span className="text-white">18</span>
          </div>
        </li>
        <li className="relative flex justify-between flex-shrink-0 h-10 flex-nowrap">
          <div className="flex flex-nowrap">
            <Branch />
            <span className="ml-4 text-carbon-300">Testing</span>
          </div>
          <div className="flex justify-center w-6">
            <span className="text-carbon-300">18</span>
          </div>
        </li>
        <li className="relative flex justify-between flex-shrink-0 h-10 flex-nowrap">
          <div className="flex flex-nowrap">
            <Branch />
            <span className="ml-4 text-carbon-300">Testing</span>
          </div>
          <div className="flex justify-center w-6">
            <span className="text-carbon-300">18</span>
          </div>
        </li>
        <li className="relative flex justify-between flex-shrink-0 h-10 flex-nowrap">
          <div className="flex flex-nowrap">
            <Branch />
            <span className="ml-4 text-carbon-300">Testing</span>
          </div>
          <div className="flex justify-center w-6">
            <span className="text-carbon-300">18</span>
          </div>
        </li>
      </ul>

      <div className="flex items-center justify-between mt-4 flex-nowrap">
        <div className="flex items-center flex-nowrap">
          <FavoriteIcon className="w-4 h-4 stroke-marine" />
          <span className="ml-4">Favorites</span>
        </div>
        <div className="flex justify-center w-6">
          <span>18</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-8 flex-nowrap">
        <div className="flex items-center flex-nowrap">
          <TagIcon className="w-4 h-4 stroke-marine" />
          <span className="ml-4">Tags</span>
        </div>
      </div>

      <ul className="flex flex-col justify-start w-full pt-4 overflow-y-auto list-none flex-nowrap min-h-[180px] scroll-hide">
        <li className="relative flex justify-between flex-shrink-0 h-10 flex-nowrap">
          <div className="flex flex-nowrap">
            <Branch short />
            <span className="ml-4 text-carbon-300">Testing</span>
          </div>
          <div className="flex justify-center w-6">
            <span className="text-carbon-300">18</span>
          </div>
        </li>
        <li className="relative flex justify-between flex-shrink-0 h-10 flex-nowrap">
          <div className="flex flex-nowrap">
            <Branch active />
            <span className="ml-4 text-white">Testing</span>
          </div>
          <div className="flex justify-center w-6">
            <span className="text-white">18</span>
          </div>
        </li>
        <li className="relative flex justify-between flex-shrink-0 h-10 flex-nowrap">
          <div className="flex flex-nowrap">
            <Branch />
            <span className="ml-4 text-carbon-300">Testing</span>
          </div>
          <div className="flex justify-center w-6">
            <span className="text-carbon-300">18</span>
          </div>
        </li>
        <li className="relative flex justify-between flex-shrink-0 h-10 flex-nowrap">
          <div className="flex flex-nowrap">
            <Branch />
            <span className="ml-4 text-carbon-300">Testing</span>
          </div>
          <div className="flex justify-center w-6">
            <span className="text-carbon-300">18</span>
          </div>
        </li>
        <li className="relative flex justify-between flex-shrink-0 h-10 flex-nowrap">
          <div className="flex flex-nowrap">
            <Branch />
            <span className="ml-4 text-carbon-300">Testing</span>
          </div>
          <div className="flex justify-center w-6">
            <span className="text-carbon-300">18</span>
          </div>
        </li>
      </ul>

      <div className="flex items-center justify-between w-full pt-8 mt-auto flex-nowrap">
        <div className="flex flex-nowrap">
          <div className="w-12 h-12 rounded-xl bg-marine"></div>
          <div className="flex flex-col justify-center ml-4">
            <span className="font-bold">kevscript</span>
            <span className="text-xs">kevscript@gmail.com</span>
          </div>
        </div>
        <div className="flex items-center justify-center w-6 h-full cursor-pointer group">
          <MoreIcon className="w-4 stroke-carbon-300 group-hover:stroke-white" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
