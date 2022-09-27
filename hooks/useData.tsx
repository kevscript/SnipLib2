import Snippet from "models/Snippet";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
import { getUserData } from "@/utils/getUserData";
import { UserData } from "models/UserData";

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
  activeBarMode: BarMode;
  activateList: (id: string) => void;
  activateTag: (label: string) => void;
};

export const useDataProvider = () => {
  const { status, data: session } = useSession();

  const { data } = useQuery(["userData"], getUserData, {
    enabled: status === "authenticated",
    onSuccess: (data) => initState(data),
    refetchOnWindowFocus: false,
  });

  const [tags, setTags] = useState<Tag[] | undefined>(undefined);

  const [activeListId, setActiveListId] = useState("");
  const [activeTagLabel, setActiveTagLabel] = useState("");
  const [activeSnippetId, setActiveSnippetId] = useState("");
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

  const activateList = (id: string) => {
    if (id !== activeListId) {
      const exists = data?.lists.find((l) => l._id.toString() === id);
      if (exists) {
        setActiveListId(id);
        activeBarMode !== "list" && setActiveBarMode("list");
        setActiveTagLabel("");
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
    activeBarMode,
    activateList,
    activateTag,
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
