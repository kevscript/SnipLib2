import { ObjectId } from "mongodb";
import * as z from "zod";
import { db } from "../lib/mongodb";
import List from "./List";
import Snippet from "./Snippet";

export const UserData = z.object({
  _id: z.instanceof(ObjectId),
  userId: z.instanceof(ObjectId),
  lists: z.array(List),
  snippets: z.array(Snippet),
});

export type UserData = z.infer<typeof UserData>;

export const UsersData = db.collection<UserData>("usersData");
