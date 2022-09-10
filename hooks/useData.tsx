import { UserData } from "@/mocks/userData";
import React, { createContext, useContext, useState } from "react";

type Data = {
  data: UserData | undefined;
  activeCollectionId: string;
  activeSnippetId: string;
  activeTagLabel: string;
  collectionIdOfActiveSnippet: string;
  handleActiveCollection: (id: string) => void;
  handleActiveSnippet: (x: {
    id: string;
    collectionIdOfSnippet: string;
  }) => void;
  handleActiveTag: (label: string) => void;
  initData: (d: UserData) => void;
};

const useDataProvider = () => {
  const [data, setData] = useState<UserData | undefined>(undefined);
  const [activeCollectionId, setActiveCollectionId] = useState("");
  const [activeSnippetId, setActiveSnippetId] = useState("");
  const [collectionIdOfActiveSnippet, setCollectionIdOfActiveSnippet] =
    useState("");
  const [activeTagLabel, setActiveTagLabel] = useState("");

  const handleActiveCollection = (id: string) => {
    if (id !== activeCollectionId) {
      // activeTagLabel && setActiveTagLabel("");
      setActiveCollectionId(id);
    }
  };

  const handleActiveSnippet = ({
    id,
    collectionIdOfSnippet,
  }: {
    id: string;
    collectionIdOfSnippet: string;
  }) => {
    if (id !== activeSnippetId) {
      setActiveSnippetId(id);
      setCollectionIdOfActiveSnippet(collectionIdOfSnippet);
    }
  };

  const handleActiveTag = (label: string) => {
    if (label !== activeTagLabel) {
      // activeCollectionId && setActiveCollectionId("");
      setActiveTagLabel(label);
    }
  };

  const initData = (userData: any) => setData(userData);

  return {
    data,
    activeCollectionId,
    activeSnippetId,
    collectionIdOfActiveSnippet,
    activeTagLabel,
    handleActiveCollection,
    handleActiveSnippet,
    handleActiveTag,
    initData,
  };
};

const dataContext = createContext({} as Data);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const data = useDataProvider();
  return <dataContext.Provider value={data}>{children}</dataContext.Provider>;
};

export const useData = () => {
  return useContext(dataContext);
};
