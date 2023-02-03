import * as fs from "fs";
import * as path from "path";

const isFailure = ({
  pass,
  updateSnapshot,
}: {
  pass: boolean;
  updateSnapshot: boolean;
}) => !pass && !updateSnapshot;
const shouldUpdate = ({
  pass,
  updateSnapshot,
}: {
  pass: boolean;
  updateSnapshot: boolean;
}) => !pass && updateSnapshot;

export function diffSVGToSnapshot(options: {
  receivedSVG: string;
  snapshotIdentifier: string;
  snapshotsDir: string;
  updateSnapshot: boolean;
}) {
  const {
    receivedSVG,
    snapshotIdentifier,
    snapshotsDir,
    updateSnapshot = false,
  } = options;

  let result: {
    pass: boolean;
    added?: boolean;
    updated?: boolean;
    expected?: string;
  } = {
    pass: false,
  };

  const baselineSnapshotPath = path.join(
    snapshotsDir,
    `${snapshotIdentifier}-snap.svg`
  );

  if (!fs.existsSync(baselineSnapshotPath)) {
    fs.mkdirSync(snapshotsDir, { recursive: true });
    fs.writeFileSync(baselineSnapshotPath, receivedSVG, "utf-8");
    result = { added: true, pass: false };
  } else {
    const expectedSVG = fs.readFileSync(baselineSnapshotPath, "utf8");

    const pass = expectedSVG === receivedSVG;

    if (isFailure({ pass, updateSnapshot })) {
      result = {
        pass: false,
        expected: expectedSVG,
      };
    } else if (shouldUpdate({ pass, updateSnapshot })) {
      fs.mkdirSync(snapshotsDir, { recursive: true });
      fs.writeFileSync(baselineSnapshotPath, receivedSVG, "utf-8");
      result = { updated: true, pass: false };
    } else {
      result = {
        pass,
      };
    }
  }
  return result;
}
