import { Snippet } from "@/mocks/snippets";
import Link from "next/link";

export type TagSnipItemProps = {
  snippet: Snippet;
  isActive: boolean;
  activeTagLabel: string;
};

const TagSnipItem = ({
  snippet,
  isActive,
  activeTagLabel,
}: TagSnipItemProps) => {
  return (
    <Link
      href={{
        pathname: `/tags/[tagLabel]/[snippetId]`,
        query: { tagLabel: activeTagLabel, snippetId: snippet._id },
      }}
      passHref
    >
      <li
        className={`flex flex-col w-full px-8 pt-6 pb-8 border-b-2 cursor-pointer border-carbon-600 group hover:bg-carbon-400 ${
          isActive ? "bg-carbon-400" : "bg-carbon-500"
        }`}
        key={snippet._id}
      >
        <span className="font-semibold">{snippet.title}</span>
        <div className="flex mt-3 flex-nowrap">
          <span className="text-xs text-marine">{snippet.language}</span>
          <ul className="flex items-baseline ml-4 flex-nowrap gap-x-2">
            {snippet.tags.map((tag, i) => (
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

export default TagSnipItem;
