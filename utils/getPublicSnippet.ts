import Snippet from "@/models/Snippet";

export const getPublicSnippet = async ({
  snippetId,
}: {
  snippetId: string;
}): Promise<{ snippet: Snippet }> => {
  const res = await fetch(`/api/public/snippet/${snippetId}`);
  const data = await res.json();
  if (res.status === 200) {
    return data;
  } else {
    throw new Error(`Something went wrong with publicSnippet`);
  }
};
