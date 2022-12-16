import { mongoConnect } from "@/lib/mongodb";
import {
  deleteUser,
  deleteUserAccount,
  deleteUserData,
} from "@/utils/deleteUser";
import { findUser, findUserAccount, findUserData } from "@/utils/findUser";
import { isError } from "@/utils/isError";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getToken({ req, secret });
  const { query } = req;
  const { userId } = query as { userId: string };

  if (!user || user.id !== userId) {
    return res
      .status(401)
      .json({ error: "User JWT token authentication failed" });
  }

  await mongoConnect;

  if (req.method === "DELETE") {
    // find user data in all collections
    const [dbUser, dbUserAccount, dbUserData] = await Promise.allSettled([
      findUser(user.id!),
      findUserAccount(user.id!),
      findUserData(user.id!),
    ]);

    // return error if there was an error finding any of the documents
    if (isError(dbUser) || isError(dbUserAccount) || isError(dbUserData)) {
      const errors: string[] = [];
      isError(dbUser) && errors.push("User");
      isError(dbUserAccount) && errors.push("UserAccount");
      isError(dbUserData) && errors.push("UserData");

      return res
        .status(500)
        .json({ error: `Could not find ${errors.join(", ")}` });
    }

    // if we found every user collection try to delete them all
    const [deletedUser, deletedUserAccount, deletedUserData] =
      await Promise.allSettled([
        deleteUser(user.id!),
        deleteUserAccount(user.id!),
        deleteUserData(user.id!),
      ]);

    // return error if there was an error deleting any of the documents
    if (
      isError(deletedUser) ||
      isError(deletedUserAccount) ||
      isError(deletedUserData)
    ) {
      const deleted: string[] = [];
      const notDeleted: string[] = [];
      isError(deletedUser) ? notDeleted.push("User") : deleted.push("User");
      isError(deletedUserAccount)
        ? notDeleted.push("UserAccount")
        : deleted.push("UserAccount");
      isError(deletedUserData)
        ? notDeleted.push("UserData")
        : deleted.push("UserData");

      const errorMessage = `${
        deleted.length > 0 && `Deleted ${deleted.join(", ")}, but`
      } could not delete ${notDeleted.join(", ")}.`;

      return res.status(500).json({ error: errorMessage });
    }

    // success if found and deleted all documents
    return res
      .status(200)
      .json({ message: "User and its data successfully deleted" });
  } else {
    return res.status(405).end();
  }
};

export default handler;
