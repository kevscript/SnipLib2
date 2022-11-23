import { mongoConnect } from "@/lib/mongodb";
import { UsersData } from "@/models/UserData";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await mongoConnect;

  const { query, method } = req;
  const { snippetId } = query as { snippetId: string };

  if (!snippetId) {
    return res.status(400).json({ error: "No snippetId was given" });
  }

  if (method === "GET") {
    const userData = await UsersData.findOne(
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

    if (!userData || userData.snippets.length === 0) {
      return res.status(500).json({
        error: `Snippet with id ${snippetId} is not public or does not exist`,
      });
    }

    res.status(200).json({ snippet: userData.snippets[0] });
  } else {
    return res.status(405).json({ error: "Bad Method" });
  }
};

export default handler;
