import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { useCallback, useEffect, useState } from "react";

type UseCodeMirrorParams = {
  doc: string;
  readOnly: boolean;
};

export const useCodeMirror = ({ doc, readOnly }: UseCodeMirrorParams) => {
  const [element, setElement] = useState<HTMLElement>();

  const ref = useCallback((node: HTMLElement | null) => {
    if (!node) return;

    setElement(node);
  }, []);

  useEffect(() => {
    if (!element) return;

    const view = new EditorView({
      state: EditorState.create({
        doc: doc,
        extensions: [
          basicSetup,
          EditorView.theme({
            ".cm-line": { background: "transparent" },
            ".cm-activeLine": { background: "transparent" },
            ".cm-gutter": { background: "transparent" },
            ".cm-gutters": { background: "transparent", border: "none" },
            ".cm-gutterElement": { background: "transparent" },
            ".cm-activeLineGutter": { background: "transparent" },
          }),
          EditorState.readOnly.of(readOnly),
        ],
      }),
      parent: element,
    });

    return () => view?.destroy();
  }, [element, doc]);

  return { ref };
};
