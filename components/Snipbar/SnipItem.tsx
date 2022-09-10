import { Snippet } from "@/mocks/snippets";

export type SnipItemProps = {
  snippet: Snippet;
  isActive: boolean;
  handleActive: () => void;
};

const SnipItem = ({ snippet, isActive, handleActive }: SnipItemProps) => {
  return (
    <li
      className={`flex flex-col w-full px-8 pt-6 pb-8 border-b-2 cursor-pointer border-carbon-600 group hover:bg-carbon-400 ${
        isActive ? "bg-carbon-400" : "bg-carbon-500"
      }`}
      key={snippet.id}
      onClick={handleActive}
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
  );
};

export default SnipItem;
