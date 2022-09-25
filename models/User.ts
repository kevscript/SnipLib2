import { ObjectId } from "mongodb";
import * as z from "zod";

const User = z.object({
  _id: z.instanceof(ObjectId),
  name: z.string(),
  email: z.string(),
  image: z.string(),
  emailVerified: z.any(),
});

type User = z.infer<typeof User>;

export default User;
