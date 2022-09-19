import Snipbar from "../Snipbar";

export type SnipbarFilter = "collection" | "tag" | "search";

export type SnipbarWrapperProps = {
  filter: SnipbarFilter;
  children: React.ReactNode;
};

const SnipbarWrapper = ({ filter, children }: SnipbarWrapperProps) => {
  return (
    <div className="flex w-full flex-nowrap">
      <Snipbar filter={filter} />
      {children}
    </div>
  );
};

export default SnipbarWrapper;
