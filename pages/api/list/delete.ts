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

      const listToDelete: List = {
        ...req.body,
        _id: new ObjectID(req.body._id),
      };

      if (listToDelete.original) {
        throw new Error("Deleting the original list is forbidden");
      }

      const deletedList = await UsersData.findOneAndUpdate(
        {
          userId: new ObjectID(user.id),
        },
        {
          $pull: {
            lists: { _id: listToDelete._id },
            snippets: { listId: listToDelete._id },
          },
        },
        { returnDocument: "after" }
      );

      if (deletedList) {
        return res.status(200).json(listToDelete);
      } else {
        throw new Error("Something went wrong with list deletion");
      }
    } catch (err: any) {
      throw res.status(500).json(err);
    }
  } else {
    throw res
      .status(500)
      .json({ error: { message: "User authenticating JWT Token was falsy" } });
  }
};

export default handler;
