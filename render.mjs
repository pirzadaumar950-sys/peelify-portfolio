import { createRequire } from "module"; const require=createRequire("/opt/npm-tools/node_modules/");
const { chromium } = require("playwright");
const [a,b]=process.argv.slice(2).map(Number);
const br=await chromium.launch({channel:"chrome",args:["--no-sandbox"]});
const p=await br.newPage({viewport:{width:1080,height:1920}});
await p.goto("http://localhost:8777/"+(process.env.PG||"index.html")+"");await p.evaluate(()=>window.ready);
for(let i=a;i<b;i++){await p.evaluate(t=>window.renderAt(t),i/30);await p.screenshot({path:`${process.env.OD||"out"}/${String(i).padStart(4,"0")}.jpg`,type:"jpeg",quality:93});}
await br.close();
