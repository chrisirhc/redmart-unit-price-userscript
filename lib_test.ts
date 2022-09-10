import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.34-alpha/deno-dom-wasm.ts";
import {
  assertEquals,
  assertStringIncludes,
} from "https://deno.land/std@0.155.0/testing/asserts.ts";
import {
  getProductElements,
  getProductPrice,
  getProductQuantity,
  getProductUnitPrice,
  insertUnitPrice,
} from "./lib.ts";

const fixtureHtml = Deno.readTextFileSync("./fixture.html");
const doc = new DOMParser().parseFromString(fixtureHtml, "text/html");

if (!doc) {
  console.log("Something wrong with fixture, unable to parse it.");
  Deno.exit(1);
}

Deno.test(function getProductsTest() {
  const products = getProductElements(doc);
  assertEquals(products.length, 2);

  const productPrices = products.map(getProductPrice);
  assertEquals(productPrices.length, 2);
  assertEquals(productPrices[0], "12.95");
  assertEquals(productPrices[1], "10.74");

  const productQuantities = products.map(getProductQuantity);
  assertEquals(productQuantities.length, 2);
  assertEquals(productQuantities[0], "20");
  assertEquals(productQuantities[1], "24");

  const productUnitPrices = products.map(getProductUnitPrice);
  assertEquals(productUnitPrices.length, 2);
  assertEquals(productUnitPrices[0], 0.6475);
  assertEquals(productUnitPrices[1], 0.4475);
});

Deno.test(function insertUnitPriceTest() {
  const products = getProductElements(doc);
  insertUnitPrice(doc, products[0], 1337.37);
  assertStringIncludes(doc.textContent, "$1337.37");
});
