import { mongoConnect } from "@/lib/mongodb";
import Snippet from "@/models/Snippet";
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
    await mongoConnect;

    const snippetToDelete: Snippet = {
      ...req.body,
      _id: new ObjectID(req.body._id),
      listId: new ObjectID(req.body.listId),
    };

    const deletedSnippet = await UsersData.findOneAndUpdate(
      {
        userId: new ObjectID(user.id),
      },
      {
        $pull: {
          snippets: { _id: snippetToDelete._id },
          "lists.$[list].snippetIds": snippetToDelete._id,
        },
      },
      {
        arrayFilters: [{ "list._id": snippetToDelete.listId }],
        returnDocument: "after",
      }
    );

    if (!deletedSnippet) {
      throw res
        .status(500)
        .json({ message: "Something went wrong with snippet deletion" });
    }

    return res.status(200).json(snippetToDelete);
  } catch (err: any) {
    throw res.status(500).json(err);
  }
};

export default handler;
