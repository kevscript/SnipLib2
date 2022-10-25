import Link from "next/link";
import Button from "../shared/Button";

type SnippetCreaterHeaderProps = {
  onSubmit: () => void;
  onCancel: () => void;
};
const SnippetCreaterHeader = ({
  onSubmit,
  onCancel,
}: SnippetCreaterHeaderProps) => {
  return (
    <div className="flex items-center justify-between flex-1">
      <div className="flex text-xs font-bold gap-x-2">
        <span className="uppercase text-carbon-300">Create</span>
        <span>/</span>
        <span>New Snippet</span>
      </div>
      <div className="flex flex-nowrap gap-x-4">
        <Button label="Create" variety="primary" onClick={onSubmit} />
        <Button label="Cancel" variety="secondary" onClick={onCancel} />
      </div>
    </div>
  );
};

export default SnippetCreaterHeader;
