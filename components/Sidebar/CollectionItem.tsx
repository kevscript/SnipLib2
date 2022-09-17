import Link from "next/link";
import Branch from "./Branch";

export type CollectionItemProps = {
  first?: boolean;
  label: string;
  amount: number;
  active: boolean;
  collectionId: string;
};

const ListItem = ({
  first = false,
  label,
  amount,
  active,
  collectionId,
}: CollectionItemProps) => {
  return (
    <Link href={`/collections/${collectionId}`} passHref>
      <li className="relative flex justify-between flex-shrink-0 h-10 text-sm cursor-pointer flex-nowrap group">
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
    </Link>
  );
};

export default ListItem;
