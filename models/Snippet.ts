import { Schema, Types } from "mongoose";

export type SnippetType = {
  _id: Types.ObjectId | string;
  collectionId: Types.ObjectId | string;
  title: string;
  language: string;
  description: string;
  content: string;
  createdAt: number;
  updatedAt: number;
  favorite: boolean;
  public: boolean;
  tags?: string[];
};

export const snippetSchema = new Schema<SnippetType>({
  collectionId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  language: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Number,
    required: true,
    default: Date.now(),
  },
  updatedAt: {
    type: Number,
    required: true,
    default: Date.now(),
  },
  favorite: {
    type: Boolean,
    required: true,
    default: false,
  },
  public: {
    type: Boolean,
    required: true,
    default: false,
  },
  tags: {
    type: [String],
    default: [],
  },
});
