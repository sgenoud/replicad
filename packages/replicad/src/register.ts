import { getOC } from "./oclib";
import { OpenCascadeInstance } from "replicad-opencascadejs";

interface Deletable {
  delete: () => void;
}

if (!(globalThis as any).FinalizationRegistry) {
  (globalThis as any).FinalizationRegistry = (() => ({
    register: () => null,
    unregister: () => null,
  })) as any;
}

const deletetableRegistry = new (globalThis as any).FinalizationRegistry(
  (heldValue: Deletable) => {
    try {
      console.log("gc!");
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

    deletetableRegistry.register(this, newWrapped, newWrapped);
    this._wrapped = newWrapped;
  }

  delete() {
    deletetableRegistry.unregister(this.wrapped);
    this.wrapped?.delete();
    this._wrapped = null;
  }
}

export const GCWithScope = () => {
  function gcWithScope<Type extends Deletable>(value: Type): Type {
    deletetableRegistry.register(gcWithScope, value);
    return value;
  }

  return gcWithScope;
};

export const GCWithObject = (obj: any) => {
  function registerForGC<Type extends Deletable>(value: Type): Type {
    deletetableRegistry.register(obj, value);
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
