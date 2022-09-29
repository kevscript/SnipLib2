export type SearchBarHeaderProps = {
  searchValue: string;
};

const SearchBarHeader = ({ searchValue }: SearchBarHeaderProps) => {
  return (
    <div className="flex flex-col px-8 pb-8">
      <span className="text-xs font-bold uppercase text-carbon-300">
        Search
      </span>
      <div className="flex justify-between mt-4 flex-nowrap">
        <span className="font-bold">{searchValue}</span>
      </div>
    </div>
  );
};

export default SearchBarHeader;
