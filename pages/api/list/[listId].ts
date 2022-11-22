import { mongoConnect } from "@/lib/mongodb";
import { EditListFields } from "@/models/api";
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

  const { query } = req;
  const { listId } = query as { listId: string };

  await mongoConnect;

  if (req.method === "DELETE") {
    const userData = await UsersData.findOneAndUpdate(
      { userId: new ObjectID(user.id) },
      {
        $pull: {
          lists: { _id: new ObjectID(listId) },
          snippets: { listId: new ObjectID(listId) },
        },
      },
      {
        projection: {
          lists: { $elemMatch: { _id: new ObjectID(listId) } },
        },
        returnDocument: "before",
      }
    );

    if (!userData) {
      return res
        .status(500)
        .json({ error: "Could not find data for this user" });
    }

    const deletedList = userData.value?.lists.find(
      (l) => l._id.toString() === listId
    );

    if (!deletedList) {
      return res.status(500).json({ error: "Could not find deleted list" });
    }

    return res.status(200).json({ list: deletedList });
  } else if (req.method === "PUT") {
    const { listData } = req.body as { listData: EditListFields };

    const editDataIsValid = EditListFields.parse(listData);
    if (!editDataIsValid) {
      return res.status(400).json({ error: "Edit data is not valid" });
    }

    const editList: List = {
      ...listData,
      _id: new ObjectID(listData._id),
      snippetIds: listData.snippetIds.map((id: string) => new ObjectID(id)),
    };

    const editListIsValid = List.parse(editList);
    if (!editListIsValid) {
      return res.status(400).json({ error: "editList is not valid" });
    }

    const prevUserData = await UsersData.findOne(
      { userId: new ObjectID(user.id) },
      {
        projection: {
          lists: { $elemMatch: { _id: new ObjectID(listId) } },
        },
      }
    );

    if (!prevUserData || prevUserData.lists.length === 0) {
      return res
        .status(500)
        .json({ error: "Could not find a list with thid id" });
    }

    // merging prev with edit list to update fields
    const prevList = prevUserData.lists[0];
    const mergedList = { ...prevList, ...editList };

    const editedList = await UsersData.findOneAndUpdate(
      { userId: new ObjectID(user.id) },
      { $set: { "lists.$[list]": mergedList } },
      {
        arrayFilters: [{ "list._id": mergedList._id }],
      }
    );

    if (!editedList) {
      return res
        .status(500)
        .json({ error: "Something went wrong with list edit" });
    }

    return res.status(200).json({ list: mergedList });
  } else {
    return res.status(405).end();
  }
};

export default handler;
