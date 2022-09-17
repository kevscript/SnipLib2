import { TagItem } from "@/mocks/tags";
import ListItem from "./CollectionItem";

export type TagsListProps = {
  tags: TagItem[];
  activeTag: string;
};

const TagsList = ({ tags, activeTag }: TagsListProps) => {
  return (
    <ul className="flex flex-col justify-start w-full pt-4 overflow-y-auto list-none flex-nowrap scroll-hide overscroll-contain">
      {tags.map((tag, i) => (
        <li key={tag.label}>{tag.label}</li>
        // <ListItem
        //   key={tag.label}
        //   first={i === 0}
        //   label={tag.label}
        //   amount={tag.amount}
        //   active={tag.label === activeTag}
        // />
      ))}
    </ul>
  );
};

export default TagsList;
