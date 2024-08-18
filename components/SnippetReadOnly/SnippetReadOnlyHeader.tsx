import Snippet from "@/models/Snippet";
import CameraIcon from "../icons/Camera";
import CopyIcon from "../icons/Copy";
import EditIcon from "../icons/Edit";
import FavoriteIcon from "../icons/Favorite";
import DeleteSnippetWidget from "../widgets/DeleteSnippetWidget";
import IconButton from "../shared/IconButton";
import EyeIcon from "../icons/Eye";
import LinkIcon from "../icons/Link";
import { useToasts } from "@/hooks/useToasts";

type SnippetReadOnlyHeaderProps = {
  snippet: Snippet;
  onEditToggle: () => void;
  onFavoriteToggle: () => void;
  onPublicToggle: () => void;
};

const SnippetReadOnlyHeader = ({
  snippet,
  onEditToggle,
  onFavoriteToggle,
  onPublicToggle,
}: SnippetReadOnlyHeaderProps) => {
  const { addToast } = useToasts();

  return (
    <div className="sticky top-0 z-10 flex flex-wrap justify-between w-full gap-2 py-8 bg-carbon-700">
      <div className="flex text-xs font-bold gap-x-2">
        <span className="uppercase text-carbon-300">snippet</span>
      </div>
      <div className="flex flex-nowrap gap-x-4">
        <IconButton
          onClick={onFavoriteToggle}
          icon={
            <FavoriteIcon
              className={`w-4 h-4 transition-all ease-out ${
                snippet.favorite
                  ? "fill-pink-500 stroke-transparent group-hover:fill-carbon-300"
                  : "fill-carbon-400 group-hover:stroke-pink-500"
              }`}
            />
          }
          tooltipId="favorite"
          tooltipText={
            snippet.favorite ? "Remove from favorites" : "Add to favorites"
          }
        />
        <IconButton
          onClick={onPublicToggle}
          icon={
            <EyeIcon
              className={`w-3.5 h-3.5 transition-all ease-out ${
                snippet.public
                  ? "stroke-emerald-400 group-hover:stroke-white"
                  : "stroke-white group-hover:stroke-emerald-400"
              }`}
              off={snippet.public ? false : true}
            />
          }
          tooltipId="public"
          tooltipText={snippet.public ? "Make private" : "Make public"}
        />
        {snippet.public && (
          <IconButton
            onClick={() => {
              navigator.clipboard.writeText(
                `${
                  window && window.location.origin
                    ? `${window.location.origin}/snippet/${snippet._id}`
                    : `No url Found`
                }`
              );
              addToast({
                id: Date.now(),
                title: "Public link copied to clipboard",
                type: "success",
              });
            }}
            icon={
              <LinkIcon className="w-4 h-4 transition-all ease-out group-hover:stroke-marine-50" />
            }
            tooltipId="public-link"
            tooltipText="Public Url"
          />
        )}
        <IconButton
          onClick={() => {
            navigator.clipboard.writeText(snippet.content);
            addToast({
              id: Date.now(),
              title: "Snippet copied to clipboard",
              type: "success",
            });
          }}
          icon={
            <CopyIcon className="w-4 h-4 transition-all ease-out group-hover:stroke-marine-50" />
          }
          tooltipId="copy"
          tooltipText="Copy snippet"
        />
        {/* <IconButton
          onClick={() => console.log("snap it")}
          icon={
            <CameraIcon className="w-4 h-4 transition-all ease-out group-hover:stroke-marine-50" />
          }
          tooltipId="snapit"
          tooltipText="Take snapshot"
        /> */}

        <IconButton
          onClick={onEditToggle}
          icon={
            <EditIcon className="w-4 h-4 transition-all ease-out group-hover:stroke-marine-50" />
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
