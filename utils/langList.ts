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
  readonly color: string;
};

export const langList = [
  {
    label: "Javascript",
    id: "javascript",
    mode: javascript,
    color: "#F0DB4F",
  },
  {
    label: "Typescript",
    id: "typescript",
    mode: typescript,
    color: "#007acc",
  },
  {
    label: "JSON",
    id: "json",
    mode: json,
    color: "#FFF",
  },
  {
    label: "Css",
    id: "css",
    mode: css,
    color: "#2965f1",
  },
  {
    label: "Html",
    id: "html",
    mode: html,
    color: "#f06529",
  },
  {
    label: "Python",
    id: "python",
    mode: python,
    color: "#306998",
  },
  {
    label: "Rust",
    id: "rust",
    mode: rust,
    color: "#b7410e",
  },
  {
    label: "C++",
    id: "cpp",
    mode: cpp,
    color: "#659ad2",
  },
  {
    label: "C#",
    id: "csharp",
    mode: csharp,
    color: "#823085",
  },
  {
    label: "Java",
    id: "java",
    mode: java,
    color: "#ED2025",
  },
] as const;
