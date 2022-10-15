import { EditorView, basicSetup } from "codemirror";
import { keymap } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { useEffect, useRef, useState } from "react";
import { indentWithTab } from "@codemirror/commands";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { StreamLanguage } from "@codemirror/language";
import { langList, LanguageIds } from "@/utils/langList";

type UseCodeMirrorParams = {
  doc?: string;
  readOnly?: boolean;
  lang?: LanguageIds;
  handleEditorContent?: (value: string) => void;
};

export const useCodeMirror = ({
  doc = "",
  readOnly = false,
  lang = "javascript",
  handleEditorContent,
}: UseCodeMirrorParams) => {
  const container = useRef<null | HTMLDivElement>(null);
  const editor = useRef<null | EditorView>(null);
  const [isFocused, setisFocused] = useState(false);

  const setDoc = (text: string) => {
    editor.current?.dispatch({
      changes: { from: 0, to: editor.current.state.doc.length, insert: text },
    });
  };
  useEffect(() => {
    if (container.current) {
      const langMode = langList.find((l) => l.id === lang)!.mode;
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
              EditorView.updateListener.of((x) => {
                if (x.focusChanged) {
                  editor.current?.hasFocus
                    ? setisFocused(true)
                    : setisFocused(false);
                }

                if (x.docChanged) {
                  const currDoc = x.state.doc.toString() as string;
                  handleEditorContent && handleEditorContent(currDoc);
                }
              }),
            ],
          }),
          parent: container.current,
        });

        editor.current = initView;
      } else {
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
              EditorView.updateListener.of((x) => {
                if (x.focusChanged) {
                  editor.current?.hasFocus
                    ? setisFocused(true)
                    : setisFocused(false);
                }

                if (x.docChanged) {
                  const currDoc = x.state.doc.toString() as string;
                  handleEditorContent && handleEditorContent(currDoc);
                }
              }),
            ],
          }),
          parent: container.current,
        });
        editor.current = newView;
      }
    }

    return () => {
      editor.current?.destroy();
    };
  }, [doc, readOnly, lang, handleEditorContent]);

  return { container, editor, isFocused, setDoc };
};
