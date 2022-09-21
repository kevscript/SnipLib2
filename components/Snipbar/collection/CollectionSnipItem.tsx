import { Snippet } from "@/mocks/snippets";
import { SnippetType } from "models/Snippet";
import Link from "next/link";

export type CollectionSnipItemProps = {
  snippet: SnippetType;
  isActive: boolean;
  collectionId: string;
};

const CollectionSnipItem = ({
  snippet,
  isActive,
  collectionId,
}: CollectionSnipItemProps) => {
  return (
    <Link
      href={{
        pathname: `/collections/[collectionId]/[snippetId]`,
        query: {
          collectionId: collectionId,
          snippetId: snippet._id.toString(),
        },
      }}
      passHref
    >
      <li
        className={`flex flex-col w-full px-8 py-6 border-b-2 cursor-pointer border-carbon-600 group hover:bg-carbon-400 ${
          isActive ? "bg-carbon-400" : "bg-carbon-500"
        }`}
        key={snippet._id.toString()}
      >
        <span className="font-semibold">{snippet.title}</span>
        <div className="flex mt-3 flex-nowrap">
          <span className="text-xs text-marine">{snippet.language}</span>
          <ul className="flex items-baseline ml-4 flex-nowrap gap-x-2">
            {snippet.tags &&
              snippet.tags.map((tag, i) => (
                <li className="text-xs text-carbon-300" key={i + tag}>
                  #{tag}
                </li>
              ))}
          </ul>
        </div>
      </li>
    </Link>
  );
};

export default CollectionSnipItem;
