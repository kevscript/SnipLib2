import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { useCallback, useEffect, useState } from "react";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { StreamLanguage } from "@codemirror/language";
import { langList } from "@/utils/langList";

type UseCodeMirrorParams = {
  doc: string;
  readOnly: boolean;
  lang: string;
};

export const useCodeMirror = ({ doc, readOnly, lang }: UseCodeMirrorParams) => {
  const [element, setElement] = useState<HTMLElement>();

  const ref = useCallback((node: HTMLElement | null) => {
    if (!node) return;

    setElement(node);
  }, []);

  useEffect(() => {
    if (!element) return;

    const langMode = langList.find((l) => l.id === lang)?.mode!;

    const customTheme = EditorView.theme({
      "&": {
        fontSize: "14px",
        height: "320px",
        paddingTop: "16px",
        paddingBottom: "16px",
      },
    });

    const startState = EditorState.create({
      doc: doc,
      extensions: [
        basicSetup,
        dracula,
        customTheme,
        // javascript({ jsx: true, typescript: true }),
        EditorState.readOnly.of(readOnly),
        StreamLanguage.define(langMode),
      ],
    });

    const view = new EditorView({
      state: startState,
      parent: element,
    });

    return () => view?.destroy();
  }, [element, doc, readOnly, lang]);

  return { ref };
};
