import Snippet from "@/models/Snippet";
import { langList } from "@/utils/langList";
import Link from "next/link";

type FavBarProps = {
  favSnippets: Snippet[] | undefined;
  activeSnippetId: string;
};

const FavBar = ({ favSnippets, activeSnippetId }: FavBarProps) => {
  return (
    <div className="flex flex-col flex-shrink-0 h-full pt-8 overflow-hidden w-96 bg-carbon-500">
      <div className="flex flex-col px-8 pb-8 border-b-2 border-carbon-600">
        <span className="text-xs font-bold text-white uppercase">
          Favorites
        </span>
      </div>
      {favSnippets && favSnippets.length > 0 && (
        <ul className="flex flex-col flex-1 overflow-y-auto">
          {favSnippets.map((snippet) => (
            <Link
              key={snippet._id.toString()}
              href={{
                pathname: `/favorites/[snippetId]`,
                query: {
                  snippetId: snippet._id.toString(),
                },
              }}
              passHref
            >
              <li
                className={`flex overflow-hidden flex-col w-full px-8 pt-6 pb-8 border-b-2 cursor-pointer border-carbon-600 group hover:bg-carbon-400 ${
                  activeSnippetId === snippet._id.toString()
                    ? "bg-carbon-400"
                    : "bg-carbon-500"
                }`}
                key={snippet._id.toString()}
              >
                <span className="font-semibold">{snippet.title}</span>
                <div className="flex mt-3 flex-nowrap">
                  <span
                    className={`text-xs capitalize`}
                    style={{
                      color:
                        langList.find((l) => l.id === snippet.language)
                          ?.color || "#FFF",
                    }}
                  >
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
          ))}
        </ul>
      )}

      {favSnippets && favSnippets.length === 0 && (
        <h1>No favorite snippets yet</h1>
      )}
    </div>
  );
};

export default FavBar;
