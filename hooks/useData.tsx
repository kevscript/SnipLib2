import { useQuery } from "@tanstack/react-query";
import { UserDataType } from "models/UserData";
import { useSession } from "next-auth/react";
import { createContext, useContext } from "react";

export type UserDataProviderReturnValue = {
  isLoading: boolean;
  error: any;
  data: UserDataType;
};

export const fetchUserData = async () => {
  const res = await fetch("/api/userData");
  const data = await res.json();
  return data;
};

export const useDataProvider = () => {
  const { status } = useSession();

  const { data, error, isLoading } = useQuery(["userData"], fetchUserData, {
    enabled: status === "authenticated",
  });

  return { data, error, isLoading };
};

export const dataContext = createContext({} as UserDataProviderReturnValue);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const data = useDataProvider();
  return <dataContext.Provider value={data}>{children}</dataContext.Provider>;
};

export const useData = () => {
  return useContext(dataContext);
};
