import Snippet from "@/models/Snippet";
import Link from "next/link";

export type SnipItemProps = {
  snippet: Snippet;
  isActive: boolean;
  path: string;
  color?: string;
};

const SnipItem = ({ snippet, isActive, path, color }: SnipItemProps) => {
  if (isActive) {
    return (
      <li
        className={`flex flex-shrink-0 overflow-hidden flex-col w-full px-8 py-6 border-b-2 cursor-pointer border-carbon-600 group hover:bg-carbon-400 ${
          isActive ? "bg-carbon-400" : "bg-carbon-500"
        }`}
      >
        <p className="font-semibold">{snippet.title}</p>
        <div className="flex w-full mt-3 flex-nowrap">
          <span
            className={`text-xs capitalize`}
            style={{ color: color || "#fff" }}
          >
            {snippet.language}
          </span>
          {snippet.tags && snippet.tags.length > 0 && (
            <ul className="flex ml-4 truncate flex-nowrap gap-x-2">
              {snippet.tags.map((tag) => (
                <li
                  key={tag}
                  className="text-xs text-carbon-300"
                >{`#${tag}`}</li>
              ))}
            </ul>
          )}
        </div>
      </li>
    );
  }

  return (
    <Link href={path} passHref>
      <li
        className={`flex flex-shrink-0 overflow-hidden flex-col w-full px-8 py-6 border-b-2 cursor-pointer border-carbon-600 group hover:bg-carbon-400 ${
          isActive ? "bg-carbon-400" : "bg-carbon-500"
        }`}
      >
        <span className="font-semibold">{snippet.title}</span>
        <div className="flex w-full mt-3 flex-nowrap">
          <span
            className={`text-xs capitalize`}
            style={{ color: color || "#fff" }}
          >
            {snippet.language}
          </span>
          {snippet.tags && snippet.tags.length > 0 && (
            <ul className="flex ml-4 truncate flex-nowrap gap-x-2">
              {snippet.tags.map((tag) => (
                <li
                  key={tag}
                  className="text-xs text-carbon-300"
                >{`#${tag}`}</li>
              ))}
            </ul>
          )}
        </div>
      </li>
    </Link>
  );
};

export default SnipItem;
