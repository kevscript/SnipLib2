import connectMongoose from "@/utils/connectMongoose";
import { ObjectID } from "bson";
import { SnippetType } from "models/Snippet";
import UserData from "models/UserData";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getToken({ req, secret });

  if (user) {
    try {
      await connectMongoose();

      const newSnippet: SnippetType = {
        ...req.body,
        _id: new ObjectID(req.body._iq),
        collectionId: new ObjectID(req.body.collectionId),
      };

      const newData = await UserData.findOneAndUpdate(
        { userId: new ObjectID(user.id) },
        {
          $push: {
            snippets: newSnippet,
            "collections.$[collection].snippetIds": newSnippet._id,
          },
        },
        {
          arrayFilters: [{ "collection._id": newSnippet.collectionId }],
        }
      );

      if (newData) {
        return res.json({ ...newData, _id: newSnippet._id });
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
