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
  const url = URL.createObjectURL(
    new Blob([moduleString], { type: "text/javascript" })
  );
  return await import(/* @vite-ignore */ `${url}`);
}

export function runInContext(text, context = {}) {
  let evaluator = buildEvaluator(text, context);
  return evaluator(context);
}
