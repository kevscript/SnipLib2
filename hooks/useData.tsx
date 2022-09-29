import Snippet from "@/models/Snippet";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { createContext, useContext, useState } from "react";
import { getUserData } from "@/utils/getUserData";
import { UserData } from "@/models/UserData";

export type Tag = {
  label: string;
  amount: number;
};

export type BarMode = "list" | "tag" | "search";

export type UserDataProviderReturnValue = {
  lists: UserData["lists"] | undefined;
  snippets: UserData["snippets"] | undefined;
  tags: Tag[] | undefined;
  activeListId: string;
  activeTagLabel: string;
  activeSnippetId: string;
  activeSearchValue: string;
  activeBarMode: BarMode;
  activateList: (id: string) => void;
  activateTag: (label: string) => void;
  activateSnippet: (id: string) => void;
  activateSearch: (value: string) => void;
  isLoading: boolean;
};

export const useDataProvider = () => {
  const { status } = useSession();

  const { data, isLoading } = useQuery(["userData"], getUserData, {
    enabled: status === "authenticated",
    onSuccess: (data) => initState(data),
    refetchOnWindowFocus: false,
  });

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

  const initState = (data: UserData) => {
    const { lists, snippets } = data;
    const originalList = lists.find((l) => l.original === true);
    // if original list exists
    if (originalList) {
      if (snippets.length === 0) {
        // init it by default if no snippet in app yet
        setActiveListId(originalList._id.toString());
      } else {
        // otherwise look for a snippet in original list to init
        const originalHasSnippets = snippets.some(
          (s) => s.listId.toString() === originalList._id.toString()
        );
        if (originalHasSnippets) {
          // if found, init both original list and its snippet
          setActiveListId(originalList._id.toString());
          const firstSnippet = snippets.find(
            (s) => s.listId.toString() === originalList._id.toString()
          );
          firstSnippet && setActiveSnippetId(firstSnippet._id.toString());
        } else {
          // if original list does not have snippets,
          // but there is snippets still in other lists
          // sort them by updated date and init the latest
          const sortedSnippetsByUpdateDate = snippets.sort((a, b) =>
            a.updatedAt > b.updatedAt ? 1 : -1
          );
          setActiveSnippetId(sortedSnippetsByUpdateDate[0]._id.toString());
          setActiveListId(sortedSnippetsByUpdateDate[0]._id.toString());
        }
      }
    }
    computeTags(data.snippets);
  };

  const activateSearch = (value: string) => {
    if (activeSearchValue !== value) {
      console.log("searchValue", value);
      setActiveSearchValue(value);
      activeBarMode !== "search" && setActiveBarMode("search");
      setActiveListId("");
      setActiveTagLabel("");
    } else {
      console.log(value, "already the search value");
    }
  };

  const activateList = (id: string) => {
    if (id !== activeListId) {
      const exists = data?.lists.find((l) => l._id.toString() === id);
      if (exists) {
        setActiveListId(id);
        activeBarMode !== "list" && setActiveBarMode("list");
        setActiveTagLabel("");
        setActiveSearchValue("");
      }
    }
  };

  const activateTag = (label: string) => {
    if (label !== activeTagLabel) {
      const exists = tags?.find((t) => t.label === label);
      if (exists) {
        setActiveTagLabel(label);
        activeBarMode !== "tag" && setActiveBarMode("tag");
        setActiveListId("");
        setActiveSearchValue("");
      }
    }
  };

  const activateSnippet = (id: string) => {
    if (id !== activeSnippetId) {
      const exists = data?.snippets.find((s) => s._id.toString() === id);
      if (exists) {
        setActiveSnippetId(id);

        if (
          activeBarMode === "list" &&
          activeListId !== exists.listId.toString()
        ) {
          setActiveListId(exists.listId.toString());
        }
        if (
          activeBarMode === "tag" &&
          exists.tags.length > 0 &&
          !exists.tags.includes(activeTagLabel)
        ) {
          setActiveTagLabel(exists.tags[0]);
        }
        if (activeBarMode === "search") {
          setActiveListId("");
          setActiveTagLabel("");
        }
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
    activateList,
    activateTag,
    activateSnippet,
    activateSearch,
    isLoading,
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
