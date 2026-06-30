import fs from "fs";

import { loadDemo } from "./parser.js";
import { analyzeDemo } from "./analyzer.js";

const demoPath = "./demos/mibr-academy-vs-patins-da-ferrari-m1-mirage.dem";

const { deaths, ticks } = loadDemo(demoPath);

const results = analyzeDemo(deaths, ticks);

console.table(results.slice(0, 10));

fs.writeFileSync("./analysis.json", JSON.stringify(results, null, 2));

console.log("\nSaved analysis.json");
