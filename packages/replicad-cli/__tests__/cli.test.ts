import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { describe, expect, test } from "vitest";

const PACKAGE_ROOT = fileURLToPath(new URL("..", import.meta.url));
const BIN_PATH = fileURLToPath(new URL("../bin/replicad-cli.js", import.meta.url));

function runCli(args: string[]) {
  return spawnSync(process.execPath, [BIN_PATH, ...args], {
    cwd: PACKAGE_ROOT,
    encoding: "utf8",
  });
}

describe("replicad-cli", () => {
  test("writes a projection svg using the input stem by default", async () => {
    const workdir = await mkdtemp(join(tmpdir(), "replicad-cli-project-"));
    const input = join(workdir, "project-sample.js");

    await writeFile(
      input,
      `
const main = ({ makeCylinder }) => makeCylinder(8, 20);
      `.trimStart(),
      "utf8"
    );

    const result = runCli(["-p", input]);

    expect(result.status).toBe(0);
    expect(result.stderr).toBe("");

    const output = await readFile(join(workdir, "project-sample.svg"), "utf8");
    expect(output).toContain("<svg");
    expect(output).toContain("viewBox=");
  }, 60000);

  test("writes hidden lines when projection mode is hidden", async () => {
    const workdir = await mkdtemp(join(tmpdir(), "replicad-cli-project-hidden-"));
    const input = join(workdir, "project-hidden.js");

    await writeFile(
      input,
      `
const main = ({ draw }) => draw()
  .hLine(20)
  .vLine(10)
  .hLine(-20)
  .close()
  .sketchOnPlane()
  .extrude(10);
      `.trimStart(),
      "utf8"
    );

    const result = runCli(["--projection-mode", "hidden", input]);

    expect(result.status).toBe(0);
    expect(result.stderr).toBe("");

    const output = await readFile(join(workdir, "project-hidden.svg"), "utf8");
    expect(output).toContain("stroke-dasharray=");
  }, 60000);

  test("supports manifold-backed meshShape output", async () => {
    const workdir = await mkdtemp(join(tmpdir(), "replicad-cli-meshshape-"));
    const input = join(workdir, "mesh-shape.js");

    await writeFile(
      input,
      `
const main = ({ makeCylinder }) => makeCylinder(8, 20).meshShape();
      `.trimStart(),
      "utf8"
    );

    const result = runCli([input]);

    expect(result.status).toBe(0);
    expect(result.stderr).toBe("");

    const output = await readFile(join(workdir, "mesh-shape.stl"), "utf8");
    expect(output).toContain("solid");
  }, 60000);

  test("fails clearly when projecting mesh-only output", async () => {
    const workdir = await mkdtemp(join(tmpdir(), "replicad-cli-mesh-projection-"));
    const input = join(workdir, "mesh-projection.js");

    await writeFile(
      input,
      `
const main = ({ makeCylinder }) => makeCylinder(8, 20).meshShape();
      `.trimStart(),
      "utf8"
    );

    const result = runCli(["-p", input]);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain("Projection export requires a non-mesh 3D shape");
  }, 60000);

  test("writes json to the requested output stem", async () => {
    const workdir = await mkdtemp(join(tmpdir(), "replicad-cli-json-"));
    const input = join(workdir, "json-sample.js");
    const output = join(workdir, "exports/result");
    await mkdir(join(workdir, "exports"), { recursive: true });

    await writeFile(
      input,
      `
const defaultParams = { radius: 5 };
const main = ({ makeCylinder }, params) => makeCylinder(params.radius, 12);
      `.trimStart(),
      "utf8"
    );

    const result = runCli(["-f", "json", input, output]);

    expect(result.status).toBe(0);
    expect(result.stderr).toBe("");

    const json = JSON.parse(await readFile(`${output}.json`, "utf8"));
    expect(Array.isArray(json)).toBe(true);
    expect(json[0].mesh).toBeTruthy();
  }, 60000);
});
