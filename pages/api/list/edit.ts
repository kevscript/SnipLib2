import { clientPromise } from "@/lib/mongodb";
import List from "@/models/List";
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
      .json({ message: "User JWT token authentication failed" });
  }

  try {
    await clientPromise;

    const listToEdit: List = {
      ...req.body,
      _id: new ObjectID(req.body._id),
      snippetIds: req.body.snippetIds.map((id: string) => new ObjectID(id)),
    };

    const valid = List.parse(listToEdit);

    if (!valid) {
      throw res
        .status(500)
        .json({ message: "req.body is not a valid List object" });
    }

    const editedList = await UsersData.findOneAndUpdate(
      { userId: new ObjectID(user.id) },
      { $set: { "lists.$[list].label": listToEdit.label } },
      {
        arrayFilters: [{ "list._id": listToEdit._id }],
        returnDocument: "after",
      }
    );

    if (!editedList) {
      throw res
        .status(500)
        .json({ message: "Something went wrong with list edit" });
    }

    return res.status(200).json(listToEdit);
  } catch (err) {
    throw res.status(500).json(err);
  }
};

export default handler;
