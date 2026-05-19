import assert from "node:assert/strict";
import { test } from "node:test";
import * as prettier from "prettier";
import asPlugin from "../src/plugin.js";

test("variant decorator", async () => {
  const originCode = `

@lazy let offset: usize = startOffset;

`;

  const formatedCode = await prettier.format(originCode, {
    parser: "typescript",
    plugins: [asPlugin],
  });

  assert.equal(
    formatedCode,
    `
@lazy let offset: usize = startOffset;
`,
  );
});

test("function decorator", async () => {
  const originCode = `
  
    @global @unsafe
    export function __new(size: usize, id: i32): usize {}
    
  
  `;

  const formatedCode = await prettier.format(originCode, {
    parser: "typescript",
    plugins: [asPlugin],
  });

  assert.equal(
    formatedCode,
    `
@global @unsafe
export function __new(size: usize, id: i32): usize {}
`,
  );
});

test("class decorator", async () => {
  const originCode = `

      @global @unsafe
      export class AA

      {}

    `;

  const formatedCode = await prettier.format(originCode, {
    parser: "typescript",
    plugins: [asPlugin],
  });

  assert.equal(
    formatedCode,
    `
@global @unsafe
export class AA {}
`,
  );
});

test("external decorator with ffi.MultiReturn result", async () => {
  const originCode = `

    declare namespace ffi {
      class MultiReturn<T> {}
    }

    @external("env", "multi_return_api")
    export declare function multi_return_api(): ffi.MultiReturn<[i32, i32]>;

  `;

  const formatedCode = await prettier.format(originCode, {
    parser: "typescript",
    plugins: [asPlugin],
  });

  assert.equal(
    formatedCode,
    `declare namespace ffi {
  class MultiReturn<T> {}
}


@external("env", "multi_return_api")
export declare function multi_return_api(): ffi.MultiReturn<[i32, i32]>;
`,
  );
});
