import { clientPromise } from "@/lib/mongodb";
import { ObjectID } from "bson";
import { UsersData } from "models/UserData";

import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getToken({ req, secret });
  if (user) {
    try {
      await clientPromise;

      const userData = await UsersData.findOne({
        userId: new ObjectID(user.id),
      });

      if (userData) {
        console.log(userData);
        res.json({ userData });
      } else {
        throw res
          .status(500)
          .json({ error: { message: `No data found for user ${user.id}` } });
      }
    } catch (err: any) {
      console.log(err);
      throw res.status(500).json({ error: err });
    }
  } else {
    throw res.status(400).json({ error: { message: "Bad user" } });
  }
};

export default handler;
