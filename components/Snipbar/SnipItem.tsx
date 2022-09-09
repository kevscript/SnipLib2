import { Snippet } from "@/mocks/snippets";

export type SnipItemProps = {
  snippet: Snippet;
};

const SnipItem = ({ snippet }: SnipItemProps) => {
  return (
    <li
      className="flex flex-col w-full px-8 pt-6 pb-8 border-b-2 cursor-pointer border-carbon-600 group bg-carbon-500 hover:bg-carbon-400"
      key={snippet.id}
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
