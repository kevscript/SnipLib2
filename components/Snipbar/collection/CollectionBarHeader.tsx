import CrossIcon from "@/components/icons/Cross";
import EditIcon from "@/components/icons/Edit";
import PlusIcon from "@/components/icons/Plus";

export type CollectionBarHeaderProps = {
  label: string;
};

const CollectionBarHeader = ({ label }: CollectionBarHeaderProps) => {
  return (
    <div className="flex flex-col px-8 pb-8">
      <span className="text-xs font-bold uppercase text-carbon-300">
        Collection
      </span>
      <div className="flex justify-between mt-4 flex-nowrap">
        <span className="font-bold">{label}</span>
        <ul className="flex items-center flex-nowrap gap-x-2">
          <li className="flex items-center justify-center w-6 h-6 rounded cursor-pointer bg-carbon-400 group hover:bg-carbon-300">
            <PlusIcon className="w-4 h-4" />
          </li>
          <li className="flex items-center justify-center w-6 h-6 rounded cursor-pointer bg-carbon-400 group hover:bg-carbon-300">
            <EditIcon className="w-3.5 h-3.5" />
          </li>
          <li className="flex items-center justify-center w-6 h-6 rounded cursor-pointer bg-carbon-400 group hover:bg-carbon-300">
            <CrossIcon className="w-4 h-4" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CollectionBarHeader;
