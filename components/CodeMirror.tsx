import { useCodeMirror } from "@/hooks/useCodeMirror";
import { LanguageIds } from "@/utils/langList";
import { EditorView } from "codemirror";

export type CodeMirrorProps = {
  setEditorView?: (view: EditorView) => void;
  doc?: string;
  readOnly?: boolean;
  lang?: LanguageIds;
};

const CodeMirror = ({
  setEditorView,
  doc = "",
  readOnly = false,
  lang = "javascript",
}: CodeMirrorProps) => {
  const { editor, container } = useCodeMirror({
    doc,
    readOnly,
    lang,
    setEditorView,
  });

  return (
    <div className="w-full overflow-auto rounded bg-carbon-600">
      <p className="sr-only">
        The Editor uses Tab key to indent code. If you are focused on the editor
        and want to keep navigating instead of indenting code : press Escape,
        then Tab to move to the field after the editor. Or Escape, Shift-Tab to
        move to the field before the editor.
      </p>
      <div ref={container}></div>
    </div>
  );
};

export default CodeMirror;
