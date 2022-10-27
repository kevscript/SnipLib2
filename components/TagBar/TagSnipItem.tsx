import Snippet from "@/models/Snippet";
import Link from "next/link";

export type TagSnipItemProps = {
  snippet: Snippet;
  isActive: boolean;
  activeTagLabel: string;
  color: string;
};

const TagSnipItem = ({
  snippet,
  isActive,
  activeTagLabel,
  color,
}: TagSnipItemProps) => {
  return (
    <Link
      href={{
        pathname: `/tags/[tagLabel]/[snippetId]`,
        query: { tagLabel: activeTagLabel, snippetId: snippet._id.toString() },
      }}
      passHref
    >
      <li
        className={`flex overflow-hidden flex-col w-full px-8 py-6 border-b-2 cursor-pointer border-carbon-600 group hover:bg-carbon-400 ${
          isActive ? "bg-carbon-400" : "bg-carbon-500"
        }`}
        key={snippet._id.toString()}
      >
        <span className="font-semibold">{snippet.title}</span>
        <div className="flex w-full mt-3 flex-nowrap">
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

export default TagSnipItem;
