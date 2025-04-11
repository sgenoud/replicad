import { transpile } from "typescript";

function buildFunctionWithContext(eval_string, context) {
  return `
  return function (context) {
    "use strict";
    ${
      Object.keys(context).length > 0
        ? `let ${Object.keys(context).map(
            (key) => ` ${key} = context['${key}']`
          )};`
        : ``
    }
    ${eval_string};
  }                                                                                                                   
  `;
}

function buildEvaluator(eval_string, context) {
  let template = buildFunctionWithContext(eval_string, context);
  let functor = Function(template);
  return functor();
}

export async function buildModuleEvaluator(moduleString) {
  const code = transpile(moduleString, {
    target: "es6",
    module: "es6",
    noImplicitAny: false,
    strict: false,
  });

  const url = URL.createObjectURL(
    new Blob([code], { type: "text/javascript" })
  );
  return await import(/* @vite-ignore */ `${url}`);
}

export function runInContext(text, context = {}) {
  const code = transpile(text, {
    target: "es6",
    noImplicitAny: false,
    strict: false,
  });
  let evaluator = buildEvaluator(code, context);
  return evaluator(context);
}
