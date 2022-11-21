import { mongoConnect } from "@/lib/mongodb";
import { ObjectID } from "bson";
import { UsersData } from "models/UserData";

import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getToken({ req, secret });

  if (!user) {
    throw res
      .status(500)
      .json({ message: "User JWT token authentication failed" });
  }

  try {
    await mongoConnect;

    const userData = await UsersData.findOne({
      userId: new ObjectID(user.id),
    });

    if (!userData) {
      throw res
        .status(500)
        .json({ message: `No data found for user ${user.id}` });
    }

    res.json({ ...userData });
  } catch (err: any) {
    throw res.status(500).json(err);
  }
};

export default handler;
