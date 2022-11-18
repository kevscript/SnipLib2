import { clientPromise } from "@/lib/mongodb";
import { UsersData } from "@/models/UserData";
import { ObjectID } from "bson";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await clientPromise;

    const { query } = req;
    const { snippetId } = query as { snippetId: string };

    const data = await UsersData.findOne({
      $and: [
        { "snippets._id": new ObjectID(snippetId) },
        { "snippets.public": true },
      ],
    });

    if (!data) {
      throw new Error(`Could not find a public snippet with id ${snippetId}`);
    }

    const snippet = data.snippets.find((s) => s._id.toString() === snippetId);

    if (!snippet) {
      throw new Error(`Could not find a public snippet with id ${snippetId}`);
    }

    if (snippet.public === false) {
      throw new Error(`This snippet is not public`);
    }

    return res.json(snippet);
  } catch (err: any) {
    throw res.status(500).json({ error: err.message });
  }
};

export default handler;
