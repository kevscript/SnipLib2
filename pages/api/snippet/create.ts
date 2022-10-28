import { clientPromise } from "@/lib/mongodb";
import { ObjectID } from "bson";
import Snippet from "models/Snippet";
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
    await clientPromise;

    const newSnippet: Snippet = {
      ...req.body,
      _id: new ObjectID(req.body._id),
      listId: new ObjectID(req.body.listId),
    };
    const valid = Snippet.parse(newSnippet);

    if (!valid) {
      throw res
        .status(500)
        .json({ error: { message: "req.body is not a valid Snippet object" } });
    }

    const createdSnippet = await UsersData.findOneAndUpdate(
      { userId: new ObjectID(user.id) },
      {
        $push: {
          snippets: newSnippet,
          "lists.$[list].snippetIds": newSnippet._id,
        },
      },
      {
        arrayFilters: [{ "list._id": newSnippet.listId }],
      }
    );

    if (!createdSnippet) {
      throw res.status(500).json({
        message: "Something went wrong with snippet creation",
      });
    }

    return res.json(newSnippet);
  } catch (err) {
    throw res.status(500).json(err);
  }
};

export default handler;
