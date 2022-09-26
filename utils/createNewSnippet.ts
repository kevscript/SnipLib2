import { ObjectID } from "bson";
import Snippet from "models/Snippet";

export const createNewSnippet = (collectionId: string) => {
  return {
    _id: new ObjectID().toString(),
    title: `Test Snippet ${Date.now()}`,
    description: "Im a description",
    content: "console.log('test')",
    language: "javascript",
    favorite: false,
    public: false,
    collectionId: collectionId,
    tags: ["hello", "world"],
  };
};

const s: Snippet = {
  _id: new ObjectID(),
  listId: new ObjectID(),
  title: "Im a title",
  description: "Im a description",
  language: "javascript",
  content: "console.log('hello world')",
  favorite: false,
  public: false,
  createdAt: Date.now(),
  updatedAt: Date.now(),
  tags: ["hello", "world"],
};
