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

export class WrappingObj {
  constructor(wrapped) {
    this.oc = getOC();
    this.wrapped = wrapped;
    registerObj(this);
  }

  delete() {
    this.oc = null;
    this.wrapped.delete();
    this.wrapped = null;
    unregisterObj(this);
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

export const localGC = () => {
  const cleaner = [];

  return [
    (v) => {
      cleaner.push(v);
      return v;
    },

    () => {
      cleaner.forEach((d) => d.delete());
      cleaner.length = 0;
    },
  ];
};
