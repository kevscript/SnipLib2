import connectMongoose from "@/utils/connectMongoose";
import UserData from "models/UserData";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getToken({ req, secret });

  if (user) {
    try {
      await connectMongoose();

      const userData = await UserData.findOne({ userId: user.id });
      if (userData) {
        return res.json(userData);
      } else {
        throw res
          .status(500)
          .json({ error: { message: `No data found for user ${user.id}` } });
      }
    } catch (err: any) {
      throw res.status(500).json({ error: { message: err.message } });
    }
  } else {
    throw res
      .status(500)
      .json({ error: { message: "User authenticating JWT Token was falsy" } });
  }
};

export default handler;
