'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const tg = require('../demo/core.js');
// Independent, hand-specified source and outcome assertions.
const source = () => ({format:'transferguard-demo/v1', synthetic:true, scope:'practice',
 coverage:{records:'complete',attachments:'complete',relationships:'complete'},
 records:[{id:'N-1',title:'Start',text:'Keep this paragraph.',links:['N-2'],attachments:['A-1']},
 {id:'N-2',title:'Next',text:'Second paragraph.',links:[],attachments:[]}],
 attachments:[{id:'A-1',name:'note.txt',content:'Exact attachment text.'}]});
const clone = x => JSON.parse(JSON.stringify(x));
const codes = r => r.findings.map(f=>f.code);
test('ordinary valid control is preserved',()=>{
 const s=source(),r=tg.compare(s,clone(s));
 assert.equal(r.verdict,'NO_DIFFERENCES');assert.equal(r.exit_code,0);
 assert.equal(r.summary.source_records,2);assert.equal(r.summary.checked_relationships,2);
 assert.equal(r.source_system_completeness,'NOT_ESTABLISHED');
});
test('equal counts cannot hide a missing record',()=>{
 const s=source(),d=clone(s);d.records[1].id='N-3';const r=tg.compare(s,d);
 assert.equal(r.verdict,'DIFFERENCES_FOUND');
 for(const c of ['RECORD_MISSING','RECORD_EXTRA','LINK_TARGET_MISSING']) assert.ok(codes(r).includes(c));
});
test('a resolvable but wrong link target is detected',()=>{
 const s=source(),d=clone(s);d.records[0].links=['N-1'];const r=tg.compare(s,d);
 assert.ok(codes(r).includes('LINK_REMOVED'));assert.ok(codes(r).includes('LINK_ADDED'));assert.equal(r.exit_code,1);
});
test('content changes and missing attachment are separate findings',()=>{
 const s=source(),d=clone(s);d.records[0].text='';d.attachments=[];const r=tg.compare(s,d);
 for(const c of ['TEXT_CHANGED','ATTACHMENT_MISSING','ATTACHMENT_TARGET_MISSING']) assert.ok(codes(r).includes(c));
});
test('source defect is not falsely called transfer loss',()=>{
 const s=source();s.records[1].links=['N-404'];const r=tg.compare(s,clone(s));
 assert.equal(r.verdict,'REVIEW_REQUIRED');assert.equal(r.exit_code,3);
 assert.equal(r.findings.length,0);assert.equal(r.source_warnings[0].code,'SOURCE_LINK_DANGLING');
});
test('partial destination is unknown, not clean or missing certainty',()=>{
 const s=source(),d=clone(s);d.records=[];d.coverage.records='partial';const r=tg.compare(s,d);
 assert.equal(r.verdict,'NOT_VERIFIABLE');assert.equal(r.exit_code,3);assert.equal(r.findings.length,0);assert.equal(r.checks_complete,false);
});
test('input objects remain unchanged',()=>{
 const s=source(),d=clone(s),before=JSON.stringify([s,d]);tg.compare(s,d);assert.equal(JSON.stringify([s,d]),before);
});
test('package round trip has a specified payload',()=>{
 const s=source(),p=tg.exportPackage(s);assert.equal(p.format,'transferguard-demo-package/v1');assert.deepEqual(p.payload,s);assert.deepEqual(tg.readArtifact(tg.encode(p)),s);
});
for(const [name,mutate] of [
 ['duplicate IDs',s=>s.records.push(clone(s.records[0]))],
 ['duplicate references',s=>s.records[0].links.push('N-2')],
 ['unrecognized fields',s=>s.records[0].status='silently ignored?'],
 ['unsupported format',s=>s.format='jira'],
 ['real-data marker',s=>s.synthetic=false],
 ['absent coverage',s=>delete s.coverage],
 ['invalid reference',s=>s.records[0].links=['../../outside']],
 ['numeric ID coercion',s=>s.records[0].id=1]
]) test(`refuses ${name}`,()=>{const s=source();mutate(s);assert.throws(()=>tg.validate(s),tg.Problem);});
test('scope mismatch blocks a comparison',()=>{const s=source(),d=clone(s);d.scope='different';assert.throws(()=>tg.compare(s,d),/scope/i);});
test('duplicate JSON members do not silently replace evidence',()=>{assert.throws(()=>tg.readArtifact('{"format":"a","format":"b"}'),/duplicate/i);});
test('invalid JSON and excessive input return bounded errors',()=>{assert.throws(()=>tg.readArtifact('{'),tg.Problem);assert.throws(()=>tg.readArtifact(' '.repeat(tg.LIMITS.bytes+1)),tg.Problem);});
test('empty source is blocked rather than trivially passing',()=>{const s=source();s.records=[];assert.throws(()=>tg.compare(s,s),/populated source/);});
test('source dangling reference removal still records the transfer change',()=>{const s=source();s.records[1].links=['N-404'];const d=clone(s);d.records[1].links=[];const r=tg.compare(s,d);assert.equal(r.verdict,'DIFFERENCES_FOUND');assert.ok(codes(r).includes('LINK_REMOVED'));assert.equal(r.source_warnings.length,1);});
test('reordered records and references preserve meaning under this profile',()=>{const s=source(),d=clone(s);d.records.reverse();assert.equal(tg.compare(s,d).verdict,'NO_DIFFERENCES');});
test('changed attachment bytes are detected despite equal lengths',()=>{const s=source(),d=clone(s);d.attachments[0].content='Wrong attachment text.';assert.ok(codes(tg.compare(s,d)).includes('ATTACHMENT_CONTENT_CHANGED'));});
