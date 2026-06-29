import { parseHeader } from "@laihoe/demoparser2";

const demoPath = "./demos/mibr-academy-vs-patins-da-ferrari-m1-mirage.dem";

const header = parseHeader(demoPath);

console.log(header);
