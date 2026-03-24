export function buildFunctionWithContext(
  evalString: string,
  context: Record<string, unknown>
) {
  return `
  return function (context) {
    "use strict";
    ${
      Object.keys(context).length > 0
        ? `let ${Object.keys(context).map(
            (key) => `${key} = context[${JSON.stringify(key)}]`
          )};`
        : ``
    }
    ${evalString};
  }
  `;
}

export function buildEvaluator(
  evalString: string,
  context: Record<string, unknown>
) {
  const template = buildFunctionWithContext(evalString, context);
  const functor = Function(template);
  return functor();
}

export function runInContext<T = unknown>(
  text: string,
  context: Record<string, unknown> = {}
) {
  const evaluator = buildEvaluator(text, context);
  return evaluator(context) as T;
}

export async function withGlobalBindings<T>(
  globals: Record<string, unknown>,
  callback: () => Promise<T>
) {
  const previousValues = new Map<
    string,
    { hadOwnProperty: boolean; value: unknown }
  >();

  Object.entries(globals).forEach(([key, value]) => {
    previousValues.set(key, {
      hadOwnProperty: Object.prototype.hasOwnProperty.call(globalThis, key),
      value: (globalThis as Record<string, unknown>)[key],
    });
    (globalThis as Record<string, unknown>)[key] = value;
  });

  try {
    return await callback();
  } finally {
    previousValues.forEach(({ hadOwnProperty, value }, key) => {
      if (hadOwnProperty) {
        (globalThis as Record<string, unknown>)[key] = value;
      } else {
        delete (globalThis as Record<string, unknown>)[key];
      }
    });
  }
}
