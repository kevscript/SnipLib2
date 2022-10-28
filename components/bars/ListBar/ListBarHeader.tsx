import PlusIcon from "@/components/icons/Plus";
import DeleteListWidget from "@/components/widgets/DeleteListWidget";
import EditListWidget from "@/components/widgets/EditListWidget";
import List from "@/models/List";
import Link from "next/link";
import IconButton from "../../shared/IconButton";

export type ListBarHeaderProps = {
  list: List;
};

const ListBarHeader = ({ list }: ListBarHeaderProps) => {
  return (
    <div className="flex flex-col px-8 pb-8 border-b-2 border-carbon-600">
      <span className="text-xs font-bold uppercase text-carbon-300">List</span>
      <div className="flex justify-between mt-2 flex-nowrap">
        <span className="font-bold">{list.label}</span>
        <ul className="flex items-center flex-nowrap gap-x-2">
          <Link href={{ pathname: "/snippet/create" }}>
            <div>
              <IconButton
                icon={
                  <PlusIcon className="w-4 h-4 transition-all ease-out group-hover:scale-105" />
                }
                scale="small"
                className="hover:bg-marine-500"
                tooltipId="new-snippet"
                tooltipText="New snippet"
              />
            </div>
          </Link>
          <EditListWidget list={list} />
          {!list.original && <DeleteListWidget list={list} />}
        </ul>
      </div>
    </div>
  );
};

export default ListBarHeader;
