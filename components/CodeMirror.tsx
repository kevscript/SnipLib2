import { useCodeMirror } from "@/hooks/useCodeMirror";

export type CodeMirrorProps = {
  doc: string;
  readOnly: boolean;
};

const CodeMirror = ({ doc, readOnly }: CodeMirrorProps) => {
  const { ref } = useCodeMirror({ doc, readOnly });

  return (
    <div className="w-full px-2 py-4 mt-2 overflow-auto rounded bg-carbon-600 h-96">
      <div ref={ref}></div>
    </div>
  );
};

export default CodeMirror;
