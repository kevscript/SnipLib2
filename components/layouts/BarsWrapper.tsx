import Sidebar from "../Sidebar";
import Snipbar from "../Snipbar";

export type BarsFilter = "collection" | "tag" | "search";

export type BarsWrapperProps = {
  children: React.ReactNode;
  filter: BarsFilter;
};

const BarsWrapper = ({ children, filter }: BarsWrapperProps) => {
  return (
    <div className="flex w-screen h-screen overflow-x-hidden bg-carbon-700 flex-nowrap">
      <div className="flex flex-shrink-0 flex-nowrap">
        <Sidebar />
        <Snipbar filter={filter} />
      </div>
      {children}
    </div>
  );
};

export default BarsWrapper;
