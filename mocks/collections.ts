import { Snippet, snippets } from "./snippets";

export type Collection = {
  _id: any;
  label: string;
  snippets: Snippet[];
};

export const collections: Collection[] = [
  {
    _id: "1",
    label: "Testing",
    snippets: [...snippets],
  },
  {
    _id: "2",
    label: "authentication",
    snippets: [...snippets.slice(5)],
  },
  {
    _id: "3",
    label: "bad takes",
    snippets: [...snippets.slice(2)],
  },
  {
    _id: "4",
    label: "Colors",
    snippets: [...snippets],
  },
  {
    _id: "5",
    label: "Type checking",
    snippets: [...snippets.slice(4)],
  },
  {
    _id: "6",
    label: "SQL",
    snippets: [...snippets],
  },
  {
    _id: "7",
    label: "sniplib",
    snippets: [...snippets.slice(4)],
  },
  {
    _id: "8",
    label: "Polyfills",
    snippets: [...snippets.slice(2)],
  },
];
