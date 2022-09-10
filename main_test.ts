import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.34-alpha/deno-dom-wasm.ts";
import { assertEquals } from "https://deno.land/std@0.155.0/testing/asserts.ts";
import { getProducts } from "./main.ts";

const fixtureHtml = Deno.readTextFileSync("./fixture.html");
const doc = new DOMParser().parseFromString(fixtureHtml, "text/html");

if (!doc) {
  console.log("Something wrong with fixture, unable to parse it.");
  Deno.exit(1);
}

Deno.test(function getProductsTest() {
  const products = getProducts(doc);
  assertEquals(products.length, 2);
  console.log(products.length);
});
