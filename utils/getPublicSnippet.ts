export const getPublicSnippet = async ({
  snippetId,
}: {
  snippetId: string;
}): Promise<any> => {
  const res = await fetch(`/api/snippet/${snippetId}`);
  const data = await res.json();
  if (res.status === 200) {
    return data;
  } else {
    throw new Error(`Something went wrong with publicSnippet`);
  }
};
