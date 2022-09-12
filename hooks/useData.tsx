import { UserData } from "@/mocks/userData";
import { useRouter } from "next/router";
import { createContext, useContext, useState } from "react";

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

export const useDataProvider = () => {
  const router = useRouter();
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
      router.push(`/collection/${id}`);
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

export const dataContext = createContext({} as Data);

// export const DataProvider = ({ children }: { children: React.ReactNode }) => {
//   const data = useDataProvider();
//   return <dataContext.Provider value={data}>{children}</dataContext.Provider>;
// };

export const useData = () => {
  return useContext(dataContext);
};
