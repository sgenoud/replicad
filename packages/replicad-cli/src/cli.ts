import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { Command, Option } from "commander";
import { getManifoldModule, setWasmUrl } from "manifold-3d/lib/wasm.js";
import opencascadeModule from "replicad-opencascadejs/src/replicad_single.js";
import * as replicad from "replicad";
import { createEvaluator } from "replicad-evaluator";
import packageJson from "../package.json" with { type: "json" };
import { saveBuildOutput } from "./saveOutput";
import type { ProjectMode } from "./projectSvg";

const FILE_TYPES = [
  "stl",
  "step",
  "stl-binary",
  "step-assembly",
  "json",
];

const PROJECT_MODES = ["visible", "hidden"] as const;

const require = createRequire(import.meta.url);

let evaluatorPromise: Promise<ReturnType<typeof createEvaluator>> | null = null;
let manifoldPromise: Promise<any> | null = null;

async function parseArgs(argv: string[]) {
  const program = new Command();

  program
    .name("replicad")
    .description("A basic CLI for replicad.")
    .usage("[options] <input> [output]")
    .version(packageJson.version, "-v, --version", "Show the CLI version.")
    .argument("<input>", "Input file to evaluate")
    .argument("[output]", "Output path or output stem")
    .addOption(
      new Option("-f, --filetype <filetype>", "The output file format").choices(
        FILE_TYPES
      )
    )
    .addOption(
      new Option(
        "-p, --projection",
        "Create a pretty SVG projection from the first built shape."
      )
    )
    .addOption(
      new Option(
        "--projection-mode <mode>",
        'Projection mode when using --projection.'
      )
        .choices(PROJECT_MODES)
        .implies({ projection: true })
    )
    .helpOption("-h, --help", "Show this help.")
    .showHelpAfterError("(add --help for additional usage information)")
    .exitOverride()
    .allowExcessArguments(false)
    .configureOutput({
      writeOut: (text) => process.stdout.write(text),
      writeErr: (text) => process.stderr.write(text),
    });

  try {
    await program.parseAsync(argv, { from: "user" });
  } catch (error: any) {
    if (typeof error?.exitCode === "number") {
      return {
        done: true,
        exitCode: error.exitCode,
      };
    }
    throw error;
  }

  const options = program.opts<{
    filetype?: string;
    projection?: boolean;
    projectionMode?: (typeof PROJECT_MODES)[number];
  }>();
  const [input, output] = program.args as [string, string | undefined];

  return {
    done: false,
    exitCode: 0,
    filetype: options.filetype,
    input,
    output,
    project: options.projection ? options.projectionMode || "visible" : false,
  };
}

async function createCliEvaluator() {
  const openCascadeFactory =
    (opencascadeModule as any)?.default?.default ||
    (opencascadeModule as any)?.default ||
    opencascadeModule;
  const wasmPath = require.resolve("replicad-opencascadejs/src/replicad_single.wasm");
  const manifoldWasmPath = require.resolve("manifold-3d/manifold.wasm");
  setWasmUrl(manifoldWasmPath);
  const oc = await openCascadeFactory({
    locateFile: () => wasmPath,
  });
  if (!manifoldPromise) {
    manifoldPromise = getManifoldModule();
  }
  const manifold = await manifoldPromise;

  return createEvaluator({
    replicad,
    oc,
    manifold,
  });
}

async function getEvaluator() {
  if (!evaluatorPromise) {
    evaluatorPromise = createCliEvaluator();
  }
  return evaluatorPromise;
}

async function runCli(argv: string[]) {
  const { done, exitCode, filetype, input, output, project } = await parseArgs(argv);
  if (done) {
    return exitCode;
  }

  const code = await readFile(input, "utf8");
  const evaluator = await getEvaluator();
  const defaultParams = await evaluator.extractDefaultParamsFromCode(code);
  const buildResult = await evaluator.buildShapesFromCode(code, defaultParams || {});

  if (!Array.isArray(buildResult)) {
    throw new Error(buildResult?.message || "Failed to build shapes");
  }

  await saveBuildOutput(
    evaluator,
    buildResult,
    output || input,
    {
      fileType: filetype || "stl",
      projectMode: project,
    }
  );

  return 0;
}

export async function main(argv = process.argv.slice(2)) {
  try {
    return await runCli(argv);
  } catch (error: any) {
    process.stderr.write(`${error?.message || String(error)}\n`);
    return 1;
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const exitCode = await main(process.argv.slice(2));
  if (exitCode !== 0) {
    process.exit(exitCode);
  }
}
