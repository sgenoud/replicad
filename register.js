import { getOC } from "./oclib";
const REGISTER = new Set();

export const registerObj = (obj) => {
  REGISTER.add(obj);
};
export const unregisterObj = (obj) => REGISTER.delete(obj);
export const clearRegister = (keepList = []) => {
  REGISTER.forEach((s) => {
    if (keepList.find((k) => k.isSame(s))) return;
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

export class WrappingObj extends RegisteredObj {
  constructor(wrapped) {
    super();
    this.oc = getOC();
    if (!this.oc) console.log("wrapping", this.oc);
    this.wrapped = wrapped;
  }

  delete() {
    this.oc = null;
    this.wrapped.delete();
    this.wrapped = null;
    super.delete();
  }
}

export class Cleaner {
  constructor() {
    this.toClean = [];
  }
  add(element) {
    this.toClean.push(element);
  }
  clean() {
    this.toClean.forEach((d) => d.delete());
    this.toClean = [];
  }
}

export const localGC = (debug) => {
  const cleaner = new Set();

  const out = [
    (v) => {
      cleaner.add(v);
      return v;
    },

    () => {
      [...cleaner.values()].forEach((d) => d.delete());
      cleaner.clear();
    },
  ];
  if (debug) out.push(cleaner);
  return out;
};
