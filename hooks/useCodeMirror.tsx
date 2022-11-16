import { EditorView, basicSetup } from "codemirror";
import { keymap } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { useEffect, useRef, useState } from "react";
import { indentWithTab, indentMore } from "@codemirror/commands";
import { StreamLanguage, indentUnit } from "@codemirror/language";
import { langList, LanguageIds } from "@/utils/langList";
import { defaultPreferences, EditorPreferences } from "./usePreferences";
import { getThemes } from "@/utils/getThemes";

type UseCodeMirrorParams = {
  doc?: string;
  readOnly?: boolean;
  lang?: LanguageIds;
  handleEditorContent?: (value: string) => void;
  preferences: EditorPreferences;
};

export const useCodeMirror = ({
  doc,
  readOnly = false,
  lang = "javascript",
  handleEditorContent,
  preferences = defaultPreferences,
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
    if (container.current && preferences) {
      const langMode = langList.find((l) => l.id === lang)!.mode;
      const customStyles = EditorView.theme({
        "&": {
          fontFamily: preferences.font,
          fontSize: `${preferences.fontSize}px`,
          height: "100%",
          minHeight: "128px",
        },
        ".cm-content": {
          paddingTop: "16px",
          paddingBottom: "16px",
          "white-space": "pre-wrap",
        },
      });

      const customTheme = getThemes().find(
        (t) => t.name === preferences.theme
      )!.theme;

      const customExtensions = [
        basicSetup,
        customStyles,
        customTheme,
        keymap.of([indentWithTab]),
        indentUnit.of(" ".repeat(preferences.tabSpacing)),
        EditorState.readOnly.of(readOnly),
        StreamLanguage.define(langMode),
        EditorView.updateListener.of((x) => {
          if (x.focusChanged) {
            editor.current?.hasFocus ? setisFocused(true) : setisFocused(false);
          }

          if (x.docChanged) {
            const currDoc = x.state.doc.toString() as string;
            handleEditorContent && handleEditorContent(currDoc);
          }
        }),
        EditorView.lineWrapping,
      ];

      if (!editor.current) {
        const initView = new EditorView({
          state: EditorState.create({
            doc: doc,
            extensions: customExtensions,
          }),
          parent: container.current,
        });

        editor.current = initView;
      } else {
        const preservedDoc = editor.current.state.doc;
        editor.current.destroy();
        const newView = new EditorView({
          state: EditorState.create({
            doc: readOnly ? doc : preservedDoc,
            extensions: customExtensions,
          }),
          parent: container.current,
        });
        editor.current = newView;
      }
    }

    return () => {
      editor.current?.destroy();
    };
  }, [doc, readOnly, lang, handleEditorContent, preferences]);

  return { container, editor, isFocused, setDoc };
};
