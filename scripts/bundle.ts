import * as esbuild from "https://deno.land/x/esbuild@v0.15.7/mod.js";
import { ensureDir } from "https://deno.land/std@0.151.0/fs/ensure_dir.ts";

const ts = await Deno.readTextFile("./main.ts");
const result = await esbuild.transform(ts, { loader: "ts" });
console.log("result:", result);
esbuild.stop();
ensureDir("./build");
await Deno.writeTextFile("./build/main.js", result.code);
