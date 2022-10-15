import { clientPromise } from "@/lib/mongodb";
import { ObjectID } from "bson";
import Snippet from "models/Snippet";
import { UsersData } from "models/UserData";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getToken({ req, secret });

  if (user) {
    try {
      await clientPromise;

      const newSnippet: Snippet = {
        ...req.body,
        _id: new ObjectID(req.body._id),
        listId: new ObjectID(req.body.listId),
      };
      const valid = Snippet.parse(newSnippet);

      if (valid) {
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

        if (createdSnippet) {
          console.log("created new snippet", newSnippet);
          return res.json(newSnippet);
        } else {
          throw res.status(500).json({
            error: { message: "Something went wrong with snippet creation" },
          });
        }
      } else {
        throw res
          .status(500)
          .json({ error: { message: "Req.query is not a valid Snippet" } });
      }
    } catch (err) {
      throw res.status(500).json({ error: err });
    }
  } else {
    throw res
      .status(500)
      .json({ error: { message: "User authenticating JWT Token was falsy" } });
  }
};

export default handler;
