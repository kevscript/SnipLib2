import Snippet from "@/models/Snippet";
import Link from "next/link";

export type SearchSnipItemProps = {
  snippet: Snippet;
  isActive: boolean;
  color: string;
};

const SearchSnipItem = ({ snippet, isActive, color }: SearchSnipItemProps) => {
  return (
    <Link
      href={{
        pathname: `/search/[snippetId]`,
        query: { snippetId: snippet._id.toString() },
      }}
      passHref
    >
      <li
        className={`flex flex-col w-full px-8 pt-6 pb-8 border-b-2 cursor-pointer border-carbon-600 group hover:bg-carbon-400 ${
          isActive ? "bg-carbon-400" : "bg-carbon-500"
        }`}
        key={snippet._id.toString()}
      >
        <span className="font-semibold">{snippet.title}</span>
        <div className="flex mt-3 flex-nowrap">
          <span className={`text-xs capitalize`} style={{ color: color }}>
            {snippet.language}
          </span>
          <ul className="flex ml-4 truncate flex-nowrap gap-x-2">
            <span className="text-xs text-carbon-300">
              {snippet.tags && snippet.tags.map((tag, i) => `#${tag} `)}
            </span>
          </ul>
        </div>
      </li>
    </Link>
  );
};

export default SearchSnipItem;
