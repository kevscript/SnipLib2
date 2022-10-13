import Snippet from "@/models/Snippet";
import CameraIcon from "../icons/Camera";
import CopyIcon from "../icons/Copy";
import EditIcon from "../icons/Edit";
import FavoriteIcon from "../icons/Favorite";
import DeleteSnippetWidget from "../widgets/DeleteSnippetWidget";

type SnippetHeaderProps = {
  snippet: Snippet;
};

const SnippetHeader = ({ snippet }: SnippetHeaderProps) => {
  return (
    <div className="flex justify-between w-full">
      <div className="flex text-xs font-bold gap-x-2">
        <span className="uppercase text-carbon-300">snippet</span>
        <span>/</span>
        <span>{snippet.title}</span>
      </div>
      <div className="flex flex-nowrap gap-x-4">
        <li className="flex items-center justify-center w-8 h-8 transition-all ease-out rounded cursor-pointer bg-carbon-400 group hover:scale-105">
          <FavoriteIcon
            className={`w-4 h-4 transition-all ease-out group-hover:scale-105 ${
              snippet.favorite
                ? "fill-pink-500 stroke-transparent"
                : "fill-carbon-400 group-hover:stroke-pink-500"
            }`}
          />
        </li>
        <li
          className="flex items-center justify-center w-8 h-8 transition-all ease-out rounded cursor-pointer bg-carbon-400 group hover:scale-105"
          onClick={() => {
            navigator.clipboard.writeText(snippet.content);
          }}
        >
          <CopyIcon className="w-4 h-4 transition-all ease-out group-hover:scale-105 group-hover:stroke-cyan-500" />
        </li>
        <li className="flex items-center justify-center w-8 h-8 transition-all ease-out rounded cursor-pointer bg-carbon-400 group hover:scale-105">
          <CameraIcon className="w-4 h-4 transition-all ease-out group-hover:scale-105 group-hover:stroke-violet-500" />
        </li>
        <li className="flex items-center justify-center w-8 h-8 transition-all ease-out rounded cursor-pointer bg-carbon-400 group hover:scale-105">
          <EditIcon className="w-4 h-4 transition-all ease-out group-hover:scale-105 group-hover:stroke-yellow-500" />
        </li>

        <DeleteSnippetWidget snippet={snippet} />
      </div>
    </div>
  );
};

export default SnippetHeader;
