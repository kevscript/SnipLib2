import { langList } from "@/utils/langList";
import Snippet from "@/models/Snippet";
import CodeMirror from "./CodeMirror";

export type SnippetProps = {
  snippet: Snippet;
};

const SnippetReadOnly = ({ snippet }: SnippetProps) => {
  return (
    <div className="flex flex-col w-full mt-12">
      <h3 className="text-2xl font-bold">{snippet.title}</h3>
      <p className="mt-4">{snippet.description}</p>

      <div className="flex items-center justify-between w-full mt-12">
        <span className="text-sm">
          {langList.find((l) => l.id === snippet.language)?.label}
        </span>
        <ul className="flex flex-nowrap gap-x-2">
          {snippet.tags &&
            snippet.tags.map((tag, i) => (
              <li
                key={tag + i}
                className="flex items-center justify-center px-4 py-1 text-sm bg-black rounded-sm"
              >
                {tag}
              </li>
            ))}
        </ul>
      </div>

      <CodeMirror doc={snippet.content} lang={snippet.language} readOnly />

      <div className="flex justify-between mt-2 text-sm text-carbon-300">
        {snippet.updatedAt !== snippet.createdAt && (
          <span>
            edited the {new Date(snippet.updatedAt).toLocaleDateString()} at{" "}
            {new Date(snippet.updatedAt).toLocaleTimeString()}
          </span>
        )}

        <span>
          created the {new Date(snippet.updatedAt).toLocaleDateString()} at{" "}
          {new Date(snippet.updatedAt).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};

export default SnippetReadOnly;
