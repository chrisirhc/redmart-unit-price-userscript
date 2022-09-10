import type { Document } from "https://deno.land/x/deno_dom@v0.1.34-alpha/deno-dom-wasm.ts";

// Use Document instead of Queryable due to https://github.com/b-fuze/deno-dom/issues/125
export function getProducts(queryable: Document) {
  return queryable.querySelectorAll(".RedmartProductCard-container");
}

export function add(a: number, b: number): number {
  return a + b;
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log("Add 2 + 3 =", add(2, 3));
}
