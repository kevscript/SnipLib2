import { clientPromise } from "@/lib/mongodb";
import List from "@/models/List";
import { UsersData } from "@/models/UserData";
import { ObjectID } from "bson";
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
    await clientPromise;
    const newList = {
      ...req.body,
      _id: new ObjectID(req.body._id),
    };
    const valid = List.parse(newList);

    if (!valid) {
      throw res
        .status(500)
        .json({ message: "req.body is not a valid List object" });
    }

    const createdList = await UsersData.findOneAndUpdate(
      { userId: new ObjectID(user.id) },
      { $push: { lists: newList } }
    );

    if (!createdList) {
      throw res
        .status(500)
        .json({ message: "Something went wrong with list creation" });
    }

    return res.status(200).json(newList);
  } catch (err: any) {
    throw res.status(500).json(err);
  }
};

export default handler;
