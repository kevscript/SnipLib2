import { UserAccount, UsersAccounts } from "@/models/Account";
import { Users } from "@/models/User";
import { UserData, UsersData } from "@/models/UserData";
import { ObjectID } from "bson";
import { DeleteResult } from "mongodb";

const deleteUser = async (userId: string): Promise<DeleteResult | Error> => {
  try {
    const deleted = await Users.deleteOne({ _id: new ObjectID(userId) });
    if (!deleted.acknowledged) {
      throw new Error("Could not delete user");
    }
    return deleted;
  } catch (err: any) {
    return err;
  }
};

const deleteUserAccount = async (
  userId: string
): Promise<DeleteResult | Error> => {
  try {
    const deleted = await UsersAccounts.deleteOne({
      userId: new ObjectID(userId),
    });
    if (!deleted.acknowledged) {
      throw new Error("Could not delete user account");
    }
    return deleted;
  } catch (err: any) {
    return err;
  }
};

const deleteUserData = async (
  userId: string
): Promise<DeleteResult | Error> => {
  try {
    const deleted = await UsersData.deleteOne({
      userId: new ObjectID(userId),
    });
    if (!deleted.acknowledged) {
      throw new Error("Could not delete user data");
    }
    return deleted;
  } catch (err: any) {
    return err;
  }
};

export { deleteUser, deleteUserAccount, deleteUserData };
