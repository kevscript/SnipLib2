import Snippet from "@/models/Snippet";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { createContext, useContext, useState } from "react";
import { getUserData } from "@/utils/getUserData";
import { UserData } from "@/models/UserData";
import { snippets } from "@codemirror/lang-javascript";
import { string } from "zod";

export type Tag = {
  label: string;
  amount: number;
};

export type BarMode = "list" | "tag" | "search";

type CheckListReturnValue = {
  valid: boolean;
  isEmpty?: boolean;
  path?: string;
};

type CheckListSnippetParams = {
  listId: string;
  snippetId: string;
};

export type UserDataProviderReturnValue = {
  lists: UserData["lists"] | undefined;
  snippets: UserData["snippets"] | undefined;
  tags: Tag[] | undefined;
  activeListId: string;
  activeTagLabel: string;
  activeSnippetId: string;
  activeSearchValue: string;
  activeBarMode: BarMode;
  initOriginalList: () => { path: string };
  isSuccess: boolean;
  checkList: (listId: string) => CheckListReturnValue;
  checkListSnippet: (p: CheckListSnippetParams) => { valid: boolean };
};

export const useDataProvider = () => {
  const { status } = useSession();

  const { data, isLoading, isSuccess } = useQuery(["userData"], getUserData, {
    enabled: status === "authenticated",
    onSuccess: (data) => {
      computeTags(data.snippets);
    },
    refetchOnWindowFocus: false,
  });

  const [isInitialiazed, setIsInitialized] = useState(false);
  const [tags, setTags] = useState<Tag[] | undefined>(undefined);

  const [activeListId, setActiveListId] = useState("");
  const [activeTagLabel, setActiveTagLabel] = useState("");
  const [activeSnippetId, setActiveSnippetId] = useState("");
  const [activeSearchValue, setActiveSearchValue] = useState("");
  const [activeBarMode, setActiveBarMode] = useState<BarMode>("list");

  const computeTags = (snippets: Snippet[]) => {
    const tagsObj: { [key: string]: number } = {};
    snippets.forEach((snip) => {
      snip.tags.forEach((tag) => {
        tagsObj[tag] ? tagsObj[tag]++ : (tagsObj[tag] = 1);
      });
    });
    const initTags = Object.entries(tagsObj).map((tag) => ({
      label: tag[0],
      amount: tag[1],
    }));

    setTags(initTags);
  };

  const initOriginalList = () => {
    if (isSuccess) {
      setActiveBarMode("list");
      const originalList = data.lists.find((l) => l.original);

      if (originalList) {
        setActiveListId(originalList._id.toString());
        const originalSnippets = data.snippets
          .filter((s) => s.listId.toString() === originalList._id.toString())
          .sort((a, b) => (a.title > b.title ? -1 : 1));

        if (originalSnippets.length > 0) {
          const defaultSnippet = originalSnippets[0];
          setActiveSnippetId(defaultSnippet._id.toString());

          return {
            path: `/lists/${originalList._id.toString()}/${defaultSnippet._id.toString()}`,
          };
        } else {
          setActiveSnippetId("");
          return { path: `/lists/${originalList._id.toString()}` };
        }
      }
    }
  };

  const checkListSnippet = ({
    listId,
    snippetId,
  }: {
    listId: string;
    snippetId: string;
  }) => {
    if (isSuccess) {
      if (listId !== activeListId) {
        const listExists = data.lists.find((l) => l._id.toString() === listId);
        if (!listExists) {
          return { valid: false };
        }
        setActiveListId(listExists._id.toString());
      }

      if (snippetId !== activeSnippetId) {
        const snippetExists = data.snippets.find(
          (s) =>
            s._id.toString() === snippetId && s.listId.toString() === listId
        );
        if (!snippetExists) {
          return { valid: false };
        }

        setActiveSnippetId(snippetId);
        return { valid: true };
      }

      return { valid: true };
    }
  };

  const checkList = (listId: string) => {
    if (isSuccess) {
      if (listId !== activeListId) {
        const listExists = data.lists.find((l) => l._id.toString() === listId);

        if (!listExists) {
          return { valid: false };
        }

        setActiveListId(listExists._id.toString());
      }

      const listSnippets = data.snippets
        .filter((s) => s.listId.toString() === listId)
        .sort((a, b) => (a.title > b.title ? -1 : 1));

      if (listSnippets.length > 0) {
        const defaultSnippet = listSnippets[0];
        setActiveSnippetId(defaultSnippet._id.toString());

        return {
          valid: true,
          isEmpty: false,
          path: `/lists/${listId}/${defaultSnippet._id.toString()}`,
        };
      } else {
        setActiveSnippetId("");
        return {
          valid: true,
          isEmpty: true,
        };
      }
    }
  };

  return {
    lists: data?.lists,
    snippets: data?.snippets,
    tags,
    activeListId,
    activeSnippetId,
    activeTagLabel,
    activeSearchValue,
    activeBarMode,
    initOriginalList,
    isSuccess,
    checkList,
    checkListSnippet,
  } as UserDataProviderReturnValue;
};

export const dataContext = createContext({} as UserDataProviderReturnValue);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const data = useDataProvider();
  return <dataContext.Provider value={data}>{children}</dataContext.Provider>;
};

export const useData = () => {
  return useContext(dataContext);
};
