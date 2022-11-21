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
    return res
      .status(401)
      .json({ error: "User JWT token authentication failed" });
  }

  await mongoConnect;

  if (req.method === "GET") {
    const userData = await UsersData.findOne(
      { userId: new ObjectID(user.id) },
      { projection: { snippets: 1 } }
    );

    if (!userData?.snippets) {
      return res
        .status(500)
        .json({ error: "Could not find snippets for that user" });
    }

    return res.status(200).json({ snippets: userData.snippets });
  } else if (req.method === "POST") {
    // creating new snippet object
    const newSnippet: Snippet = {
      ...req.body,
      _id: new ObjectID(req.body._id),
      listId: new ObjectID(req.body.listId),
    };

    // validate snippet
    const snippetIsValid = Snippet.parse(newSnippet);
    if (!snippetIsValid) {
      return res.status(500).json({ error: "Snippet is not valid" });
    }

    // creating new snippet
    const createdSnippet = await UsersData.findOneAndUpdate(
      { userId: new ObjectID(user.id) },
      {
        $push: {
          snippets: newSnippet,
          "lists.$[list].snippetIds": newSnippet._id,
        },
      },
      { arrayFilters: [{ "list._id": newSnippet.listId }] }
    );

    if (!createdSnippet) {
      return res
        .status(500)
        .json({ error: "Something went wrong with snippet creation" });
    }

    return res.json({ snippet: newSnippet });
  } else {
    return res.status(405).end();
  }
};

export default handler;
