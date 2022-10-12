import Snippet from "@/models/Snippet";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { createContext, useContext, useState } from "react";
import { getUserData } from "@/utils/getUserData";
import { UserData } from "@/models/UserData";
import { filterMatchingSnippets } from "@/utils/filterMatchingSnippets";

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

type CheckTagReturnValue = {
  valid: boolean;
  isEmpty?: boolean;
  path?: string;
};

type CheckSearchReturnValue = {
  valid: boolean;
  path?: string;
  hasMatches?: boolean;
};

type CheckListSnippetParams = {
  listId: string;
  snippetId: string;
};

type CheckTagSnippetParams = {
  tagLabel: string;
  snippetId: string;
};

type CheckSearchSnippetParams = {
  searchValue: string;
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
  initDefaultTag: () => { path: string };
  isSuccess: boolean;
  checkList: (listId: string) => CheckListReturnValue;
  checktTag: (tagLabel: string) => CheckTagReturnValue;
  checkSearch: (searchValue: string) => CheckSearchReturnValue;
  checkListSnippet: (p: CheckListSnippetParams) => { valid: boolean };
  checkTagSnippet: (p: CheckTagSnippetParams) => { valid: boolean };
  checkSearchSnippet: (p: CheckSearchSnippetParams) => { valid: boolean };
  updateSearchValue: (searchValue: string) => void;
};

export const useDataProvider = () => {
  const { status } = useSession();

  const { data, isSuccess } = useQuery(["userData"], getUserData, {
    enabled: status === "authenticated",
    onSuccess: (data) => {
      computeTags(data.snippets);
    },
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

  const initDefaultTag = () => {
    if (isSuccess && tags && tags.length > 0) {
      setActiveBarMode("tag");
      const sortedTags = tags.sort((a, b) => (a.amount > b.amount ? 1 : -1));
      const defaultTag = sortedTags[0];

      if (defaultTag) {
        setActiveTagLabel(defaultTag.label);
        const sortedTagSnippets = data.snippets
          .filter((s) => s.tags.includes(defaultTag.label))
          .sort((a, b) => (a.title > b.title ? -1 : 1));

        if (sortedTagSnippets.length > 0) {
          const defaultSnippet = sortedTagSnippets[0];
          setActiveSnippetId(defaultSnippet._id.toString());

          return {
            path: `/tags/${defaultTag.label}/${defaultSnippet._id.toString()}`,
          };
        } else {
          setActiveSnippetId("");
          return { path: `/tags/${defaultTag.label}` };
        }
      }
    }
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

  const checkTagSnippet = ({
    tagLabel,
    snippetId,
  }: {
    tagLabel: string;
    snippetId: string;
  }) => {
    if (isSuccess && tags) {
      setActiveBarMode("tag");
      if (tagLabel !== activeTagLabel) {
        const tagExists = tags.find((t) => t.label === tagLabel);
        if (!tagExists) {
          return { valid: false };
        }
        setActiveTagLabel(tagExists.label);
      }

      if (snippetId !== activeSnippetId) {
        const snippetExists = data.snippets.find(
          (s) => s._id.toString() === snippetId && s.tags.includes(tagLabel)
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

  const checkListSnippet = ({
    listId,
    snippetId,
  }: {
    listId: string;
    snippetId: string;
  }) => {
    if (isSuccess) {
      setActiveBarMode("list");
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

  const checktTag = (tagLabel: string) => {
    if (isSuccess && tags) {
      setActiveBarMode("tag");
      if (tagLabel !== activeTagLabel) {
        const tagExists = tags.find((t) => t.label === tagLabel);

        if (!tagExists) {
          return { valid: false };
        }

        setActiveTagLabel(tagLabel);
      }

      const tagSnippets = data.snippets
        .filter((s) => s.tags.includes(tagLabel))
        .sort((a, b) => (a.title > b.title ? -1 : 1));

      if (tagSnippets.length > 0) {
        const defaultSnippet = tagSnippets[0];
        setActiveSnippetId(defaultSnippet._id.toString());

        return {
          valid: true,
          isEmpty: false,
          path: `/tags/${tagLabel}/${defaultSnippet._id.toString()}`,
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

  const updateSearchValue = (searchValue: string) => {
    if (searchValue.trim() && searchValue !== activeSearchValue) {
      setActiveSearchValue(searchValue);
    }
  };

  const checkSearchSnippet = ({
    searchValue,
    snippetId,
  }: {
    searchValue: string;
    snippetId: string;
  }) => {
    if (isSuccess) {
      setActiveBarMode("search");

      if (!searchValue.trim()) {
        return { valid: false };
      }

      const filteredSnippets = filterMatchingSnippets({
        snippets: data.snippets,
        searchValue: searchValue,
      }).sort((a, b) => (a.title > b.title ? -1 : 1));

      if (filteredSnippets.length > 0) {
        const matchingSnippet = filteredSnippets.find(
          (s) => s._id.toString() === snippetId
        );

        if (matchingSnippet) {
          setActiveSnippetId(matchingSnippet._id.toString());
          return { valid: true };
        }
      } else {
        setActiveSnippetId("");
        return { valid: false };
      }
    }
  };

  const checkSearch = (value: string) => {
    if (isSuccess) {
      setActiveBarMode("search");

      if (!value.trim()) {
        return { valid: false };
      }

      const filteredSnippets = filterMatchingSnippets({
        snippets: data.snippets,
        searchValue: value,
      }).sort((a, b) => (a.title > b.title ? -1 : 1));
      if (filteredSnippets.length > 0) {
        const defaultSnippet = filteredSnippets[0];
        setActiveSnippetId(defaultSnippet._id.toString());
        return {
          path: `search/${defaultSnippet._id.toString()}`,
          hasMatches: true,
          valid: true,
        };
      } else {
        setActiveSnippetId("");
        return { hasMatches: false, valid: true };
      }
    }
  };

  const checkList = (listId: string) => {
    if (isSuccess) {
      setActiveBarMode("list");
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
    initDefaultTag,
    isSuccess,
    checkList,
    checkListSnippet,
    checktTag,
    checkTagSnippet,
    checkSearch,
    checkSearchSnippet,
    updateSearchValue,
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
