#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const scripts=['core.js','samples.js','app.js'].map(n=>fs.readFileSync(path.join(__dirname,n),'utf8'));
if(scripts.some(s=>/<\/script/i.test(s)))throw new Error('Inline script closing tag is not permitted in source.');
const hashes=scripts.map(s=>"'sha256-"+crypto.createHash('sha256').update(s).digest('base64')+"'").join(' ');
let page=fs.readFileSync(path.join(__dirname,'page.html'),'utf8');
page=page.replace('__CSP__',`default-src 'none'; script-src ${hashes}; style-src 'unsafe-inline'; img-src data:; connect-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'`);
['__CORE__','__SAMPLES__','__APP__'].forEach((k,i)=>{page=page.replace(k,()=>scripts[i]);});
const out=path.join(__dirname,'TransferGuard-Try-Me.html');
if(process.argv.includes('--check')){if(fs.readFileSync(out,'utf8')!==page){console.error('HTML build differs from source');process.exitCode=1;}else console.log('HTML is byte-identical to source build');}
else{fs.writeFileSync(out,page);console.log('Built demo/TransferGuard-Try-Me.html');}
