import { Collection } from "@/mocks/collections";
import ListItem from "./ListItem";

export type CollectionsListProps = {
  collections: Collection[];
  activeId: string;
  handleActiveCollection: (id: string) => void;
};

const CollectionsList = ({
  collections,
  activeId,
  handleActiveCollection,
}: CollectionsListProps) => {
  return (
    <ul className="flex flex-col justify-start w-full pt-4 overflow-y-auto list-none flex-nowrap min-h-[180px] scroll-hide overscroll-contain">
      {collections.map((collection, i) => (
        <ListItem
          key={collection.id}
          first={i === 0}
          label={collection.label}
          amount={collection.snippets.length}
          active={collection.id === activeId}
          handleActive={() => handleActiveCollection(collection.id)}
        />
      ))}
    </ul>
  );
};

export default CollectionsList;
