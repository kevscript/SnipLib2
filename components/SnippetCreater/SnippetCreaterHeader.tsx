import Link from "next/link";

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
        <button
          className="px-4 py-1 rounded-sm bg-marine-500 drop-shadow-sm"
          onClick={onSubmit}
        >
          Create
        </button>

        <button
          className="px-4 py-1 rounded-sm bg-carbon-400 drop-shadow-sm"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SnippetCreaterHeader;