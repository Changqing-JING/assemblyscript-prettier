import assert from "node:assert/strict";
import { test } from "node:test";
import * as prettier from "prettier";
import asPlugin from "../src/plugin.js";

test("block comment", async () => {
  const originCode = `
/*1*/ 
@lazy/*2*/ let offset = 1;
/*3*/
@lazy /*4*/let offset = 1;
/*5*/
`;

  const formatedCode = await prettier.format(originCode, {
    parser: "typescript",
    plugins: [asPlugin],
  });

  assert.equal(
    formatedCode,
    `/*1*/
@lazy /*2*/ let offset = 1;
/*3*/
@lazy /*4*/ let offset = 1;
/*5*/
`,
  );
});

test("line comment", async () => {
  const originCode = `
// 1
  @lazy
  //2
   let offset = 1;
// 3
`;

  const formatedCode = await prettier.format(originCode, {
    parser: "typescript",
    plugins: [asPlugin],
  });

  assert.equal(
    formatedCode,
    `// 1
@lazy
//2
let offset = 1;
// 3
`,
  );
});
