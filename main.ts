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

export function getProductUnitPrice(productElement: Element) {
  const priceString = getProductPrice(productElement);
  const quantityString = getProductQuantity(productElement);

  if (!priceString || !quantityString) {
    return;
  }

  return +priceString / +quantityString;
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

export function getProductQuantity(productElement: Element) {
  const weightElement = productElement.querySelector(
    ".RedmartProductCard-weight"
  );
  
  if (!weightElement) {
    return;
  }
  const quantityString = weightElement.textContent.split(' ')[0];
  return quantityString;
}

