import List from "@/models/List";
import { mockListIds, mockSnippetIds } from "./mockObjectId";

export const mockList: List = {
  _id: mockListIds[0],
  label: "Im a label",
  original: false,
  snippetIds: [...Array(mockSnippetIds.length)].map(
    (_, i) => mockSnippetIds[i]
  ),
};

export const mockLists: List[] = [...Array(5)].map((_, i) => ({
  _id: mockListIds[i],
  label: `${i} - Im a label`,
  original: false,
  snippetIds: [...Array(mockSnippetIds.length)].map(
    (_, i) => mockSnippetIds[i]
  ),
}));
