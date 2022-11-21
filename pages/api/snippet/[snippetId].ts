import { mongoConnect } from "@/lib/mongodb";
import { EditSnippetFields } from "@/models/api";
import Snippet from "@/models/Snippet";
import { UsersData } from "@/models/UserData";
import { ObjectID, ObjectId } from "bson";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import * as z from "zod";

const secret = process.env.NEXTAUTH_SECRET;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getToken({ req, secret });

  if (!user) {
    return res
      .status(401)
      .json({ error: "User JWT token authentication failed" });
  }

  const { query } = req;
  const { snippetId } = query as { snippetId: string };

  await mongoConnect;

  if (req.method === "GET") {
    const userData = await UsersData.findOne(
      {
        userId: new ObjectId(user.id),
        snippets: {
          $elemMatch: { _id: new ObjectId(snippetId) },
        },
      },
      { projection: { "snippets.$": 1 } }
    );

    if (!userData) {
      return res
        .status(500)
        .json({ error: "Could not find data for this user" });
    }

    if (userData?.snippets.length === 0) {
      return res
        .status(500)
        .json({ error: "Could not find a snippet for this id" });
    }

    return res.status(200).json({ snippet: userData.snippets[0] });
  } else if (req.method === "DELETE") {
    const { listId } = req.body as { listId: string };
    if (!listId) {
      res
        .status(400)
        .json({ error: "Did not provide a listId for the snippet" });
    }

    const userData = await UsersData.findOneAndUpdate(
      { userId: new ObjectID(user.id) },
      {
        $pull: {
          snippets: { _id: new ObjectID(snippetId) },
          "lists.$[list].snippetIds": new ObjectID(snippetId),
        },
      },
      {
        arrayFilters: [{ "list._id": new ObjectID(listId) }],
        projection: {
          snippets: { $elemMatch: { _id: new ObjectID(snippetId) } },
        },
      }
    );

    if (!userData) {
      return res
        .status(500)
        .json({ error: "Could not find data for this user" });
    }

    const deletedSnippet = userData.value?.snippets.find(
      (s) => s._id.toString() === snippetId
    );

    if (!deletedSnippet) {
      return res.status(500).json({ error: "Could not find deleted snippet" });
    }

    return res.status(200).json({ snippet: deletedSnippet });
  } else if (req.method === "PUT") {
    const { editData } = req.body as { editData: EditSnippetFields };
    // check if valid body data
    const editDataIsValid = EditSnippetFields.parse(editData);
    if (!editDataIsValid) {
      return res.status(400).json({ error: "Edit data is not valid" });
    }

    const editSnippet = { ...editData } as Partial<Snippet>;
    // parse ids from string to ObjectID
    if (editData.listId) {
      editSnippet.listId = new ObjectID(editData.listId);
    }
    // check if valid snippet data
    const editSnippetIsValid = Snippet.partial().parse(editSnippet);
    if (!editSnippetIsValid) {
      return res.status(400).json({ error: "Edit snippet is not valid" });
    }

    // get previous user data
    const prevUserData = await UsersData.findOne(
      { userId: new ObjectID(user.id) },
      {
        projection: {
          snippets: { $elemMatch: { _id: new ObjectID(snippetId) } },
        },
      }
    );

    if (!prevUserData || prevUserData.snippets.length === 0) {
      return res
        .status(500)
        .json({ error: "Could not find a snippet with thid id" });
    }

    // merging prev with edit snippet to update fields
    const prevSnippet = prevUserData.snippets[0];
    const mergedSnippet = { ...prevSnippet, ...editSnippet };

    const edited = await UsersData.updateOne(
      { userId: new ObjectID(user.id) },
      {
        $pull: { "lists.$[prevList].snippetIds": new ObjectID(snippetId) },
        $push: { "lists.$[nextList].snippetIds": new ObjectID(snippetId) },
        $set: { "snippets.$[editSnippet]": mergedSnippet },
      },
      {
        arrayFilters: [
          { "prevList._id": prevSnippet.listId },
          { "nextList._id": mergedSnippet.listId },
          { "editSnippet._id": new ObjectID(snippetId) },
        ],
      }
    );

    if (!edited) {
      return res
        .status(500)
        .json({ error: "Something went wrong with snippet edit" });
    }

    return res.status(200).json({ snippet: mergedSnippet });
  } else {
    return res.status(405).end();
  }
};

export default handler;
