import Snippet from "@/models/Snippet";
import { UsersData } from "@/models/UserData";
import { ObjectID } from "bson";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getToken({ req, secret });

  if (!user) {
    throw new Error("Something went wrong with user authentication");
  }

  const editSnippet: Snippet = {
    ...req.body,
    _id: new ObjectID(req.body._id),
    listId: new ObjectID(req.body.listId),
  };

  // check if body is valid snippet
  const valid = Snippet.parse(editSnippet);
  if (!valid) {
    throw new Error("The Edited snippet is not Valid");
  }

  try {
    // get previous user data object
    const prevUserData = await UsersData.findOne({
      userId: new ObjectID(user.id),
    });

    if (!prevUserData) {
      throw new Error("No data found for user with id" + user.id);
    }

    const newUserData = { ...prevUserData };

    // find the snippet we are editing
    let prevSnippetIndex = newUserData.snippets.findIndex(
      (s) => s._id.toString() === editSnippet._id.toString()
    );

    if (prevSnippetIndex < 0) {
      throw new Error("updating process - no corresponding prevSnippet found");
    }

    // check if listId of snippet was changed
    if (
      newUserData.snippets[prevSnippetIndex].listId.toString() !==
      editSnippet.listId.toString()
    ) {
      let oldList = newUserData.lists.find(
        (l) =>
          l._id.toString() ===
          newUserData.snippets[prevSnippetIndex].listId.toString()
      );
      let newList = newUserData.lists.find(
        (l) => l._id.toString() === editSnippet.listId.toString()
      );
      // switch the id reference of the snippet from old to new list
      if (oldList && newList) {
        oldList.snippetIds = [...oldList.snippetIds].filter(
          (id) => id.toString() !== editSnippet._id.toString()
        );
        newList.snippetIds.push(editSnippet._id);
      } else {
        throw new Error(
          "ListId of edited snippet changed - could not find the old/new list"
        );
      }
    }

    // now that the list was updated, update the snippet itself
    newUserData.snippets[prevSnippetIndex] = { ...editSnippet };

    const editedData = await UsersData.updateOne(
      {
        userId: new ObjectID(user.id),
      },
      { $set: newUserData }
    );
    if (editedData) {
      return res.status(200).json(editSnippet);
    } else {
      throw new Error("Something went wrong with snippet edition");
    }
  } catch (err) {
    throw res.status(500).json(err);
  }
};

export default handler;
