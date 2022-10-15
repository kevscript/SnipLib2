import { clientPromise } from "@/lib/mongodb";
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
      .json({ error: { message: "User authenticating JWT Token was falsy" } });
  }

  try {
    await clientPromise;

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

    if (deletedSnippet) {
      return res.status(200).json(snippetToDelete);
    } else {
      throw new Error("Something went wrong with snippet deletion");
    }
  } catch (err: any) {
    throw res.status(500).json(err);
  }
};

export default handler;
