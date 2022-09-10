import * as esbuild from "https://deno.land/x/esbuild@v0.15.7/mod.js";
import { ensureDir } from "https://deno.land/std@0.151.0/fs/ensure_dir.ts";

// See https://www.tampermonkey.net/documentation.php
const USERSCRIPT_HEADER = `// ==UserScript==
// @name         Lazada RedMart Unit Price
// @namespace    https://sirh.cc/
// @version      0.1
// @description  Add unit prices to Lazada Redmart catalogue.
// @author       Chris Chua
// @match        https://www.lazada.sg/catalog/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=lazada.sg
// @grant        none
// ==/UserScript==`;

ensureDir("./build");
const result = await esbuild.build({
  banner: {
    js: USERSCRIPT_HEADER,
  },
  entryPoints: ["./main.ts"],
  outdir: "./build",
  bundle: true,
});
esbuild.stop();
console.log("ran successfully");
console.log("result:", result);
