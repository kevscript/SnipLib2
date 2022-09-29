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
  const pattern = new RegExp(searchValue.trim().toLowerCase(), "i");

  snippets.forEach((snippet) => {
    const { title, tags, description, content, language } = snippet;
    const sourceText = [title, tags, description, content, language].join(" ");

    const matches = pattern.test(sourceText);
    matches && matchingSnippets.push(snippet);
  });

  return matchingSnippets;
};
