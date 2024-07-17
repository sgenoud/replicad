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
  const snapshotIdentifier = `${path.basename(
    testPath
  )}-${currentTestName}-${counter}`
    .replace(/\s+/g, "-")
    .replace(/\//g, "-")
    .replace(/>/g,'_')
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

  if (
    snapshotState._updateSnapshot === "none" &&
    !fs.existsSync(expectedSnapshot)
  ) {
    return {
      pass: false,
      message: () =>
        `New snapshot was ${chalk.bold.red(
          "not written"
        )}. The update flag must be explicitly ` +
        "passed to write a new snapshot.\n\n + This is likely because this test is run in a continuous " +
        "integration (CI) environment in which snapshots are not written by default.\n\n",
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
