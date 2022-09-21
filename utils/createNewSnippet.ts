import { ObjectID } from "bson";

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
