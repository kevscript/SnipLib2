import { Collection } from "@/mocks/collections";
import CollectionItem from "./CollectionItem";

export type CollectionsListProps = {
  collections: Collection[];
  activeId: string;
};

const CollectionsList = ({ collections, activeId }: CollectionsListProps) => {
  return (
    <ul className="flex flex-col justify-start w-full pt-4 overflow-y-auto list-none flex-nowrap scroll-hide overscroll-contain">
      {collections.map((collection, i) => (
        <CollectionItem
          key={collection._id}
          first={i === 0}
          label={collection.label}
          amount={collection.snippets.length}
          active={collection._id === activeId}
          collectionId={collection._id}
        />
      ))}
    </ul>
  );
};

export default CollectionsList;
