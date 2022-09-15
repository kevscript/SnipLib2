import { Collection } from "@/mocks/collections";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { createContext, useContext, useState } from "react";

export type UserData = {
  isLoading: boolean;
  isError: boolean;
  collections: Collection[];
  error: any;
  activeCollectionId: string;
  activeSnippetId: string;
  initSnippet: ({
    snippetId,
    collectionId,
  }: {
    snippetId: string | null;
    collectionId: string;
  }) => void;
  initializeApp: () => void;
};

export const fetchUserData = async () => {
  const res = await fetch("/api/userData");
  const data = await res.json();
  return data;
};

const useUserDataProvider = () => {
  const { status } = useSession();
  const {
    isLoading,
    isError,
    data: collections,
    error,
  } = useQuery(["userData"], fetchUserData, {
    enabled: status === "authenticated",
  });

  const [activeCollectionId, setActiveCollectionId] = useState("");
  const [activeSnippetId, setActiveSnippetId] = useState("");

  const initSnippet = ({
    snippetId,
    collectionId,
  }: {
    snippetId: string | null;
    collectionId: string;
  }) => {
    const collection = collections.find((c: any) => c._id === collectionId);
    if (!collection) {
      return console.log("no collection found with id " + collectionId);
    } else {
      if (activeCollectionId !== collectionId) {
        setActiveCollectionId(collectionId);
      }

      if (!snippetId) {
        if (collection.snippets.length > 0) {
          setActiveSnippetId(collection.snippets[0]._id);
        } else {
          return console.log(
            `collection ${collection.label} has no snippets yet`
          );
        }
      } else {
        const snippet = collection.snippets.find(
          (s: any) => s._id === snippetId
        );
        if (!snippet) {
          return console.log("no snippet found with id " + snippetId);
        } else {
          if (activeSnippetId !== snippet._id) {
            setActiveSnippetId(snippet._id);
          }
        }
      }
    }
  };

  const initializeApp = () => {
    if (collections) {
      if (collections.length > 0) {
        const firstCollection = collections[0];
        setActiveCollectionId(firstCollection._id);
        if (firstCollection.snippets.length > 0) {
          setActiveSnippetId(firstCollection.snippets[0]._id);
        }
      } else {
        console.log("no collection yet");
      }
    }
  };

  return {
    isLoading,
    isError,
    collections,
    error,
    activeCollectionId,
    activeSnippetId,
    initSnippet,
    initializeApp,
  };
};

export const userDataContext = createContext({} as UserData);

export const UserDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const data = useUserDataProvider();
  return (
    <userDataContext.Provider value={data}>{children}</userDataContext.Provider>
  );
};

export const useUserData = () => {
  return useContext(userDataContext);
};
