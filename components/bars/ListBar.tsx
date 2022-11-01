import { useEffect, useState } from "react";
import Snippet from "@/models/Snippet";
import List from "@/models/List";
import { UserData } from "@/models/UserData";
import { langList } from "@/utils/langList";
import { motion } from "framer-motion";
import SnipItem from "./SnipItem";
import BarHeaderWrapper from "./BarHeaderWrapper";
import Link from "next/link";
import PlusIcon from "@/components/icons/Plus";
import IconButton from "@/components/shared/IconButton";
import EditListWidget from "@/components/widgets/EditListWidget";
import DeleteListWidget from "@/components/widgets/DeleteListWidget";

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
      const listSnippets = snippets
        .filter((s) => s.listId.toString() === activeListId)
        .sort((a, b) => (a.title > b.title ? 1 : -1));
      list && setActiveList(list);
      listSnippets && setActiveListSnippets(listSnippets);
    }
  }, [activeListId, snippets, lists]);

  if (!activeList) {
    return null;
  }

  return (
    <motion.div
      className="flex flex-col flex-shrink-0 h-full overflow-hidden w-96 bg-carbon-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      <BarHeaderWrapper title="list" label={activeList.label}>
        <ul className="flex items-center flex-nowrap gap-x-2">
          <Link href={{ pathname: "/snippet/create" }}>
            <div>
              <IconButton
                icon={
                  <PlusIcon className="w-4 h-4 transition-all ease-out group-hover:scale-105" />
                }
                scale="small"
                className="hover:bg-marine-500"
                tooltipId="new-snippet"
                tooltipText="New snippet"
              />
            </div>
          </Link>
          <EditListWidget list={activeList} />
          {!activeList.original && <DeleteListWidget list={activeList} />}
        </ul>
      </BarHeaderWrapper>

      {activeListSnippets && activeListSnippets.length > 0 && (
        <ul className="flex flex-col flex-1 overflow-y-auto">
          {activeListSnippets.map((snippet, i) => (
            <SnipItem
              key={snippet._id.toString()}
              snippet={snippet}
              isActive={activeSnippetId === snippet._id.toString()}
              path={`/lists/${activeListId}/${snippet._id.toString()}`}
              color={langList.find((l) => l.id === snippet.language)?.color}
            />
          ))}
        </ul>
      )}

      {activeListSnippets && activeListSnippets.length === 0 && (
        <div className="w-full p-8 text-sm bg-carbon-400">
          <span>No snippet yet in this list.</span>
        </div>
      )}
    </motion.div>
  );
};

export default ListBar;
