import { UserData } from "models/UserData";

export const getUserData = async (): Promise<UserData> => {
  const res = await fetch(`/api/data`);
  const data = await res.json();
  return data;
};
