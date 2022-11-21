import { mongoConnect } from "@/lib/mongodb";
import { UsersData } from "@/models/UserData";
import { ObjectId } from "bson";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await mongoConnect;

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

    res.json(data.snippets[0]);
  } catch (err) {
    res.status(500).json(err);
  }
};

export default handler;
