import { Tag } from "@/hooks/useUserData";
import TagItem from "./TagItem";

export type TagsListProps = {
  tags: Tag[] | null;
  activeTagLabel: string;
};

const TagsList = ({ tags, activeTagLabel }: TagsListProps) => {
  return (
    <ul className="flex flex-col justify-start w-full pt-4 overflow-y-auto list-none flex-nowrap scroll-hide overscroll-contain">
      {tags &&
        tags
          .sort((a, b) => (a.label > b.label ? 1 : -1))
          .map((tag, i) => {
            return (
              <TagItem
                key={tag.label}
                first={i === 0}
                active={activeTagLabel === tag.label}
                label={tag.label}
                amount={tag.amount}
              />
            );
          })}
    </ul>
  );
};

export default TagsList;
