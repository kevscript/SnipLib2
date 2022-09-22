import { useCodeMirror } from "@/hooks/useCodeMirror";

export type CodeMirrorProps = {
  doc: string;
  readOnly: boolean;
  lang: string;
};

const CodeMirror = ({ doc, readOnly, lang }: CodeMirrorProps) => {
  const { ref } = useCodeMirror({ doc, readOnly, lang });

  return (
    <div className="w-full mt-2 overflow-auto rounded bg-carbon-600">
      <div ref={ref}></div>
    </div>
  );
};

export default CodeMirror;
