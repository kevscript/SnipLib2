import { getUserData } from "@/utils/getUserData";
import { useQuery } from "@tanstack/react-query";
import Snippet from "models/Snippet";
import { UserData } from "models/UserData";
import { useSession } from "next-auth/react";
import React, { createContext, useCallback, useContext, useState } from "react";

export type Tag = { label: string; amount: number };

type UserDataContext = {
  data: UserData | undefined;
  tags: Tag[];
  activeListId: string;
  activeTagLabel: string;
  activeSnippetId: string;
  initState: (d: UserData) => void;
  checkListsRoutePath: () => { valid: boolean; redirectPath: string };
  checkListPath: (id: string) => {
    valid: boolean;
    redirectPath: string;
  };
  checkSnippetPathFromList: ({
    listId,
    snippetId,
  }: {
    listId: string;
    snippetId: string;
  }) => {
    valid: boolean;
    redirectPath: string;
  };
};

export const useUserdataProvider = () => {
  const { status } = useSession();

  const { data } = useQuery(["userData"], getUserData, {
    enabled: status === "authenticated",
    onSuccess: (data) => initState(data),
    refetchOnWindowFocus: false,
  });

  const [activeListId, setActiveListId] = useState("");
  const [activeTagLabel, setActiveTagLabel] = useState("");
  const [activeSnippetId, setActiveSnippetId] = useState("");

  const [tags, setTags] = useState<Tag[]>([]);

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

  const initState = (data: UserData) => {
    const { lists, snippets } = data;
    const originalList = lists.find((l) => l.original === true);
    if (originalList) {
      setActiveListId(originalList._id.toString());
      const firstSnippet = snippets.find(
        (s) => s.listId.toString() === originalList._id.toString()
      );
      if (firstSnippet) {
        setActiveSnippetId(firstSnippet._id.toString());
      }
    }
    computeTags(data.snippets);
  };

  const checkListsRoutePath = useCallback(() => {
    const originalList = data?.lists.find((l) => l.original === true);
    if (originalList) {
      const snippet = data?.snippets.find(
        (s) => s.listId.toString() === originalList._id.toString()
      );

      if (snippet) {
        setActiveListId(originalList._id.toString());
        setActiveSnippetId(snippet._id.toString());
        return {
          valid: true,
          redirectPath: `/lists/${originalList._id.toString()}/${snippet._id.toString()}`,
        };
      } else {
        setActiveListId(originalList._id.toString());
        setActiveSnippetId("");
        return {
          valid: true,
          redirectPath: `/lists/${originalList._id.toString()}`,
        };
      }
    } else {
      return {
        valid: false,
        redirectPath: "No original List",
      };
    }
  }, [data]);

  const checkListPath = useCallback(
    (listId: string) => {
      const existingList = data?.lists.find((l) => l._id.toString() === listId);

      if (existingList) {
        const initSnippet = data?.snippets.find(
          (s) => s.listId.toString() === listId
        );

        if (initSnippet) {
          setActiveListId(existingList._id.toString());
          setActiveSnippetId(initSnippet._id.toString());
          return {
            valid: false,
            redirectPath: `/lists/${listId}/${initSnippet._id.toString()}`,
          };
        } else {
          setActiveListId(existingList._id.toString());
          setActiveSnippetId("");
          return {
            valid: true,
            redirectPath: `/lists/${listId}}`,
          };
        }
      } else {
        setActiveListId("");
        return {
          valid: false,
          redirectPath: `/lists`,
        };
      }
    },
    [data]
  );

  const checkSnippetPathFromList = useCallback(
    ({ listId, snippetId }: { listId: string; snippetId: string }) => {
      const existingList = data?.lists.find((l) => l._id.toString() === listId);

      if (existingList) {
        const snippet = data?.snippets.find(
          (s) => s._id.toString() === snippetId
        );
        const snippetIsInList =
          snippet && snippet.listId.toString() === existingList._id.toString();

        if (snippetIsInList) {
          setActiveListId(listId);
          setActiveSnippetId(snippetId);
          return {
            valid: true,
            redirectPath: `/lists/${listId}/${snippetId}`,
          };
        } else {
          setActiveListId(listId);
          setActiveSnippetId("");
          return {
            valid: false,
            redirectPath: `/lists/${listId}`,
          };
        }
      } else {
        setActiveListId("");
        setActiveSnippetId("");
        return {
          valid: false,
          redirectPath: `/lists`,
        };
      }
    },
    [data]
  );

  return {
    data,
    tags,
    activeListId,
    activeTagLabel,
    activeSnippetId,
    initState,
    checkListsRoutePath,
    checkListPath,
    checkSnippetPathFromList,
  };
};

export const userDataContext = createContext({} as UserDataContext);

export const UserDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const data = useUserdataProvider();
  return (
    <userDataContext.Provider value={data}>{children}</userDataContext.Provider>
  );
};

export const useUserData = () => useContext(userDataContext);
