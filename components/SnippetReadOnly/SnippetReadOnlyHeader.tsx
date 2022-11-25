import Snippet from "@/models/Snippet";
import CameraIcon from "../icons/Camera";
import CopyIcon from "../icons/Copy";
import EditIcon from "../icons/Edit";
import FavoriteIcon from "../icons/Favorite";
import DeleteSnippetWidget from "../widgets/DeleteSnippetWidget";
import IconButton from "../shared/IconButton";
import EyeIcon from "../icons/Eye";
import { useState } from "react";

type SnippetReadOnlyHeaderProps = {
  snippet: Snippet;
  triggerEditMode: () => void;
  toggleFavorite: () => void;
  togglePublic: () => void;
};

const SnippetReadOnlyHeader = ({
  snippet,
  triggerEditMode,
  toggleFavorite,
  togglePublic,
}: SnippetReadOnlyHeaderProps) => {
  return (
    <div className="flex justify-between w-full">
      <div className="flex text-xs font-bold gap-x-2">
        <span className="uppercase text-carbon-300">snippet</span>
      </div>
      <div className="flex flex-nowrap gap-x-4">
        <IconButton
          onClick={toggleFavorite}
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
          onClick={togglePublic}
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
        <IconButton
          onClick={() => {
            navigator.clipboard.writeText(snippet.content);
          }}
          icon={
            <CopyIcon className="w-4 h-4 transition-all ease-out group-hover:stroke-marine-50" />
          }
          tooltipId="copy"
          tooltipText="Copy snippet"
        />
        <IconButton
          onClick={() => console.log("snap it")}
          icon={
            <CameraIcon className="w-4 h-4 transition-all ease-out group-hover:stroke-marine-50" />
          }
          tooltipId="snapit"
          tooltipText="Take snapshot"
        />

        <IconButton
          onClick={triggerEditMode}
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
