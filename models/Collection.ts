import { Schema, ObjectId } from "mongoose";

export type CollectionType = {
  default: boolean;
  label: string;
  snippetIds: ObjectId[];
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
  },
});

// const Collection = models.Collection || model("Collection", collectionSchema);
