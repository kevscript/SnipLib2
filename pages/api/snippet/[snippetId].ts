import { clientPromise } from "@/lib/mongodb";
import { UserData, UsersData } from "@/models/UserData";
import { ObjectId } from "bson";
import { FindOptions } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await clientPromise;

    const { query } = req;
    const { snippetId } = query as { snippetId: string };

    const data = await UsersData.findOne(
      {
        snippets: {
          $elemMatch: {
            _id: new ObjectId(snippetId),
            public: true,
          },
        },
      },
      { projection: { "snippets.$": 1 } }
    );

    if (!data) {
      throw new Error(`Could not find a public snippet with id ${snippetId}`);
    }

    return res.json(data.snippets[0]);
  } catch (err: any) {
    throw res.status(500).json({ error: err.message });
  }
};

export default handler;
