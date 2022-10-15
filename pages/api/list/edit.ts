import { clientPromise } from "@/lib/mongodb";
import List from "@/models/List";
import { UsersData } from "@/models/UserData";
import { ObjectID } from "bson";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getToken({ req, secret });

  if (user) {
    try {
      await clientPromise;

      console.log("reqbody editlist", req.body);

      const listToEdit: List = {
        ...req.body,
        _id: new ObjectID(req.body._id),
        snippetIds: req.body.snippetIds.map((id: string) => new ObjectID(id)),
      };
      const valid = List.parse(listToEdit);

      if (valid) {
        const editedList = await UsersData.findOneAndUpdate(
          { userId: new ObjectID(user.id) },
          { $set: { "lists.$[list].label": listToEdit.label } },
          {
            arrayFilters: [{ "list._id": listToEdit._id }],
            returnDocument: "after",
          }
        );

        if (editedList) {
          return res.status(200).json(listToEdit);
        } else {
          throw new Error("Somethin went wrong with list edit");
        }
      } else {
        throw new Error("listToEdit is not a valid List");
      }
    } catch (err) {
      throw res.status(500).json(err);
    }
  } else {
    throw res
      .status(500)
      .json({ error: { message: "User authenticating JWT Token was falsy" } });
  }
};

export default handler;
