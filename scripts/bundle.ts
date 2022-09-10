import * as esbuild from "https://deno.land/x/esbuild@v0.15.7/mod.js";
import { ensureDir } from "https://deno.land/std@0.151.0/fs/ensure_dir.ts";

ensureDir("./build");
const result = await esbuild.build({entryPoints: ['./main.ts'], outdir:'./build', bundle: true});
esbuild.stop();
console.log("ran successfully");
console.log("result:", result);
