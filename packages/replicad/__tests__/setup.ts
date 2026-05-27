import { createRequire } from 'node:module';
import { expect, beforeAll } from 'vitest';
import opencascade from 'replicad-opencascadejs';
import { setOC } from '../src/index';
import toMatchSVGSnapshot from './toMatchSVGSnapshot';

declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchSVGSnapshot(): R;
    }
  }
}

const require = createRequire(import.meta.url);
const opencascadeWasm = require.resolve('replicad-opencascadejs/wasm');

beforeAll(async function () {
  if (globalThis.replicadInit) return;
  expect.extend({ toMatchSVGSnapshot });

  const OC = await opencascade({
    locateFile: () => opencascadeWasm,
  });

  setOC(OC);
  globalThis.replicadInit = true;
});
