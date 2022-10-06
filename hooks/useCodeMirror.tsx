import { EditorView, basicSetup } from "codemirror";
import { keymap } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { useEffect, useRef } from "react";
import { indentWithTab } from "@codemirror/commands";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { StreamLanguage } from "@codemirror/language";
import { langList } from "@/utils/langList";

type UseCodeMirrorParams = {
  setEditorView?: (view: EditorView) => void;
  doc?: string;
  readOnly?: boolean;
  lang?: string;
};

export const useCodeMirror = ({
  setEditorView,
  doc = "",
  readOnly = false,
  lang = "javascript",
}: UseCodeMirrorParams) => {
  const container = useRef<null | HTMLDivElement>(null);
  const editor = useRef<null | EditorView>(null);

  useEffect(() => {
    if (container.current) {
      const langMode = langList.find((l) => l.id === lang)?.mode!;
      const customStyles = EditorView.theme({
        "&": {
          fontSize: "14px",
          height: "320px",
          paddingTop: "16px",
          paddingBottom: "16px",
        },
      });

      if (!editor.current) {
        const initView = new EditorView({
          state: EditorState.create({
            doc: doc,
            extensions: [
              basicSetup,
              dracula,
              customStyles,
              keymap.of([indentWithTab]),
              EditorState.readOnly.of(readOnly),
              StreamLanguage.define(langMode),
            ],
          }),
          parent: container.current,
        });

        editor.current = initView;
        setEditorView && setEditorView(initView);
      } else {
        const doc = editor.current.state.doc;

        editor.current.destroy();
        const newView = new EditorView({
          state: EditorState.create({
            doc: doc,
            extensions: [
              basicSetup,
              dracula,
              customStyles,
              keymap.of([indentWithTab]),
              EditorState.readOnly.of(readOnly),
              StreamLanguage.define(langMode),
            ],
          }),
          parent: container.current,
        });
        editor.current = newView;
        setEditorView && setEditorView(newView);
      }
    }

    return () => {
      editor.current?.destroy();
    };
  }, [doc, readOnly, lang, setEditorView]);

  return { container, editor };
};
