import PlusIcon from "@/components/icons/Plus";
import DeleteListWidget from "@/components/widgets/DeleteListWidget";
import EditListWidget from "@/components/widgets/EditListWidget";
import List from "models/List";
import Link from "next/link";

export type ListBarHeaderProps = {
  list: List;
};

const ListBarHeader = ({ list }: ListBarHeaderProps) => {
  return (
    <div className="flex flex-col px-8 pb-8">
      <span className="text-xs font-bold uppercase text-carbon-300">List</span>
      <div className="flex justify-between mt-2 flex-nowrap">
        <span className="font-bold">{list.label}</span>
        <ul className="flex items-center flex-nowrap gap-x-2">
          <Link href={{ pathname: "/snippets/create" }}>
            <li className="flex items-center justify-center w-6 h-6 rounded cursor-pointer bg-carbon-400 group hover:bg-marine-500">
              <PlusIcon className="w-4 h-4" />
            </li>
          </Link>
          <EditListWidget list={list} />
          <DeleteListWidget list={list} />
        </ul>
      </div>
    </div>
  );
};

export default ListBarHeader;
