import { getOC } from "./oclib";
import { OpenCascadeInstance } from "replicad-opencascadejs";

export interface Deletable {
  delete: () => void;
}

if (!(globalThis as any).FinalizationRegistry) {
  console.log("Garbage collection will not work");

  (globalThis as any).FinalizationRegistry = (() => ({
    register: () => null,
    unregister: () => null,
  })) as any;
}

const deletetableRegistry = new (globalThis as any).FinalizationRegistry(
  (heldValue: Deletable) => {
    // Empty OCCT handles can resolve to null; never register or finalize them.
    if (!heldValue) return;
    try {
      heldValue.delete();
    } catch (e) {
      console.error(e);
    }
  }
);

export class WrappingObj<Type extends Deletable> {
  protected oc: OpenCascadeInstance;
  private _wrapped: Type | null;

  constructor(wrapped: Type) {
    this.oc = getOC();
    if (wrapped) {
      deletetableRegistry.register(this, wrapped, wrapped);
    }
    this._wrapped = wrapped;
  }

  get wrapped(): Type {
    if (this._wrapped === null) throw new Error("This object has been deleted");
    return this._wrapped;
  }

  set wrapped(newWrapped: Type) {
    if (this._wrapped) {
      deletetableRegistry.unregister(this._wrapped);
      this._wrapped.delete();
    }

    if (newWrapped) {
      deletetableRegistry.register(this, newWrapped, newWrapped);
    }
    this._wrapped = newWrapped;
  }

  delete(): void {
    const wrapped = this._wrapped;
    if (wrapped === null) return;

    // Consider the wrapper deleted even if deleting the underlying object throws.
    this._wrapped = null;
    deletetableRegistry.unregister(wrapped);
    wrapped.delete();
  }
}

export interface WrappingObj<Type extends Deletable> extends Disposable {}

// Do not polyfill Symbol.dispose: unsupported runtimes can continue to use
// replicad's existing explicit deletion and finalization behavior.
if (typeof Symbol.dispose === "symbol") {
  Object.defineProperty(WrappingObj.prototype, Symbol.dispose, {
    configurable: true,
    writable: true,
    value(this: WrappingObj<Deletable>): void {
      this.delete();
    },
  });
}

export const GCWithScope = () => {
  function gcWithScope<Type extends Deletable>(value: Type): Type {
    if (value) {
      deletetableRegistry.register(gcWithScope, value);
    }
    return value;
  }

  return gcWithScope;
};

export const GCWithObject = (obj: any) => {
  function registerForGC<Type extends Deletable>(value: Type): Type {
    if (value) {
      deletetableRegistry.register(obj, value);
    }
    return value;
  }

  return registerForGC;
};

export const localGC = (
  debug?: boolean
): [
  <T extends Deletable>(v: T) => T,
  () => void,
  Set<Deletable> | undefined
] => {
  const cleaner = new Set<Deletable>();

  return [
    <T extends Deletable>(v: T): T => {
      cleaner.add(v);
      return v;
    },

    () => {
      [...cleaner.values()].forEach((d) => d.delete());
      cleaner.clear();
    },
    debug ? cleaner : undefined,
  ];
};
