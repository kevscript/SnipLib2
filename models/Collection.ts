import { Schema, Types } from "mongoose";

export type CollectionType = {
  _id: Types.ObjectId | string;
  default: boolean;
  label: string;
  snippetIds: Array<Types.ObjectId | string>;
};

export const collectionSchema = new Schema<CollectionType>({
  default: {
    type: Boolean,
    required: true,
    default: false,
  },
  label: {
    type: String,
    required: true,
    unique: true,
  },
  snippetIds: {
    type: [Schema.Types.ObjectId],
    required: true,
    default: [],
  },
});

// const Collection = models.Collection || model("Collection", collectionSchema);
