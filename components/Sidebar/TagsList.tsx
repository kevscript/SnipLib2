import { TagItem as TagItemType } from "@/mocks/tags";
import TagItem from "./TagItem";

export type TagsListProps = {
  tags: TagItemType[] | null;
  activeTagLabel: string;
  activateTag: (label: string) => void;
};

const TagsList = ({ tags, activeTagLabel, activateTag }: TagsListProps) => {
  return (
    <ul className="flex flex-col justify-start w-full pt-4 overflow-y-auto list-none flex-nowrap scroll-hide overscroll-contain">
      {tags &&
        tags
          .sort((a, b) => (a.amount > b.amount ? -1 : 1))
          .map((tag, i) => {
            return (
              <TagItem
                key={tag.label}
                first={i === 0}
                active={activeTagLabel === tag.label}
                label={tag.label}
                amount={tag.amount}
                activateTag={activateTag}
              />
            );
          })}
    </ul>
  );
};

export default TagsList;
