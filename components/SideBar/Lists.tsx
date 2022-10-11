import List from "@/models/List";
import Snippet from "@/models/Snippet";
import ListItem from "./ListItem";

export type ListsProps = {
  lists: List[];
  snippets: Snippet[];
  activeListId: string;
};

const Lists = ({ lists, activeListId, snippets }: ListsProps) => {
  return (
    <ul className="flex flex-col justify-start w-full pt-4 overflow-y-auto list-none flex-nowrap scroll-hide overscroll-contain">
      {lists.map((list, i) => (
        <ListItem
          key={list._id.toString()}
          first={i === 0}
          label={list.label}
          amount={
            snippets.filter((s) => s.listId.toString() === list._id.toString())
              .length
          }
          active={list._id.toString() === activeListId}
          listId={list._id.toString()}
        />
      ))}
    </ul>
  );
};

export default Lists;
