import Snippet from "@/models/Snippet";
import Link from "next/link";

export type ListSnipItemProps = {
  snippet: Snippet;
  isActive: boolean;
  listId: string;
};

const ListSnipItem = ({ snippet, isActive, listId }: ListSnipItemProps) => {
  return (
    <Link
      href={{
        pathname: `/lists/[listId]/[snippetId]`,
        query: {
          listId: listId,
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
          <span className="text-xs capitalize text-marine">
            {snippet.language}
          </span>
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

export default ListSnipItem;
