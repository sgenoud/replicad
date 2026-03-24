#!/usr/bin/env node

import "tsx";

const { main } = await import("../src/cli.ts");
const exitCode = await main(process.argv.slice(2));

if (typeof exitCode === "number" && exitCode !== 0) {
  process.exit(exitCode);
}
