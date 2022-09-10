import type {
  Document,
  Element,
} from "https://deno.land/x/deno_dom@v0.1.34-alpha/deno-dom-wasm.ts";

// Use Document instead of Queryable due to https://github.com/b-fuze/deno-dom/issues/125
export function getProductElements(queryable: Document): Element[] {
  const elements: Element[] = [];
  queryable
    .querySelectorAll(".RedmartProductCard-container")
    .forEach((node) => {
      elements.push(node as Element);
    });
  return elements;
}

export function getProductPrice(productElement: Element) {
  const priceElement = productElement.querySelector(
    ".RedmartProductCard-price"
  );
  if (!priceElement) {
    return;
  }
  const priceString = priceElement.textContent.substring(1);
  return priceString;
}
