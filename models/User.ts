import { db } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import * as z from "zod";

const User = z.object({
  _id: z.instanceof(ObjectId),
  name: z.string(),
  email: z.string(),
  image: z.string(),
  emailVerified: z.any(),
});

export type User = z.infer<typeof User>;

export const Users = db.collection<User>("users");

export default User;
