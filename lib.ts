import type {
  Document,
  Element,
} from "https://deno.land/x/deno_dom@v0.1.34-alpha/deno-dom-wasm.ts";

export function main(doc: Document) {
  const productElements: Element[] = getProductElements(doc);
  productElements.forEach((productElement) => {
    const unitPrice = getProductUnitPrice(productElement);
    if (!unitPrice) {
      return;
    }
    insertUnitPrice(doc, productElement, unitPrice);
  });
}

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

export function insertUnitPrice(
  doc: Document,
  productElement: Element,
  unitPrice: number
) {
  const priceContainerElement = productElement.querySelector(
    ".RedmartProductCard-priceContainer"
  );
  const priceElement = productElement.querySelector(
    ".RedmartProductCard-price"
  );

  if (!priceContainerElement || !priceElement) {
    // Silently fail :/
    return;
  }

  const newSpanElement = doc.createElement("span");
  newSpanElement.textContent = `$${unitPrice}`;
  priceContainerElement.insertBefore(newSpanElement, priceElement);
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
  const quantityString = weightElement.textContent.split(" ")[0];
  return quantityString;
}
