import Link from "next/link";
import Branch from "./Branch";

export type TagItemProps = {
  first?: boolean;
  label: string;
  amount: number;
  active: boolean;
};

const TagItem = ({ first, active, label, amount }: TagItemProps) => {
  if (active) {
    return (
      <li className="relative flex justify-between flex-shrink-0 h-10 text-sm cursor-pointer flex-nowrap group">
        <div className="flex flex-nowrap">
          <Branch short={first} active={active} />
          <span
            className={`ml-4 ${
              active ? "text-white" : "text-carbon-300"
            } group-hover:text-white`}
          >
            {"#" + label}
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
  }

  return (
    <Link href={`/tags/${label}`} passHref>
      <li className="relative flex justify-between flex-shrink-0 h-10 text-sm cursor-pointer flex-nowrap group">
        <div className="flex flex-nowrap">
          <Branch short={first} active={active} />
          <span
            className={`ml-4 ${
              active ? "text-white" : "text-carbon-300"
            } group-hover:text-white`}
          >
            {"#" + label}
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
    </Link>
  );
};

export default TagItem;
