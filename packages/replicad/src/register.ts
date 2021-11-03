import { getOC } from "./oclib";
import { OpenCascadeInstance } from "replicad-opencascadejs";

interface Deletable {
  delete: () => void;
}
const REGISTER = new Set<Deletable>();

export const registerObj = (obj: any) => {
  REGISTER.add(obj);
};
export const unregisterObj = (obj: Deletable) => REGISTER.delete(obj);
export const clearRegister = (keepList: any[] = []) => {
  REGISTER.forEach((s) => {
    if (keepList.find((k) => (k.isSame ? k.isSame(s) : k === s))) return;
    s.delete();
  });
};

export class RegisteredObj {
  constructor() {
    registerObj(this);
  }

  delete() {
    unregisterObj(this);
  }
}

export class WrappingObj<Type extends Deletable> extends RegisteredObj {
  protected oc: OpenCascadeInstance;
  private _wrapped: Type | null;

  constructor(wrapped: Type) {
    super();
    this.oc = getOC();
    if (!this.oc) console.log("wrapping", this.oc);
    this._wrapped = wrapped;
  }

  get wrapped(): Type {
    if (this._wrapped === null) throw new Error("This object has been deleted");
    return this._wrapped;
  }

  set wrapped(newWrapped: Type) {
    this._wrapped = newWrapped;
  }

  delete() {
    this.wrapped?.delete();
    this._wrapped = null;
    super.delete();
  }
}

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
