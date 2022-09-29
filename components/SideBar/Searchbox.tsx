import SearchIcon from "@/components/icons/Search";
import { useState } from "react";

export type SearchboxProps = {
  activateSearch: (value: string) => void;
};

const Searchbox = ({ activateSearch }: SearchboxProps) => {
  const [searchValue, setSearchValue] = useState("");
  const handleSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <label htmlFor="searchbox" className="relative mt-8">
      <input
        type="text"
        value={searchValue}
        onChange={handleSearchValue}
        id="searchbox"
        className="w-full h-12 px-4 text-sm border rounded-sm outline-none bg-carbon-700 border-carbon-400 focus:border-carbon-300 peer"
        placeholder="Search"
      />

      <button
        className={`absolute top-0 right-0 flex items-center justify-center w-16 h-full`}
        disabled={!searchValue}
        onClick={() => activateSearch(searchValue)}
      >
        <SearchIcon
          className={`w-4 h-4 right-4 top-4 ${
            searchValue ? "stroke-white" : "stroke-carbon-300"
          }`}
        />
      </button>
    </label>
  );
};

export default Searchbox;
