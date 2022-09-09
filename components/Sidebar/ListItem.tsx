import Branch from "./Branch";

export type ListItemProps = {
  first?: boolean;
  label: string;
  amount: number;
  active: boolean;
  handleActive: () => void;
};

const ListItem = ({
  first = false,
  label,
  amount,
  active,
  handleActive,
}: ListItemProps) => {
  return (
    <li
      className="relative flex justify-between flex-shrink-0 h-10 text-sm cursor-pointer flex-nowrap group"
      onClick={handleActive}
    >
      <div className="flex flex-nowrap">
        <Branch short={first} active={active} />
        <span
          className={`ml-4 ${
            active ? "text-white" : "text-carbon-300"
          } group-hover:text-white`}
        >
          {label}
        </span>
      </div>
      <div className="flex justify-center w-6">
        <span
          className={`${
            active ? "text-white" : "text-carbon-300"
          } group-hover:text-white`}
        >
          {amount}
        </span>
      </div>
    </li>
  );
};

export default ListItem;
