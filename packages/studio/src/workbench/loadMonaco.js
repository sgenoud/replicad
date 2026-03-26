import { loader } from "@monaco-editor/react";

import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

import prettier from "prettier/esm/standalone";
import prettierPluginBabel from "prettier/esm/parser-babel";
import prettierEspree from "prettier/esm/parser-espree";
import prettierPluginTypescript from "prettier/esm/parser-typescript";

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "json") {
      return new jsonWorker();
    }
    if (label === "css" || label === "scss" || label === "less") {
      return new cssWorker();
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return new htmlWorker();
    }
    if (label === "typescript" || label === "javascript") {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

const formatWithPrettier = (value, language) => {
  try {
    if (language === "typescript") {
      return prettier.format(value, {
        parser: "typescript",
        plugins: [prettierPluginTypescript],
      });
    }
    return prettier.format(value, {
      parser: "babel",
      plugins: [prettierPluginBabel, prettierEspree],
    });
  } catch (e) {
    console.error(e);
    return value;
  }
};

monaco.languages.registerDocumentFormattingEditProvider("javascript", {
  provideDocumentFormattingEdits: (model) => {
    return [
      {
        range: model.getFullModelRange(),
        text: formatWithPrettier(model.getValue(), "javascript"),
      },
    ];
  },
});

monaco.languages.registerDocumentFormattingEditProvider("typescript", {
  provideDocumentFormattingEdits: (model) => {
    return [
      {
        range: model.getFullModelRange(),
        text: formatWithPrettier(model.getValue(), "typescript"),
      },
    ];
  },
});

loader.config({ monaco });
