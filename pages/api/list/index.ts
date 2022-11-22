import { mongoConnect } from "@/lib/mongodb";
import List from "@/models/List";
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

  if (req.method === "POST") {
    const newList: List = {
      _id: new ObjectID(req.body._id),
      label: req.body.label,
      original: false,
      snippetIds: [],
    };

    const isValidList = List.parse(newList);
    if (!isValidList) {
      return res.status(500).json({ error: "List is not valid" });
    }

    const createdList = await UsersData.findOneAndUpdate(
      { userId: new ObjectID(user.id) },
      { $push: { lists: newList } }
    );

    if (!createdList) {
      return res
        .status(500)
        .json({ error: "Something went wrong with list creation" });
    }

    return res.json({ list: newList });
  } else {
    return res.status(405).end();
  }
};

export default handler;
