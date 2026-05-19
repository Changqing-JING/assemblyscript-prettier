import assert from "node:assert/strict";
import { test } from "node:test";
import asPlugin from "../src/plugin.js";

test("printer should be initialized at module load time", () => {
  const asEstreePrinter = asPlugin.printers["as-estree"];

  // The printer should not be empty at module load time
  assert.ok(asPlugin.printers);
  assert.ok(asEstreePrinter);

  // The printer should have the print function available
  assert.equal(typeof asEstreePrinter.print, "function");

  // The printer should have the printComment function available
  assert.equal(typeof asEstreePrinter.printComment, "function");

  // The printer should have other essential methods/properties from estree
  assert.equal(typeof asEstreePrinter.embed, "function");
  assert.ok(asEstreePrinter.handleComments);
});
