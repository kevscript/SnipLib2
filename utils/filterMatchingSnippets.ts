import Snippet from "@/models/Snippet";

export type FilterMatchingSnippetsParams = {
  snippets: Snippet[];
  searchValue: string;
};

export const filterMatchingSnippets = ({
  snippets,
  searchValue,
}: FilterMatchingSnippetsParams) => {
  const matchingSnippets: Snippet[] = [];
  const pattern = searchValue.trim().toLowerCase();

  snippets.forEach((snippet) => {
    const { title, tags, description, content, language } = snippet;
    const sourceText = [title, tags, description, content, language]
      .join(" ")
      .toLowerCase();

    const matches = sourceText.includes(pattern);
    matches && matchingSnippets.push(snippet);
  });

  return matchingSnippets;
};
