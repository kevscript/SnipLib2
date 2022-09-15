import { Collection } from "@/mocks/collections";
import ListItem from "./ListItem";

export type CollectionsListProps = {
  collections: Collection[];
  activeId: string;
};

const CollectionsList = ({ collections, activeId }: CollectionsListProps) => {
  return (
    <ul className="flex flex-col justify-start w-full pt-4 overflow-y-auto list-none flex-nowrap scroll-hide overscroll-contain">
      {collections.map((collection, i) => (
        <ListItem
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
