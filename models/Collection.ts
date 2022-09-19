import { Schema, ObjectId } from "mongoose";

export type CollectionType = {
  label: string;
  snippetIds: ObjectId[];
};

export const collectionSchema = new Schema<CollectionType>({
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
