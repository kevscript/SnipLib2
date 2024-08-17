import Snippet from "@/models/Snippet";
import Button from "../shared/Button";
import EditSnippetWidget from "../widgets/EditSnippetWidget";

type SnippetFormEditHeaderProps = {
  snippet: Snippet;
  onSubmit: () => void;
  onCancel: () => void;
  onReset: () => void;
};

const SnippetFormEditHeader = ({
  snippet,
  onSubmit,
  onCancel,
  onReset,
}: SnippetFormEditHeaderProps) => {
  return (
    <div className="flex flex-wrap justify-between w-full gap-2 gap-y-4">
      <div className="flex text-xs font-bold gap-x-2">
        <span className="uppercase text-carbon-300">edit</span>
        <span>/</span>
        <span>{snippet.title}</span>
      </div>
      <div className="flex flex-nowrap gap-x-4">
        <EditSnippetWidget onConfirm={onSubmit} snippet={snippet} />
        <Button label="Cancel" onClick={onCancel} variety="secondary" />
        <Button label="Reset" onClick={onReset} variety="ternary" />
      </div>
    </div>
  );
};

export default SnippetFormEditHeader;
