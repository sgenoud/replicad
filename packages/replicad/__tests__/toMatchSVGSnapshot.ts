import * as fs from "fs";
import * as path from "path";
import * as chalk from "chalk";
import { matcherHint, printDiffOrStringify } from "jest-matcher-utils";

import { diffSVGToSnapshot } from "./diffSVGToSnapshot";

const SNAPSHOTS_DIR = "__snapshots__";

function updateSnapshotState(
  originalSnapshotState: any,
  partialSnapshotState: any
) {
  if (global.UNSTABLE_SKIP_REPORTING) {
    return originalSnapshotState;
  }
  return { ...originalSnapshotState, ...partialSnapshotState };
}

// The snapshot directory is already scoped per test file (dirname(testPath) +
// __snapshots__), so the identifier only needs to disambiguate tests *within* a
// file. `currentTestName` historically carried a leading "<relative-path> > "
// segment that vitest 4 dropped, which silently orphaned every committed
// baseline. Strip any such file-path prefix so the identifier is stable across
// vitest versions and depends only on the test's own name.
function testNameKey(currentTestName: string): string {
  return currentTestName.replace(/^.*\.[cm]?[jt]sx? > /, "");
}

function createSnapshotIdentifier({
  testPath,
  currentTestName,
  snapshotState,
}: {
  testPath: string;
  currentTestName: string;
  snapshotState: any;
}) {
  const counter = snapshotState._counters.get(currentTestName);
  const snapshotIdentifier = `${path.basename(testPath)}-${testNameKey(
    currentTestName
  )}-${counter}`
    .replace(/\s+/g, "-")
    .replace(/\//g, "-")
    .replace(/>/g, "")
    .replace(/</g, "")
    .toLowerCase();

  return snapshotIdentifier;
}

export default function toMatchSVGSnapshot(received: string) {
  // getState isn't in the d.ts for Jest, this is ok though.
  const { testPath, currentTestName, isNot, snapshotState, expand } =
    this as any as {
      testPath: string;
      currentTestName: string;
      isNot: boolean;
      snapshotState: any;
      expand: boolean;
    };

  if (isNot) {
    throw new Error(
      "Jest: `.not` cannot be used with `.toMatchSVGSnapshot()`."
    );
  }

  updateSnapshotState(snapshotState, {
    _counters: snapshotState._counters.set(
      currentTestName,
      (snapshotState._counters.get(currentTestName) || 0) + 1
    ),
  });

  const snapshotIdentifier = createSnapshotIdentifier({
    testPath,
    currentTestName,
    snapshotState,
  });

  //  Figure out the paths
  const snapshotsDir = path.join(path.dirname(testPath), SNAPSHOTS_DIR);
  const expectedSnapshot = path.join(
    snapshotsDir,
    `${snapshotIdentifier}-snap.svg`
  );

  // Baselines are committed golden files. A missing one is a failure — never a
  // silent auto-write — unless the run explicitly opts into recording with `-u`
  // (which sets _updateSnapshot to "all"). Without this, a baseline renamed by a
  // tooling change (e.g. a vitest upgrade altering the identifier) would be
  // regenerated on the next local run and the test would pass against nothing.
  if (snapshotState._updateSnapshot !== "all" && !fs.existsSync(expectedSnapshot)) {
    return {
      pass: false,
      message: () =>
        `SVG snapshot ${chalk.bold.red("is missing")}: ${path.relative(
          process.cwd(),
          expectedSnapshot
        )}\n\n` +
        "Re-record it deliberately with `vitest -u` if the change is expected. " +
        "It is not written automatically so a renamed or deleted baseline fails " +
        "loudly instead of passing against a freshly-written file.\n\n",
    };
  }

  const result = diffSVGToSnapshot({
    receivedSVG: received,
    snapshotIdentifier,
    snapshotsDir,
    updateSnapshot: snapshotState._updateSnapshot === "all",
  });

  let pass = true;

  let message = () => "";

  if (result.updated) {
    // once transition away from jasmine is done this will be a lot more elegant and pure
    // https://github.com/facebook/jest/pull/3668
    updateSnapshotState(snapshotState, {
      updated: snapshotState.updated + 1,
    });
  } else if (result.added) {
    updateSnapshotState(snapshotState, { added: snapshotState.added + 1 });
  } else {
    ({ pass } = result);

    updateSnapshotState(snapshotState, {
      matched: snapshotState.matched + 1,
    });

    if (!pass) {
      updateSnapshotState(snapshotState, {
        unmatched: snapshotState.unmatched + 1,
      });

      message = () => {
        return (
          matcherHint(".toMatchSVGSnapshot", "received", "") +
          "\n\n" +
          "Expected SVGs to match:\n" +
          `  ${printDiffOrStringify(
            result.expected,
            received,
            "Expected",
            "Received",
            expand !== false
          )}`
        );
      };
    }
  }

  return {
    message,
    pass,
  };
}
