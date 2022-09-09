import { TagItem } from "@/mocks/tags";
import ListItem from "./ListItem";

export type TagsListProps = {
  tags: TagItem[];
  activeTag: string;
  handleActiveTag: (tag: string) => void;
};

const TagsList = ({ tags, activeTag, handleActiveTag }: TagsListProps) => {
  return (
    <ul className="flex flex-col justify-start w-full pt-4 overflow-y-auto list-none flex-nowrap min-h-[180px] scroll-hide overscroll-contain">
      {tags.map((tag, i) => (
        <ListItem
          key={tag.label}
          first={i === 0}
          label={tag.label}
          amount={tag.amount}
          active={tag.label === activeTag}
          handleActive={() => handleActiveTag(tag.label)}
        />
      ))}
    </ul>
  );
};

export default TagsList;
