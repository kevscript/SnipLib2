import { useCodeMirror } from "@/hooks/useCodeMirror";
import Snippet from "@/models/Snippet";
import { langList, LanguageIds } from "@/utils/langList";
import timeSince from "@/utils/timeSince";
import Link from "next/link";
import SnippetReaderHeader from "./SnippetReaderHeader";

type SnippetReaderProps = {
  snippet: Snippet;
  triggerEditMode: () => void;
};

const SnippetReader = ({ snippet, triggerEditMode }: SnippetReaderProps) => {
  const { container } = useCodeMirror({
    readOnly: true,
    doc: snippet.content,
    lang: (snippet.language as LanguageIds) || "javascript",
  });

  return (
    <div className="flex-1 p-16 min-w-[640px]">
      <SnippetReaderHeader
        snippet={snippet}
        triggerEditMode={triggerEditMode}
      />
      <div className="flex flex-col w-full mt-12">
        <h3 className="text-2xl font-bold">{snippet.title}</h3>
        <p className="mt-4">{snippet.description}</p>

        <div className="flex items-center justify-between w-full mt-12">
          <div className="flex items-center justify-center px-4 py-1 text-sm rounded-sm bg-carbon-600">
            <span className="text-sm">
              {langList.find((l) => l.id === snippet.language)?.label}
            </span>
          </div>

          <ul className="flex truncate flex-nowrap gap-x-2">
            {snippet.tags &&
              snippet.tags.map((tag, i) => (
                <Link href={`/tags/${tag}`} key={tag + i}>
                  <li
                    key={tag + i}
                    className="flex items-center justify-center px-2 py-1 text-sm transition-all rounded-sm cursor-pointer bg-carbon-600 hover:bg-carbon-400"
                  >
                    #{tag}
                  </li>
                </Link>
              ))}
          </ul>
        </div>

        <div className="mt-2">
          <div className={`w-full overflow-auto rounded bg-carbon-600`}>
            <p className="sr-only">
              The Editor uses Tab key to indent code. If you are focused on the
              editor and want to keep navigating instead of indenting code :
              press Escape, then Tab to move to the field after the editor. Or
              Escape, Shift-Tab to move to the field before the editor.
            </p>
            <div ref={container}></div>
          </div>
        </div>

        <div className="flex justify-between mt-2 text-sm text-carbon-300">
          <span>created {timeSince(new Date(snippet.createdAt))}</span>
          {snippet.updatedAt !== snippet.createdAt && (
            <span>edited {timeSince(new Date(snippet.updatedAt))}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SnippetReader;
