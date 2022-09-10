import { Collection, collections } from "./collections";

export type UserData = {
  userId: string;
  collections: Collection[];
};

export const userData: UserData = {
  userId: "1",
  collections: [...collections],
};
