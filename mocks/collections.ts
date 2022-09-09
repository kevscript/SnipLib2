import { Snippet, snippets } from "./snippets";

export type Collection = {
  id: string;
  label: string;
  snippets: Snippet[];
};

export const collections: Collection[] = [
  {
    id: "1",
    label: "Testing",
    snippets: [...snippets],
  },
  {
    id: "2",
    label: "authentication",
    snippets: [...snippets.slice(5)],
  },
  {
    id: "3",
    label: "bad takes",
    snippets: [...snippets.slice(2)],
  },
  {
    id: "4",
    label: "Colors",
    snippets: [...snippets],
  },
  {
    id: "5",
    label: "Type checking",
    snippets: [...snippets.slice(4)],
  },
  {
    id: "6",
    label: "SQL",
    snippets: [...snippets],
  },
  {
    id: "7",
    label: "sniplib",
    snippets: [...snippets.slice(4)],
  },
  {
    id: "8",
    label: "Polyfills",
    snippets: [...snippets.slice(2)],
  },
];
