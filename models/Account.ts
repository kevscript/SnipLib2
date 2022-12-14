import { db } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import * as z from "zod";

const Account = z.object({
  _id: z.instanceof(ObjectId),
  userId: z.instanceof(ObjectId),
  provider: z.string(),
  type: z.string(),
  providerAccountId: z.string(),
  access_token: z.string(),
  token_type: z.string(),
  scope: z.string(),
});

export type UserAccount = z.infer<typeof Account>;

export const UsersAccounts = db.collection<UserAccount>("accounts");

export default Account;
