#!/usr/bin/env node
'use strict';
// Small deliberately faulty variants challenge the tests, not a historical product baseline.
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),assert=require('node:assert/strict');
const {spawnSync}=require('node:child_process');
const root=path.resolve(__dirname,'..'),original=fs.readFileSync(path.join(root,'demo/core.js'),'utf8');
const variants=[
 ['equal-count-shortcut',"const limited=['source','destination']", "if(s.size===d.size)return report;\n  const limited=['source','destination']"],
 ['ignore-body-loss',"if(r[field]!==target[field])add(field.toUpperCase()", "if(field!=='text'&&r[field]!==target[field])add(field.toUpperCase()"],
 ['treat-unknown-as-clean',"report.verdict='NOT_VERIFIABLE';report.exit_code=3", "report.verdict='NO_DIFFERENCES';report.exit_code=0"],
 ['ignore-link-differences',"if(report.findings.length){report.verdict", "report.findings=report.findings.filter(f=>!f.code.startsWith('LINK_'));\n  if(report.findings.length){report.verdict"]
];
const results=[];
for(const [name,old,replacement] of variants){
 assert.equal(original.split(old).length,2,'unique mutation site');
 const dir=fs.mkdtempSync(path.join(fs.realpathSync(os.tmpdir()),'tg-mutant-'));
 try{
  fs.mkdirSync(path.join(dir,'demo'));fs.mkdirSync(path.join(dir,'tests'));
  fs.writeFileSync(path.join(dir,'demo/core.js'),original.replace(old,replacement));
  fs.copyFileSync(path.join(root,'tests/core.test.cjs'),path.join(dir,'tests/core.test.cjs'));
  const r=spawnSync(process.execPath,['--test','tests/core.test.cjs'],{cwd:dir,encoding:'utf8',timeout:10000});
  assert.equal(r.signal,null);assert.notEqual(r.status,0,'mutant must be detected: '+name);
  assert.ok(!/Cannot find module|SyntaxError/.test(r.stdout+r.stderr),'apparatus must reach assertions');
  results.push({mutation:name,detected:true});
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
}
console.log(JSON.stringify({mutations:results,claim:'These constructed code faults were detected by the core tests. This is not independent review or general correctness.'},null,2));
