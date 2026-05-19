import { test } from "node:test";
import * as prettier from "prettier";
import asPlugin from "../src/plugin.js";
import { assertSnapshot } from "./snapshot.js";

test("inline variable", async () => {
  const originCode = `
  
  @inline
  const EXPECT_MAX_INDEX = 2147483647;
  
      `;

  const formattedCode = await prettier.format(originCode, {
    parser: "typescript",
    plugins: [asPlugin],
  });

  assertSnapshot(import.meta.url, "inline variable", formattedCode);
});
