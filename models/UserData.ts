import { Schema, model, models } from "mongoose";
import { CollectionType, collectionSchema } from "./Collection";
import { SnippetType, snippetSchema } from "./Snippet";

export type UserDataType = {
  userId: string;
  collections: CollectionType[];
  snippets: SnippetType[];
};

const userDataSchema = new Schema<UserDataType>({
  userId: String,
  collections: [collectionSchema],
  snippets: [snippetSchema],
});

const UserData = models.UserData || model("UserData", userDataSchema);

export default UserData;
