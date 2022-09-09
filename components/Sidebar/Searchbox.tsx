import SearchIcon from "../icons/Search";

export type SearchboxProps = {
  value: string;
  handleValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Searchbox = ({ value, handleValueChange }: SearchboxProps) => {
  return (
    <label htmlFor="searchbox" className="relative mt-8">
      <input
        type="text"
        value={value}
        onChange={handleValueChange}
        id="searchbox"
        className="w-full h-12 px-4 text-sm border rounded-sm outline-none bg-carbon-700 border-carbon-400 focus:border-carbon-300 peer"
        placeholder="Search"
      />

      <SearchIcon className="absolute w-4 h-4 right-4 top-4 stroke-carbon-300 peer-focus:stroke-white" />
    </label>
  );
};

export default Searchbox;
