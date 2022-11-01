import Snippet from "@/models/Snippet";
import CameraIcon from "../icons/Camera";
import CopyIcon from "../icons/Copy";
import EditIcon from "../icons/Edit";
import FavoriteIcon from "../icons/Favorite";
import DeleteSnippetWidget from "../widgets/DeleteSnippetWidget";
import IconButton from "../shared/IconButton";

type SnippetReadOnlyHeaderProps = {
  snippet: Snippet;
  triggerEditMode: () => void;
  toggleFavorite: () => void;
};

const SnippetReadOnlyHeader = ({
  snippet,
  triggerEditMode,
  toggleFavorite,
}: SnippetReadOnlyHeaderProps) => {
  return (
    <div className="flex justify-between w-full">
      <div className="flex text-xs font-bold gap-x-2">
        <span className="uppercase text-carbon-300">snippet</span>
        <span>/</span>
        <span>{snippet.title}</span>
      </div>
      <div className="flex flex-nowrap gap-x-4">
        <IconButton
          onClick={toggleFavorite}
          icon={
            <FavoriteIcon
              className={`w-4 h-4 transition-all ease-out group-hover:scale-105 ${
                snippet.favorite
                  ? "fill-pink-500 stroke-transparent"
                  : "fill-carbon-400 group-hover:stroke-pink-500"
              }`}
            />
          }
          tooltipId="favorite"
          tooltipText="Add to Favorites"
        />
        <IconButton
          onClick={() => {
            navigator.clipboard.writeText(snippet.content);
          }}
          icon={
            <CopyIcon className="w-4 h-4 transition-all ease-out group-hover:scale-105 group-hover:stroke-marine-300" />
          }
          tooltipId="copy"
          tooltipText="Copy snippet"
        />
        <IconButton
          onClick={() => console.log("snap it")}
          icon={
            <CameraIcon className="w-4 h-4 transition-all ease-out group-hover:scale-105 group-hover:stroke-marine-300" />
          }
          tooltipId="snapit"
          tooltipText="Take snap"
        />

        <IconButton
          onClick={triggerEditMode}
          icon={
            <EditIcon className="w-4 h-4 transition-all ease-out group-hover:scale-105 group-hover:stroke-marine-300" />
          }
          tooltipId="edit"
          tooltipText="Edit snippet"
        />

        <DeleteSnippetWidget snippet={snippet} />
      </div>
    </div>
  );
};

export default SnippetReadOnlyHeader;
