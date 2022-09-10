import { main } from "./lib.ts";

(function () {
  // @ts-expect-error: deno disallows checking for document
  const doc = window?.document;
  if (doc) {
    main(doc);
  }
})();
