import { CollectionType } from "models/Collection";
import { SnippetType } from "models/Snippet";
import CollectionItem from "./CollectionItem";

export type CollectionsListProps = {
  collections: CollectionType[];
  snippets: SnippetType[];
  activeCollectionId: string;
};

const CollectionsList = ({
  collections,
  activeCollectionId,
  snippets,
}: CollectionsListProps) => {
  return (
    <ul className="flex flex-col justify-start w-full pt-4 overflow-y-auto list-none flex-nowrap scroll-hide overscroll-contain">
      {collections.map((collection, i) => (
        <CollectionItem
          key={collection._id.toString()}
          first={i === 0}
          label={collection.label}
          amount={
            snippets.filter(
              (s) => s.collectionId.toString() === collection._id.toString()
            ).length
          }
          active={collection._id === activeCollectionId}
          collectionId={collection._id.toString()}
        />
      ))}
    </ul>
  );
};

export default CollectionsList;
