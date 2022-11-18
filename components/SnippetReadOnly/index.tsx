import { useCodeMirror } from "@/hooks/useCodeMirror";
import { usePreferences } from "@/hooks/usePreferences";
import Snippet from "@/models/Snippet";
import { langList, LanguageIds } from "@/utils/langList";
import timeSince from "@/utils/timeSince";
import { motion } from "framer-motion";
import Link from "next/link";
import SnippetReadOnlyHeader from "./SnippetReadOnlyHeader";

type SnippetReaderProps = {
  snippet: Snippet;
  triggerEditMode: () => void;
  toggleFavorite: () => void;
  togglePublic: () => void;
};

const SnippetReader = ({
  snippet,
  triggerEditMode,
  toggleFavorite,
  togglePublic,
}: SnippetReaderProps) => {
  const { preferences } = usePreferences();
  const { container } = useCodeMirror({
    readOnly: true,
    doc: snippet.content,
    preferences: preferences,
    lang: (snippet.language as LanguageIds) || "javascript",
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="w-full min-w-[640px] flex flex-col h-full"
    >
      <SnippetReadOnlyHeader
        snippet={snippet}
        triggerEditMode={triggerEditMode}
        toggleFavorite={toggleFavorite}
        togglePublic={togglePublic}
      />
      <div className="flex flex-col flex-1 w-full my-8 min-h-[480px] flex-shrink-0">
        <h3 className="text-2xl font-bold">{snippet.title}</h3>
        <p className="mt-4">{snippet.description}</p>

        <div className="flex items-center justify-between w-full mt-8">
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

        <div className="h-full mt-2 overflow-y-auto rounded">
          <p className="sr-only">
            The Editor uses Tab key to indent code. If you are focused on the
            editor and want to keep navigating instead of indenting code : press
            Escape, then Tab to move to the field after the editor. Or Escape,
            Shift-Tab to move to the field before the editor.
          </p>
          <div ref={container} className="w-full h-full"></div>
        </div>

        <div className="flex justify-between mt-2 text-xs text-carbon-300">
          <span>created {timeSince(new Date(snippet.createdAt))}</span>
          {snippet.updatedAt !== snippet.createdAt && (
            <span>edited {timeSince(new Date(snippet.updatedAt))}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SnippetReader;
