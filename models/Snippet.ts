import { ObjectId } from "mongodb";
import * as z from "zod";

const Snippet = z.object({
  _id: z.instanceof(ObjectId),
  collectionId: z.instanceof(ObjectId),
  title: z.string().min(1),
  language: z.string().min(1),
  description: z.string().default(""),
  content: z.string().min(1),
  createdAt: z.number(),
  updatedAt: z.number(),
  favorite: z.boolean().default(false),
  public: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

type Snippet = z.infer<typeof Snippet>;

export default Snippet;
