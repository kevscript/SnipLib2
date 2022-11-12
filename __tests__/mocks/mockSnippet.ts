import Snippet from "@/models/Snippet";
import { mockListIds, mockSnippetIds } from "./mockObjectId";

export const mockSnippet: Snippet = {
  _id: mockSnippetIds[0],
  listId: mockListIds[0],
  title: "Color Formatter",
  description: "formatting a color",
  content: "console.log('magic')",
  tags: ["abc", "purple"],
  favorite: false,
  language: "javascript",
  public: false,
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

export const mockSnippets: Snippet[] = [...Array(mockSnippetIds.length)].map(
  (_, i) => ({
    _id: mockSnippetIds[i],
    listId: mockListIds[0],
    title: `${i} - Color Formatter`,
    description: "formatting a color",
    content: "console.log('magic')",
    tags: ["abc", "purple"],
    favorite: false,
    language: "javascript",
    public: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  })
);
