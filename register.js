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
  constructor(oc, wrapped) {
    this.oc = oc;
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
