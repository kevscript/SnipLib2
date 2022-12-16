import { UserAccount, UsersAccounts } from "@/models/Account";
import { User, Users } from "@/models/User";
import { UserData, UsersData } from "@/models/UserData";
import { ObjectID } from "bson";

const findUser = async (userId: string): Promise<User | Error> => {
  try {
    const dbUser = await Users.findOne({ _id: new ObjectID(userId) });
    if (!dbUser) {
      throw new Error("Could not find user");
    }
    return dbUser;
  } catch (err: any) {
    return err;
  }
};

const findUserAccount = async (
  userId: string
): Promise<UserAccount | Error> => {
  try {
    const dbUserAccount = await UsersAccounts.findOne({
      userId: new ObjectID(userId),
    });
    if (!dbUserAccount) {
      throw new Error("Could not find account for this user");
    }
    return dbUserAccount;
  } catch (err: any) {
    return err;
  }
};

const findUserData = async (userId: string): Promise<UserData | Error> => {
  try {
    const dbUserData = await UsersData.findOne({
      userId: new ObjectID(userId),
    });
    if (!dbUserData) {
      throw new Error("Could not find data for this user");
    }
    return dbUserData;
  } catch (err: any) {
    return err;
  }
};

export { findUser, findUserAccount, findUserData };
