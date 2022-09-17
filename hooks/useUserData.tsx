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
  initializeApp: () => void;
  checkSnippetPath: ({
    collectionId,
    snippetId,
  }: {
    collectionId: string;
    snippetId: string;
  }) => {
    isCorrect: boolean;
    collectionId: string | null;
    snippetId: string | null;
  };
  checkCollectionPath: ({ collectionId }: { collectionId: string }) => {
    isCorrect: boolean;
    collectionId: string | null;
    snippetId: string | null;
  };
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

  const initializeApp = () => {
    if (collections) {
      if (collections.length > 0) {
        const firstCollection = collections[0];
        setActiveCollectionId(firstCollection._id);
        if (firstCollection.snippets.length > 0) {
          setActiveSnippetId(firstCollection.snippets[0]._id);
        } else {
          setActiveSnippetId("");
        }
      }
    }
  };

  const getDefaultSnippet = () => {
    const ids: { collectionId: string | null; snippetId: string | null } = {
      collectionId: null,
      snippetId: null,
    };
    const defaultCollection = collections[0];
    ids.collectionId = defaultCollection._id;
    const defaultSnippet =
      defaultCollection.snippets.length > 0 && defaultCollection.snippets[0];
    ids.snippetId = defaultSnippet._id;
    return ids;
  };

  const checkCollectionPath = ({ collectionId }: { collectionId: string }) => {
    const col = collections.find((c: any) => c._id === collectionId);
    if (!col) {
      // get default snippet
      const { collectionId, snippetId } = getDefaultSnippet();
      collectionId && setActiveCollectionId(collectionId);
      snippetId && setActiveSnippetId(snippetId);
      return {
        isCorrect: false,
        collectionId,
        snippetId,
      };
    } else {
      setActiveCollectionId(col._id);
      const snip = col.snippets.length > 0 && col.snippets[0];
      if (!snip) {
        setActiveSnippetId("");
        return {
          isCorrect: true,
          collectionId,
          snippetId: null,
        };
      } else {
        setActiveSnippetId(snip._id);
        return {
          isCorrect: true,
          collectionId,
          snippetId: snip._id,
        };
      }
    }
  };

  const checkSnippetPath = ({
    collectionId,
    snippetId,
  }: {
    collectionId: string;
    snippetId: string;
  }) => {
    const col = collections.find((c: any) => c._id === collectionId);
    if (!col) {
      // get default snippet
      const { collectionId, snippetId } = getDefaultSnippet();
      collectionId && setActiveCollectionId(collectionId);
      snippetId && setActiveSnippetId(snippetId);
      return {
        isCorrect: false,
        collectionId,
        snippetId,
      };
    } else {
      setActiveCollectionId(col._id);
      const snip = col.snippets.find((s: any) => s._id === snippetId);
      if (!snip) {
        // get default snippet
        const { collectionId, snippetId } = getDefaultSnippet();
        collectionId && setActiveCollectionId(collectionId);
        snippetId && setActiveSnippetId(snippetId);
        return {
          isCorrect: false,
          collectionId,
          snippetId,
        };
      } else {
        setActiveSnippetId(snip._id);
      }
    }

    return {
      isCorrect: true,
      collectionId: collectionId,
      snippetId: snippetId,
    };
  };

  return {
    isLoading,
    isError,
    collections,
    error,
    activeCollectionId,
    activeSnippetId,
    initializeApp,
    checkSnippetPath,
    checkCollectionPath,
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
