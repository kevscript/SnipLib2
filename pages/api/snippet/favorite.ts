import { UsersData } from "@/models/UserData";
import { ObjectID } from "bson";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getToken({ req, secret });

  if (!user) {
    throw new Error("Something went wrong with user authentication");
  }

  try {
    const updatedUserData = await UsersData.findOneAndUpdate(
      {
        userId: new ObjectID(user.id),
      },
      {
        $set: {
          "snippets.$[snippet].favorite": req.body.favorite,
        },
      },
      {
        arrayFilters: [{ "snippet._id": new ObjectID(req.body.snippetId) }],
        returnDocument: "after",
      }
    );

    if (updatedUserData) {
      return res.status(200).json(req.body);
    } else {
      throw new Error("Something went wrong with snippet favorite edition");
    }
  } catch (err: any) {
    throw res.status(500).json(err);
  }
};

export default handler;
