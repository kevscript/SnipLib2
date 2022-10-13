import Snippet from "@/models/Snippet";
import { LanguageListItem } from "@/utils/langList";
import { MutableRefObject } from "react";

type SnippetBodyProps = {
  snippet: Snippet;
  language: LanguageListItem;
  editorContainer: MutableRefObject<HTMLDivElement | null>;
};

const SnippetBody = ({
  snippet,
  language,
  editorContainer,
}: SnippetBodyProps) => {
  return (
    <div className="flex flex-col w-full mt-12">
      <h3 className="text-2xl font-bold">{snippet.title}</h3>
      <p className="mt-4">{snippet.description}</p>

      <div className="flex items-center justify-between w-full mt-12">
        <div className="flex items-center justify-center px-4 py-1 text-sm rounded-sm bg-carbon-600">
          <span className="text-sm">{language.label}</span>
        </div>

        <ul className="flex flex-nowrap gap-x-2">
          {snippet.tags &&
            snippet.tags.map((tag, i) => (
              <li
                key={tag + i}
                className="flex items-center justify-center px-2 py-1 text-sm transition-all rounded-sm cursor-pointer bg-carbon-600 hover:bg-carbon-400"
              >
                #{tag}
              </li>
            ))}
        </ul>
      </div>

      <div className="mt-2">
        <div className={`w-full overflow-auto rounded bg-carbon-600`}>
          <p className="sr-only">
            The Editor uses Tab key to indent code. If you are focused on the
            editor and want to keep navigating instead of indenting code : press
            Escape, then Tab to move to the field after the editor. Or Escape,
            Shift-Tab to move to the field before the editor.
          </p>
          <div ref={editorContainer}></div>
        </div>
      </div>

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

export default SnippetBody;
