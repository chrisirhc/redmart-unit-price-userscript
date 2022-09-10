import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import { assert } from "https://deno.land/std@0.155.0/testing/asserts.ts";
import { assertEquals } from "https://deno.land/std@0.155.0/testing/asserts.ts";
import { add } from "./main.ts";

Deno.test(function addTest() {
  assertEquals(add(2, 3), 5);
});
