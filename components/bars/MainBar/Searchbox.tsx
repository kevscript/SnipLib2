import SearchIcon from "@/components/icons/Search";
import { useRouter } from "next/router";
import React, { useState } from "react";

export type SearchboxProps = {
  updateSearchValue: (val: string) => void;
};

const Searchbox = ({ updateSearchValue }: SearchboxProps) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const handleSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    if (searchValue.trim()) {
      updateSearchValue(searchValue);
      if (!router.pathname.includes("/search")) {
        router.push("/search");
      }
    }
  };

  const handleKeySearch = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
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
        onKeyDown={(e) => handleKeySearch(e)}
      />

      <button
        className={`absolute top-0 right-0 flex items-center justify-center w-12 h-full`}
        disabled={!searchValue}
        onClick={handleSearch}
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
