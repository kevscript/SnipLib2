import { Schema, model, models } from "mongoose";
import Snippet, { SnippetType } from "./Snippet";

export type CollectionType = {
  label: string;
  snippets: [SnippetType];
};

const collectionSchema = new Schema<CollectionType>({
  label: {
    type: String,
    required: true,
    unique: true,
  },
  snippets: {
    type: [Snippet],
  },
});

const Collection = models.Collection || model("Collection", collectionSchema);

export default Collection;
