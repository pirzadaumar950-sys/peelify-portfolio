import { createRequire } from "module"; const require=createRequire("/opt/npm-tools/node_modules/");
const { chromium } = require("playwright");import fs from "fs";
const b=await chromium.launch({channel:"chrome",args:["--no-sandbox"]});const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.goto("http://localhost:8777/index2.html");await p.evaluate(()=>window.ready);
const c=await p.evaluate(()=>buildCues());const d=await p.evaluate(()=>S[S.length-1][2]);fs.writeFileSync("cues.json",JSON.stringify(c));console.log(c.length,d);await b.close();
