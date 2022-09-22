import { useQuery } from "@tanstack/react-query";
import { CollectionType } from "models/Collection";
import { SnippetType } from "models/Snippet";
import { UserDataType } from "models/UserData";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

export type Tag = {
  label: string;
  amount: number;
};

export type UserDataProviderReturnValue = {
  isLoading: boolean;
  error: any;
  collections: CollectionType[] | undefined;
  snippets: SnippetType[] | undefined;
  tags: Tag[] | undefined;
  activeCollectionId: string;
  activeSnippetId: string;
  activeTagLabel: string;
  checkCollection: (collectionId: string) => void;
  checkTag: (tagLabel: string) => void;
  checkCollectionSnippet: ({
    snippetId,
    collectionId,
  }: {
    snippetId: string;
    collectionId: string;
  }) => void;
  checkTagSnippet: ({
    snippetId,
    tagLabel,
  }: {
    snippetId: string;
    tagLabel: string;
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
    refetchOnWindowFocus: false,
  });

  const [tags, setTags] = useState<Tag[] | undefined>(undefined);

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

    const newTags = computeTags(data.snippets);
    newTags && setTags(newTags);
  };

  const computeTags = (snippets: SnippetType[]) => {
    const tagsObj: { [key: string]: number } = {};

    snippets.forEach((s) => {
      s.tags &&
        s.tags.forEach((tag) => {
          tagsObj[tag] ? tagsObj[tag]++ : (tagsObj[tag] = 1);
        });
    });

    const initTags: Tag[] = Object.entries(tagsObj).map((tag) => ({
      label: tag[0],
      amount: tag[1],
    }));

    return initTags;
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

        setActiveTagLabel("");
        setActiveCollectionId(existingCollection._id.toString());
      } else {
        activeCollectionId && setActiveCollectionId("");
      }
    }
  };

  const checkTag = (tagLabel: string) => {
    if (tags) {
      const existingTag = tags.find((tag) => tag.label === tagLabel);

      if (existingTag && snippets) {
        const firstSnippet = snippets.find((s) =>
          s.tags?.includes(existingTag.label)
        );
        firstSnippet
          ? setActiveSnippetId(firstSnippet._id.toString())
          : activeSnippetId && setActiveSnippetId("");

        setActiveCollectionId("");
        setActiveTagLabel(existingTag.label);
      } else {
        activeTagLabel && setActiveTagLabel("");
      }
    }
  };

  const checkCollectionSnippet = ({
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

        setActiveTagLabel("");
        setActiveCollectionId(existingCollection._id.toString());
      } else {
        activeCollectionId && setActiveCollectionId("");
      }
    }
  };

  const checkTagSnippet = ({
    snippetId,
    tagLabel,
  }: {
    snippetId: string;
    tagLabel: string;
  }) => {
    if (tags) {
      const existingTag = tags.find((tag) => tag.label === tagLabel);

      if (existingTag && snippets) {
        const existingSnippet = snippets.find(
          (s) => s._id === snippetId && s.tags?.includes(existingTag.label)
        );

        existingSnippet
          ? setActiveSnippetId(existingSnippet._id.toString())
          : activeSnippetId && setActiveSnippetId("");

        setActiveCollectionId("");
        setActiveTagLabel(existingTag.label);
      } else {
        activeTagLabel && setActiveTagLabel("");
      }
    }
  };

  return {
    collections,
    snippets,
    tags,
    error,
    isLoading,
    activeCollectionId,
    activeSnippetId,
    activeTagLabel,
    checkCollection,
    checkTag,
    checkCollectionSnippet,
    checkTagSnippet,
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
