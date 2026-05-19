import { test } from "node:test";
import * as prettier from "prettier";
import asPlugin from "../src/plugin.js";
import { assertSnapshot } from "./snapshot.js";

test("variant decorator", async () => {
  const originCode = `

@lazy let offset: usize = startOffset;

`;

  const formatedCode = await prettier.format(originCode, {
    parser: "typescript",
    plugins: [asPlugin],
  });

  assertSnapshot(import.meta.url, "variant decorator", formatedCode);
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

  assertSnapshot(import.meta.url, "function decorator", formatedCode);
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

  assertSnapshot(import.meta.url, "class decorator", formatedCode);
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

  assertSnapshot(import.meta.url, "external decorator with ffi.MultiReturn result", formatedCode);
});
