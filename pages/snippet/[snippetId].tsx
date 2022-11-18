import BarsWrapper from "@/components/layouts/BarsWrapper";
import { useCodeMirror } from "@/hooks/useCodeMirror";
import { usePreferences } from "@/hooks/usePreferences";
import Snippet from "@/models/Snippet";
import { getPublicSnippet } from "@/utils/getPublicSnippet";
import { langList, LanguageIds } from "@/utils/langList";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PublicSnippetPage = () => {
  const router = useRouter();
  const { snippetId } = router.query;
  const { preferences } = usePreferences();
  const [snippet, setSnippet] = useState<Snippet | null>(null);

  const { container } = useCodeMirror({
    readOnly: true,
    doc: snippet ? snippet.content : "",
    preferences: preferences,
    lang: (snippet?.language as LanguageIds) || "javascript",
  });

  const { data, isSuccess, isError, isLoading } = useQuery(
    ["publicSnippet"],
    () => getPublicSnippet({ snippetId: snippetId as string }),
    {
      enabled: snippetId ? true : false,
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  useEffect(() => {
    if (data) {
      setSnippet(data);
    }
  }, [data]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Error</h1>;
  }

  return (
    <div className="page">
      {snippet && (
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
                  <li
                    key={tag + i}
                    className="flex items-center justify-center px-2 py-1 text-sm transition-all rounded-sm bg-carbon-600 hover:bg-carbon-400"
                  >
                    #{tag}
                  </li>
                ))}
            </ul>
          </div>

          <div className="h-full mt-2 overflow-y-auto rounded">
            <p className="sr-only">
              The Editor uses Tab key to indent code. If you are focused on the
              editor and want to keep navigating instead of indenting code :
              press Escape, then Tab to move to the field after the editor. Or
              Escape, Shift-Tab to move to the field before the editor.
            </p>
            <div ref={container} className="w-full h-full"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicSnippetPage;
