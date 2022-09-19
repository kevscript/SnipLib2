import { Collection } from "@/mocks/collections";
import { Snippet } from "@/mocks/snippets";
import { TagItem } from "@/mocks/tags";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { createContext, useContext, useState } from "react";

export type UserData = {
  isLoading: boolean;
  isError: boolean;
  collections: Collection[];
  snippets: Snippet[] | null;
  tags: TagItem[] | null;
  error: any;
  activeCollectionId: string;
  activeSnippetId: string;
  activeTagLabel: string;
  initializeApp: () => void;
  initializeFromCollections: () => void;
  initializeFromTags: () => void;
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
  checkSnippetPathFromTags: ({
    tagLabel,
    snippetId,
  }: {
    tagLabel: string;
    snippetId: string;
  }) => {
    isCorrect: boolean;
    tagLabel?: string;
    collectionId?: string | null;
    snippetId: string | null;
  };
  checkCollectionPath: ({ collectionId }: { collectionId: string }) => {
    isCorrect: boolean;
    collectionId: string | null;
    snippetId: string | null;
  };
  checkTagPath: ({ tagLabel }: { tagLabel: string }) => {
    isCorrect: boolean;
    collectionId?: string | null;
    tagLabel?: string;
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
    onSuccess: (collections) => {
      // init tags and init flatten snippets
      const initTags: { [key: string]: number } = {};
      const flattenSnippets: Snippet[] = [];

      collections.forEach((col: any) => {
        flattenSnippets.push(...col.snippets);
        col.snippets.forEach((snip: any) => {
          snip.tags.forEach((tag: string) => {
            return initTags[tag] ? initTags[tag]++ : (initTags[tag] = 1);
          });
        });
      });

      setSnnippets(flattenSnippets);

      const tagsArr = Object.entries(initTags)
        .map(([label, amount]) => ({
          label: label,
          amount: amount,
        }))
        .sort((a, b) => (a.amount > b.amount ? 1 : -1));

      setTags(tagsArr);
    },
  });

  const [tags, setTags] = useState<TagItem[] | null>(null);
  const [snippets, setSnnippets] = useState<Snippet[] | null>(null);

  const [activeCollectionId, setActiveCollectionId] = useState("");
  const [activeSnippetId, setActiveSnippetId] = useState("");
  const [activeTagLabel, setActiveTagLabel] = useState("");

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

  const initializeFromCollections = () => {
    if (collections) {
      if (collections.length > 0) {
        const firstCollection = collections[0];
        setActiveCollectionId(firstCollection._id);
        setActiveTagLabel("");
        if (firstCollection.snippets.length > 0) {
          setActiveSnippetId(firstCollection.snippets[0]._id);
        } else {
          setActiveSnippetId("");
        }
      }
    }
  };

  const initializeFromTags = () => {
    if (snippets && tags) {
      if (tags.length > 0) {
        const firstTag = tags[0];
        setActiveTagLabel(firstTag.label);
        setActiveCollectionId("");
        let firstSnippetWithTag = snippets.find((snip) =>
          snip.tags.includes(firstTag.label)
        );

        firstSnippetWithTag && setActiveSnippetId(firstSnippetWithTag._id);
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

  const checkTagPath = ({ tagLabel }: { tagLabel: string }) => {
    const tag = tags?.find((tag) => tag.label === tagLabel);
    if (tag) {
      setActiveTagLabel(tagLabel);
      setActiveCollectionId("");

      const snip = snippets?.find((snip) => snip.tags.includes(tagLabel));
      if (snip) {
        setActiveSnippetId(snip._id);

        return {
          isCorrect: true,
          tagLabel,
          snippetId: snip._id,
        };
      } else {
        return {
          isCorrect: true,
          tagLabel,
          snippetId: null,
        };
      }
    }

    // get default snippet
    const { collectionId, snippetId } = getDefaultSnippet();
    return {
      isCorrect: false,
      collectionId,
      snippetId,
    };
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
      setActiveTagLabel("");
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

  const checkSnippetPathFromTags = ({
    tagLabel,
    snippetId,
  }: {
    tagLabel: string;
    snippetId: string;
  }) => {
    const tag = tags?.find((tag) => tag.label === tagLabel);
    if (tag) {
      setActiveTagLabel(tag.label);
      const snip = snippets?.find((snip) => snip._id === snippetId);
      if (snip?.tags.includes(tag.label)) {
        setActiveSnippetId(snip._id);

        return {
          isCorrect: true,
          tagLabel,
          snippetId,
        };
      }
    }

    // get default snippet
    const { collectionId: cId, snippetId: sId } = getDefaultSnippet();
    return {
      isCorrect: false,
      collectionId: cId,
      snippetId: sId,
    };
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
    tags,
    snippets,
    error,
    activeCollectionId,
    activeSnippetId,
    activeTagLabel,
    initializeApp,
    initializeFromCollections,
    initializeFromTags,
    checkSnippetPath,
    checkCollectionPath,
    checkTagPath,
    checkSnippetPathFromTags,
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
