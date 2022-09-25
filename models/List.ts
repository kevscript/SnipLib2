import { ObjectId } from "mongodb";
import * as z from "zod";

const List = z.object({
  _id: z.instanceof(ObjectId),
  label: z.string().min(1).max(40),
  original: z.boolean().default(false),
  snippetIds: z.array(z.instanceof(ObjectId)).default([]),
});

type List = z.infer<typeof List>;

export default List;
