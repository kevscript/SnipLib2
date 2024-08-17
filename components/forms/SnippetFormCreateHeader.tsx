import Button from "../shared/Button";

type SnippetFormCreateHeaderProps = {
  onSubmit: () => void;
  onCancel: () => void;
};
const SnippetFormCreateHeader = ({
  onSubmit,
  onCancel,
}: SnippetFormCreateHeaderProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between flex-1 gap-2 gap-y-4">
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

export default SnippetFormCreateHeader;
