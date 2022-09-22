import CrossIcon from "@/components/icons/Cross";
import EditIcon from "@/components/icons/Edit";
import PlusIcon from "@/components/icons/Plus";
import DeleteCollectionWidget from "@/components/widgets/DeleteCollectionWidget";
import EditCollectionWidget from "@/components/widgets/EditCollectionWidget";
import { CollectionType } from "models/Collection";
import Link from "next/link";

export type CollectionBarHeaderProps = {
  collection: CollectionType;
};

const CollectionBarHeader = ({ collection }: CollectionBarHeaderProps) => {
  return (
    <div className="flex flex-col px-8 pb-8">
      <span className="text-xs font-bold uppercase text-carbon-300">
        Collection
      </span>
      <div className="flex justify-between mt-4 flex-nowrap">
        <span className="font-bold">{collection.label}</span>
        <ul className="flex items-center flex-nowrap gap-x-2">
          <Link
            href={{
              pathname: "/collections/[collectionId]/create",
              query: { collectionId: collection._id.toString() },
            }}
          >
            <li className="flex items-center justify-center w-6 h-6 rounded cursor-pointer bg-carbon-400 group hover:bg-marine-500">
              <PlusIcon className="w-4 h-4" />
            </li>
          </Link>
          <EditCollectionWidget collection={collection} />
          <DeleteCollectionWidget collection={collection} />
        </ul>
      </div>
    </div>
  );
};

export default CollectionBarHeader;
