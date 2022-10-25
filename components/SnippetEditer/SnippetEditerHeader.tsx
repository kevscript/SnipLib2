import Snippet from "@/models/Snippet";
import Button from "../shared/Button";
import EditSnippetWidget from "../widgets/EditSnippetWidget";

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
        <Button label="Reset" onClick={onReset} variety="ternary" />
        <EditSnippetWidget onConfirm={onSubmit} snippet={snippet} />

        <Button label="Cancel" onClick={onCancel} variety="secondary" />
      </div>
    </div>
  );
};

export default SnippetHeader;
