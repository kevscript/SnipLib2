import Snippet from "@/models/Snippet";
import CameraIcon from "../icons/Camera";
import CopyIcon from "../icons/Copy";
import EditIcon from "../icons/Edit";
import FavoriteIcon from "../icons/Favorite";
import DeleteSnippetWidget from "../widgets/DeleteSnippetWidget";

type SnippetHeaderProps = {
  snippet: Snippet;
  onSubmit: () => void;
  onCancel: () => void;
  onReset: () => void;
};

const SnippetHeader = ({
  snippet,
  onSubmit,
  onCancel,
  onReset,
}: SnippetHeaderProps) => {
  return (
    <div className="flex justify-between w-full">
      <div className="flex text-xs font-bold gap-x-2">
        <span className="uppercase text-carbon-300">edit</span>
        <span>/</span>
        <span>{snippet.title}</span>
      </div>
      <div className="flex flex-nowrap gap-x-4">
        <button onClick={onSubmit}>Submit</button>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onReset}>Reset</button>
      </div>
    </div>
  );
};

export default SnippetHeader;
