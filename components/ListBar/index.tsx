import { useEffect, useState } from "react";
import Snippet from "@/models/Snippet";
import List from "@/models/List";
import ListBarHeader from "./ListBarHeader";
import ListSnipItem from "./ListSnipItem";
import { UserData } from "@/models/UserData";

export type ListBarProps = {
  lists: UserData["lists"] | undefined;
  snippets: UserData["snippets"] | undefined;
  activeListId: string;
  activeSnippetId: string;
};

const ListBar = ({
  lists,
  snippets,
  activeListId,
  activeSnippetId,
}: ListBarProps) => {
  const [activeList, setActiveList] = useState<List | null>(null);

  const [activeListSnippets, setActiveListSnippets] = useState<
    Snippet[] | null
  >(null);

  useEffect(() => {
    if (activeListId && snippets && lists) {
      const list = lists.find((l) => l._id.toString() === activeListId);
      const listSnippets = snippets.filter(
        (s) => s.listId.toString() === activeListId
      );
      list && setActiveList(list);
      listSnippets && setActiveListSnippets(listSnippets);
    }
  }, [activeListId, snippets, lists]);

  if (!activeList) {
    return null;
  }

  return (
    <div className="flex flex-col flex-shrink-0 w-full h-screen pt-8 overflow-hidden bg-carbon-500">
      <ListBarHeader list={activeList} />

      {activeListSnippets && activeListSnippets.length > 0 && (
        <ul className="flex flex-col flex-1 overflow-y-auto">
          {activeListSnippets.map((snippet, i) => (
            <ListSnipItem
              key={snippet._id.toString()}
              snippet={snippet}
              listId={activeListId}
              isActive={activeSnippetId === snippet._id.toString()}
            />
          ))}
        </ul>
      )}

      {activeListSnippets && activeListSnippets.length === 0 && (
        <div className="w-full p-8 text-sm bg-carbon-400">
          <span>No snippet yet in this list.</span>
        </div>
      )}
    </div>
  );
};

export default ListBar;
