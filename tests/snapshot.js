import assert from "node:assert/strict";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const shouldUpdateSnapshots = process.execArgv.includes("--test-update-snapshots");

function toSnapshotPath(testFileUrl, snapshotName) {
  const testFilePath = fileURLToPath(testFileUrl);
  const parsedPath = path.parse(testFilePath);
  const slug = snapshotName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return path.join(parsedPath.dir, "__snapshots__", `${parsedPath.name}.${slug}.snap`);
}

export function assertSnapshot(testFileUrl, snapshotName, actualValue) {
  const snapshotPath = toSnapshotPath(testFileUrl, snapshotName);

  if (shouldUpdateSnapshots) {
    mkdirSync(path.dirname(snapshotPath), { recursive: true });
    writeFileSync(snapshotPath, actualValue);
    return;
  }

  assert.ok(existsSync(snapshotPath), `Missing snapshot file: ${snapshotPath}. Run npm run test:create.`);
  assert.equal(actualValue, readFileSync(snapshotPath, "utf8"));
}
