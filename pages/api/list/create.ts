import { clientPromise } from "@/lib/mongodb";
import List from "@/models/List";
import { UsersData } from "@/models/UserData";
import { ObjectID } from "bson";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getToken({ req, secret });

  if (user) {
    try {
      await clientPromise;
      const newList = {
        ...req.body,
        _id: new ObjectID(req.body._id),
      };
      const valid = List.parse(newList);

      if (valid) {
        const createdList = await UsersData.findOneAndUpdate(
          { userId: new ObjectID(user.id) },
          { $push: { lists: newList } }
        );

        if (createdList) {
          return res.status(200).json(newList);
        } else {
          throw new Error("Something went wrong with list creation");
        }
      } else {
        throw new Error("newList is not a valid List");
      }
    } catch (err: any) {
      console.log("catch block", err);
      throw res.status(500).json(err);
    }
  } else {
    console.log("bad user");
    throw res
      .status(500)
      .json({ error: { message: "User authenticating JWT Token was falsy" } });
  }
};

export default handler;
