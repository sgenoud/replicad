import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from "vitest";
import { getOC } from "../src/oclib";
import type { Deletable } from "../src/register";

type Finalizer = (heldValue: Deletable) => void;
type Registration = {
  target: object;
  heldValue: Deletable;
  unregisterToken?: object;
};

class TestFinalizationRegistry {
  static instances: TestFinalizationRegistry[] = [];

  readonly registrations: Registration[] = [];
  readonly register = vi.fn(
    (target: object, heldValue: Deletable, unregisterToken?: object) => {
      this.registrations.push({ target, heldValue, unregisterToken });
    }
  );
  readonly unregister = vi.fn((unregisterToken: object) => {
    const registrationIndex = this.registrations.findIndex(
      (registration) => registration.unregisterToken === unregisterToken
    );
    if (registrationIndex === -1) return false;

    this.registrations.splice(registrationIndex, 1);
    return true;
  });

  constructor(private readonly finalizer: Finalizer) {
    TestFinalizationRegistry.instances.push(this);
  }

  finalize(heldValue: Deletable): void {
    this.finalizer(heldValue);
  }
}

let registerModule: typeof import("../src/register");
let registry: TestFinalizationRegistry;

type UsingScope = (
  Wrapper: typeof import("../src/register").WrappingObj,
  wrapped: Deletable
) => void;

const compileUsingScope = (body: string): UsingScope | null => {
  try {
    return new Function("Wrapper", "wrapped", body) as UsingScope;
  } catch {
    // The runtime does not parse the using keyword.
    return null;
  }
};

const usingScope = compileUsingScope(`
  {
    using wrapper = new Wrapper(wrapped);
    if (wrapper.wrapped !== wrapped) throw new Error("unexpected wrapped value");
    if (wrapped.delete.mock.calls.length !== 0) throw new Error("deleted inside scope");
  }
`);

const throwingUsingScope = compileUsingScope(`
  using wrapper = new Wrapper(wrapped);
  throw new Error("leave scope");
`);

const supportsUsing =
  typeof Symbol.dispose === "symbol" &&
  usingScope !== null &&
  throwingUsingScope !== null;

const deletable = (): Deletable => ({ delete: vi.fn() });

describe("resource registration and deletion", () => {
  beforeAll(async () => {
    // register.ts creates its registry when the module is evaluated. Reload it
    // with a deterministic registry so these tests do not depend on the GC.
    const oc = getOC();
    vi.resetModules();
    vi.stubGlobal(
      "FinalizationRegistry",
      TestFinalizationRegistry as unknown as typeof FinalizationRegistry
    );

    const freshOCLib = await import("../src/oclib");
    freshOCLib.setOC(oc);
    registerModule = await import("../src/register");
    registry = TestFinalizationRegistry.instances[0];
  });

  beforeEach(() => {
    registry.registrations.length = 0;
    registry.register.mockClear();
    registry.unregister.mockClear();
  });

  afterAll(() => {
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  test("registers a wrapped object with itself as the unregister token", () => {
    const wrapped = deletable();
    const wrapper = new registerModule.WrappingObj(wrapped);

    expect(registry.register).toHaveBeenCalledOnce();
    expect(registry.register).toHaveBeenCalledWith(wrapper, wrapped, wrapped);
    expect(wrapper.wrapped).toBe(wrapped);
  });

  test("deletes and unregisters an explicitly deleted wrapped object", () => {
    const wrapped = deletable();
    const wrapper = new registerModule.WrappingObj(wrapped);

    wrapper.delete();

    expect(registry.unregister).toHaveBeenCalledOnce();
    expect(registry.unregister).toHaveBeenCalledWith(wrapped);
    expect(wrapped.delete).toHaveBeenCalledOnce();
    expect(() => wrapper.wrapped).toThrowError("This object has been deleted");
  });

  test("explicit deletion is idempotent", () => {
    const wrapped = deletable();
    const wrapper = new registerModule.WrappingObj(wrapped);

    wrapper.delete();
    wrapper.delete();

    expect(registry.unregister).toHaveBeenCalledOnce();
    expect(wrapped.delete).toHaveBeenCalledOnce();
  });

  test.runIf(typeof Symbol.dispose === "symbol")(
    "supports explicit resource disposal when the runtime supports it",
    () => {
      const wrapped = deletable();
      const wrapper = new registerModule.WrappingObj(wrapped);

      wrapper[Symbol.dispose]();

      expect(registry.unregister).toHaveBeenCalledWith(wrapped);
      expect(wrapped.delete).toHaveBeenCalledOnce();
      expect(() => wrapper.wrapped).toThrowError(
        "This object has been deleted"
      );
    }
  );

  test.runIf(typeof Symbol.dispose === "symbol")(
    "does not delete twice when explicit deletion and disposal are combined",
    () => {
      const firstWrapped = deletable();
      const firstWrapper = new registerModule.WrappingObj(firstWrapped);

      firstWrapper.delete();
      firstWrapper[Symbol.dispose]();

      const secondWrapped = deletable();
      const secondWrapper = new registerModule.WrappingObj(secondWrapped);

      secondWrapper[Symbol.dispose]();
      secondWrapper.delete();

      expect(firstWrapped.delete).toHaveBeenCalledOnce();
      expect(secondWrapped.delete).toHaveBeenCalledOnce();
      expect(registry.unregister).toHaveBeenCalledTimes(2);
    }
  );

  test.runIf(supportsUsing)(
    "disposes a wrapped object when leaving a native using scope",
    () => {
      const wrapped = deletable();

      usingScope!(registerModule.WrappingObj, wrapped);

      expect(registry.unregister).toHaveBeenCalledWith(wrapped);
      expect(wrapped.delete).toHaveBeenCalledOnce();
    }
  );

  test.runIf(supportsUsing)(
    "disposes a wrapped object when an exception leaves a native using scope",
    () => {
      const wrapped = deletable();

      expect(() =>
        throwingUsingScope!(registerModule.WrappingObj, wrapped)
      ).toThrowError("leave scope");

      expect(registry.unregister).toHaveBeenCalledWith(wrapped);
      expect(wrapped.delete).toHaveBeenCalledOnce();
    }
  );

  test("deletes the previous value and registers a replacement", () => {
    const previous = deletable();
    const replacement = deletable();
    const wrapper = new registerModule.WrappingObj(previous);

    wrapper.wrapped = replacement;

    expect(registry.unregister).toHaveBeenCalledWith(previous);
    expect(previous.delete).toHaveBeenCalledOnce();
    expect(registry.register).toHaveBeenLastCalledWith(
      wrapper,
      replacement,
      replacement
    );
    expect(wrapper.wrapped).toBe(replacement);
  });

  test("the finalizer deletes an object that was not explicitly deleted", () => {
    const wrapped = deletable();

    registry.finalize(wrapped);

    expect(wrapped.delete).toHaveBeenCalledOnce();
  });

  test("reports errors thrown during finalization", () => {
    const error = new Error("could not delete");
    const wrapped: Deletable = {
      delete: vi.fn(() => {
        throw error;
      }),
    };
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    registry.finalize(wrapped);

    expect(consoleError).toHaveBeenCalledWith(error);
    consoleError.mockRestore();
  });

  test("GCWithScope keeps registered values associated with its scope", () => {
    const wrapped = deletable();
    const scope = registerModule.GCWithScope();

    expect(scope(wrapped)).toBe(wrapped);
    expect(registry.register).toHaveBeenCalledWith(scope, wrapped);
  });

  test("GCWithObject associates registered values with the supplied owner", () => {
    const owner = {};
    const wrapped = deletable();
    const register = registerModule.GCWithObject(owner);

    expect(register(wrapped)).toBe(wrapped);
    expect(registry.register).toHaveBeenCalledWith(owner, wrapped);
  });

  test("localGC deletes each registered object once and clears its set", () => {
    const first = deletable();
    const second = deletable();
    const [register, clean, cleaner] = registerModule.localGC(true);

    expect(register(first)).toBe(first);
    register(first);
    register(second);
    expect(cleaner).toEqual(new Set([first, second]));

    clean();

    expect(first.delete).toHaveBeenCalledOnce();
    expect(second.delete).toHaveBeenCalledOnce();
    expect(cleaner).toEqual(new Set());

    clean();
    expect(first.delete).toHaveBeenCalledOnce();
    expect(second.delete).toHaveBeenCalledOnce();
  });
});
