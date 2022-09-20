import { Schema, model, models, Types } from "mongoose";
import { CollectionType, collectionSchema } from "./Collection";
import { SnippetType, snippetSchema } from "./Snippet";

export type UserDataType = {
  _id: Types.ObjectId | string;
  userId: string;
  collections: CollectionType[];
  snippets: SnippetType[];
};

const userDataSchema = new Schema<UserDataType>({
  userId: Schema.Types.ObjectId,
  collections: [collectionSchema],
  snippets: [snippetSchema],
});

const UserData = models.UserData || model("UserData", userDataSchema);

export default UserData;
