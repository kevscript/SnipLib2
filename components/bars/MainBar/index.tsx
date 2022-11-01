import { BarMode, Tag } from "@/hooks/useUserData";
import { UserData } from "models/UserData";
import FolderIcon from "@/components/icons/Folder";
import TagIcon from "@/components/icons/Tag";
import Switcher from "@/components/shared/Switcher";
import CreateListWidget from "@/components/widgets/CreateListWidget";
import Authbox from "./Authbox";
import Searchbox from "./Searchbox";
import TagsList from "./TagsList";
import FavLink from "./FavLink";
import ListItem from "./ListItem";

export type MainBarProps = {
  activeBarMode: BarMode;
  lists: UserData["lists"] | undefined;
  snippets: UserData["snippets"] | undefined;
  tags: Tag[] | undefined;
  activeListId: string;
  activeTagLabel: string;
  updateSearchValue: (val: string) => void;
};

const MainBar = ({
  activeBarMode,
  activeListId,
  activeTagLabel,
  lists,
  snippets,
  tags,
  updateSearchValue,
}: MainBarProps) => {
  return (
    <div className="flex flex-col h-full p-8 overflow-x-hidden overflow-y-auto w-80 bg-carbon-600">
      <div className="flex items-center justify-between flex-nowrap">
        <h1 className="text-2xl font-bold uppercase">Sniplib</h1>
        <Switcher />
      </div>

      <Searchbox updateSearchValue={updateSearchValue} />

      <div className="flex-1 my-8 overflow-y-auto">
        <FavLink
          isActive={activeBarMode === "fav"}
          snippetsAmount={
            snippets?.filter((s) => s.favorite === true).length || 0
          }
        />

        <div className="flex items-center justify-between w-full mt-8 overflow-hidden flex-nowrap">
          <div className="flex items-center flex-nowrap">
            <FolderIcon className="w-4 h-4 stroke-marine" />
            <span className="ml-4 text-xs font-bold uppercase">Lists</span>
          </div>
          <div className="flex items-center flex-nowrap">
            {lists && (
              <span className="text-sm text-carbon-300">{lists.length}/32</span>
            )}

            <CreateListWidget />
          </div>
        </div>

        {lists && snippets && (
          <ul className="flex flex-col justify-start flex-shrink-0 w-full pt-4 overflow-y-auto list-none flex-nowrap scroll-hide overscroll-contain">
            {lists.map((list, i) => (
              <ListItem
                key={list._id.toString()}
                first={i === 0}
                label={list.label}
                amount={
                  snippets.filter(
                    (s) => s.listId.toString() === list._id.toString()
                  ).length
                }
                active={list._id.toString() === activeListId}
                path={`lists/${list._id.toString()}`}
              />
            ))}
          </ul>
        )}

        <div className="flex items-center justify-between mt-8 flex-nowrap">
          <div className="flex items-center flex-nowrap">
            <TagIcon className="w-4 h-4 stroke-marine" />
            <span className="ml-4 text-xs font-bold uppercase">Tags</span>
          </div>
        </div>

        {tags && (
          <TagsList
            tags={tags}
            activeTagLabel={activeBarMode === "tag" ? activeTagLabel : ""}
          />
        )}
      </div>

      <Authbox />
    </div>
  );
};

export default MainBar;
