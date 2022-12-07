import CopyIcon from "@/components/icons/Copy";
import ErrorMessage from "@/components/messages/ErrorMessage";
import Button from "@/components/shared/Button";
import IconButton from "@/components/shared/IconButton";
import Loader from "@/components/shared/Loader";
import SnipLogo from "@/components/shared/SnipLogo";
import { useCodeMirror } from "@/hooks/useCodeMirror";
import { usePreferences } from "@/hooks/usePreferences";
import { useToasts } from "@/hooks/useToasts";
import Snippet from "@/models/Snippet";
import { getPublicSnippet } from "@/utils/getPublicSnippet";
import { langList, LanguageIds } from "@/utils/langList";
import timeSince from "@/utils/timeSince";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PublicSnippetPage = () => {
  const { status } = useSession();
  const router = useRouter();
  const { snippetId } = router.query;
  const { preferences } = usePreferences();
  const [snippet, setSnippet] = useState<Snippet | null>(null);
  const { addToast } = useToasts();

  const { container } = useCodeMirror({
    readOnly: true,
    doc: snippet ? snippet.content : "",
    preferences: preferences,
    lang: (snippet?.language as LanguageIds) || "javascript",
  });

  const { data, isError } = useQuery(
    ["publicSnippet", snippetId],
    ({ queryKey }) => getPublicSnippet({ snippetId: queryKey[1] as string }),
    {
      enabled: snippetId ? true : false,
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  useEffect(() => data && setSnippet(data.snippet), [data]);

  if (isError) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Head>
          <title>Error - Sniplib</title>
          <meta name="description" content="Public snippet error" />
        </Head>
        <ErrorMessage>
          <span className="text-red-600">
            Can&apos;t find a snippet at this URL.
          </span>
        </ErrorMessage>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="w-full h-screen overflow-auto"
    >
      <Head>
        <title>{snippet && `${snippet.title} - SnipLib`}</title>
        <meta name="description" content="Public snippet" />
      </Head>
      <div className="w-[1440px] mx-auto max-w-[90%] pt-8 pb-16">
        <div className="flex justify-between flex-nowrap">
          <Link href="/">
            <div>
              <SnipLogo stage={2} />
            </div>
          </Link>
          <div className="flex items-center gap-x-4">
            {snippet && (
              <IconButton
                onClick={() => {
                  navigator.clipboard.writeText(snippet.content);
                  addToast({
                    id: Date.now(),
                    type: "neutral",
                    title: "Copied to clipboard",
                  });
                }}
                icon={
                  <CopyIcon className="w-4 h-4 transition-all ease-out group-hover:stroke-marine-50" />
                }
                tooltipId="copy"
                tooltipText="Copy snippet"
              />
            )}
            {status === "unauthenticated" && (
              <Button
                label="Sign in with GitHub"
                onClick={() => signIn("github")}
              />
            )}
          </div>
        </div>

        {!snippet && (
          <div className="flex items-center justify-center w-full mt-16">
            <Loader />
          </div>
        )}

        {snippet && (
          <div className="flex flex-col mt-16">
            <h3 className="text-2xl font-bold">{snippet.title}</h3>
            <p className="mt-4">{snippet.description}</p>

            <div className="flex items-center justify-between w-full mt-8">
              <div className="flex items-center justify-center px-4 py-1 text-sm rounded-sm bg-carbon-500">
                <span className="text-sm">
                  {langList.find((l) => l.id === snippet.language)?.label}
                </span>
              </div>

              <ul className="flex truncate flex-nowrap gap-x-2">
                {snippet.tags &&
                  snippet.tags.map((tag, i) => (
                    <li
                      key={tag + i}
                      className="flex items-center justify-center px-2 py-1 text-sm rounded-sm bg-carbon-500"
                    >
                      #{tag}
                    </li>
                  ))}
              </ul>
            </div>

            <div className="h-full mt-2 overflow-y-auto rounded">
              <p className="sr-only">
                The Editor uses Tab key to indent code. If you are focused on
                the editor and want to keep navigating instead of indenting code
                : press Escape, then Tab to move to the field after the editor.
                Or Escape, Shift-Tab to move to the field before the editor.
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
        )}
      </div>
    </motion.div>
  );
};

export default PublicSnippetPage;
