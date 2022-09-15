import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getToken({ req, secret });

  if (user) {
    try {
      const m = await clientPromise;
      const userData = await m
        .db("sniplib")
        .collection("usersData")
        .findOne({ userId: user.id });

      if (userData) {
        return res.json(userData.collections);
      } else {
        throw res.status(500).json({ error: `user not found` });
      }
    } catch (err: any) {
      throw res.status(500).json({ error: err.message });
    }
  } else {
    throw res.status(500).json({ error: "something wrong with user jwt" });
  }
};

export default handler;
