import { Schema, model, models } from "mongoose";
import Collection, { CollectionType } from "./Collection";
import Snippet, { SnippetType } from "./Snippet";

export type UserDataType = {
  userId: string;
  collections: [CollectionType];
  snippets: [SnippetType];
};

const userDataSchema = new Schema<UserDataType>({
  userId: String,
  collections: [Collection],
  snippets: [Snippet],
});

const UserData = models.UserData || model("UserData", userDataSchema);

export default UserData;
