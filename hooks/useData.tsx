import { useQuery } from "@tanstack/react-query";
import { CollectionType } from "models/Collection";
import { SnippetType } from "models/Snippet";
import { UserDataType } from "models/UserData";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

export type UserDataProviderReturnValue = {
  isLoading: boolean;
  error: any;
  collections: CollectionType[] | undefined;
  snippets: SnippetType[] | undefined;
  activeCollectionId: string;
  activeSnippetId: string;
  checkCollection: (collectionId: string) => void;
  checkSnippet: ({
    snippetId,
    collectionId,
  }: {
    snippetId: string;
    collectionId: string;
  }) => void;
};

export const fetchUserData = async () => {
  const res = await fetch("/api/userData");
  const data: UserDataType = await res.json();
  return data;
};

export const useDataProvider = () => {
  const { status } = useSession();

  const {
    data: { collections, snippets } = {},
    error,
    isLoading,
  } = useQuery(["userData"], fetchUserData, {
    enabled: status === "authenticated",
    onSuccess: (data) => initApp(data),
  });

  const [activeCollectionId, setActiveCollectionId] = useState("");
  const [activeTagLabel, setActiveTagLabel] = useState("");
  const [activeSnippetId, setActiveSnippetId] = useState("");

  const initApp = (data: UserDataType) => {
    const defaultCollection = data.collections?.find((c) => c.default);

    if (defaultCollection) {
      const firstSnippet = data.snippets.find(
        (s: any) => s.collectionId === defaultCollection._id
      );
      firstSnippet && setActiveSnippetId(firstSnippet._id.toString());
      setActiveCollectionId(defaultCollection._id.toString());
    }
  };

  const checkCollection = (collectionId: string) => {
    if (collections) {
      const existingCollection = collections.find(
        (c) => c._id === collectionId
      );
      if (existingCollection && snippets) {
        const firstSnippet = snippets.find(
          (s) => s.collectionId === existingCollection._id
        );
        firstSnippet
          ? setActiveSnippetId(firstSnippet._id.toString())
          : activeSnippetId && setActiveSnippetId("");
        setActiveCollectionId(existingCollection._id.toString());
      } else {
        activeCollectionId && setActiveCollectionId("");
      }
    }
  };

  const checkSnippet = ({
    snippetId,
    collectionId,
  }: {
    snippetId: string;
    collectionId: string;
  }) => {
    if (collections) {
      const existingCollection = collections.find(
        (c) => c._id === collectionId
      );

      if (existingCollection && snippets) {
        const existingSnippet = snippets.find(
          (s) => s._id === snippetId && s.collectionId === collectionId
        );

        existingSnippet
          ? setActiveSnippetId(existingSnippet._id.toString())
          : activeSnippetId && setActiveSnippetId("");
        setActiveCollectionId(existingCollection._id.toString());
      } else {
        activeCollectionId && setActiveCollectionId("");
      }
    }
  };

  return {
    collections,
    snippets,
    error,
    isLoading,
    activeCollectionId,
    activeSnippetId,
    checkCollection,
    checkSnippet,
  };
};

export const dataContext = createContext({} as UserDataProviderReturnValue);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const data = useDataProvider();
  return <dataContext.Provider value={data}>{children}</dataContext.Provider>;
};

export const useData = () => {
  return useContext(dataContext);
};
