import {
  javascript,
  typescript,
  json,
} from "@codemirror/legacy-modes/mode/javascript";
import { css } from "@codemirror/legacy-modes/mode/css";
import { html } from "@codemirror/legacy-modes/mode/xml";
import { python } from "@codemirror/legacy-modes/mode/python";
import { cpp, csharp, java } from "@codemirror/legacy-modes/mode/clike";
import { rust } from "@codemirror/legacy-modes/mode/rust";
import { StreamParser } from "@codemirror/language";

export type LanguageIds = typeof langList[number]["id"];

export type LanguageListItem = {
  readonly label: string;
  readonly id: string;
  readonly mode: StreamParser<unknown>;
};

export const langList = [
  {
    label: "Javascript",
    id: "javascript",
    mode: javascript,
  },
  {
    label: "Typescript",
    id: "typescript",
    mode: typescript,
  },
  {
    label: "JSON",
    id: "json",
    mode: json,
  },
  {
    label: "Css",
    id: "css",
    mode: css,
  },
  {
    label: "Html",
    id: "html",
    mode: html,
  },
  {
    label: "Python",
    id: "python",
    mode: python,
  },
  {
    label: "Rust",
    id: "rust",
    mode: rust,
  },
  {
    label: "C++",
    id: "cpp",
    mode: cpp,
  },
  {
    label: "C#",
    id: "csharp",
    mode: csharp,
  },
  {
    label: "Java",
    id: "java",
    mode: java,
  },
] as const;
