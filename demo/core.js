/* TransferGuard synthetic demonstration engine. MIT. No I/O or dependencies. */
(function(root,factory){
 'use strict';
 const api=factory();
 if(typeof module==='object' && module.exports) module.exports=api;
 else root.TransferGuardDemo=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 const VERSION='0.0.1-demo';
 const FORMAT='transferguard-demo/v1';
 const PACKAGE='transferguard-demo-package/v1';
 const LIMITS=Object.freeze({bytes:1048576,records:1000,attachments:1000,refs:100,relationships:5000,text:16000,depth:16});
 class Problem extends Error {constructor(code,message){super(message);this.name='TransferGuardProblem';this.code=code;}}
 const fail=(code,message)=>{throw new Problem(code,message);};
 const isObj=x=>x!==null && typeof x==='object' && !Array.isArray(x);
 function keys(x,allowed,where){
  if(!isObj(x)||Object.keys(x).length!==allowed.length||allowed.some(k=>!Object.hasOwn(x,k))||Object.keys(x).some(k=>!allowed.includes(k)))
   fail('UNSUPPORTED_SHAPE',`${where} needs exactly: ${allowed.join(', ')}. No fields are silently ignored.`);
 }
 function text(x,max,where){if(typeof x!=='string'||x.length>max||x.includes('\u0000'))fail('INVALID_TEXT',`${where} must be text of at most ${max} characters, without null bytes.`);}
 function id(x,where){if(typeof x!=='string'||!/^[A-Z][A-Z0-9_-]{0,39}$/.test(x))fail('INVALID_ID',`${where} needs an explicit uppercase demo ID, not a path or inferred name.`);}
 function unique(items,where){if(new Set(items).size!==items.length)fail('DUPLICATE_ID',`Duplicate identity or reference in ${where}.`);}
 function refs(xs,where){if(!Array.isArray(xs)||xs.length>LIMITS.refs)fail('REFERENCE_LIMIT',`${where} must be an array with at most ${LIMITS.refs} explicit IDs.`);xs.forEach(x=>id(x,where));unique(xs,where);}
 function validate(b){
  keys(b,['format','synthetic','scope','coverage','records','attachments'],'Bundle');
  if(b.format!==FORMAT||b.synthetic!==true)fail('UNSUPPORTED_FORMAT',`Only explicitly synthetic ${FORMAT} samples are supported. This marker is not a sensitive-data detector.`);
  text(b.scope,120,'Scope');if(!b.scope.trim())fail('MISSING_SCOPE','Declare the demo scope.');
  keys(b.coverage,['records','attachments','relationships'],'Coverage');
  for(const v of Object.values(b.coverage)) if(!['complete','partial','unknown'].includes(v))fail('INVALID_COVERAGE','Coverage must be complete, partial, or unknown.');
  if(!Array.isArray(b.records)||b.records.length>LIMITS.records||!Array.isArray(b.attachments)||b.attachments.length>LIMITS.attachments)fail('RECORD_LIMIT','The synthetic sample exceeds its record or attachment limit.');
  for(const r of b.records){keys(r,['id','title','text','links','attachments'],'Record');id(r.id,'Record');text(r.title,240,'Title');text(r.text,LIMITS.text,'Body');refs(r.links,'Links');refs(r.attachments,'Attachment references');}
  for(const a of b.attachments){keys(a,['id','name','content'],'Attachment');id(a.id,'Attachment');text(a.name,240,'Attachment name');text(a.content,LIMITS.text,'Attachment content');}
  unique(b.records.map(r=>r.id),'records');unique(b.attachments.map(a=>a.id),'attachments');
  if(b.records.reduce((n,r)=>n+r.links.length+r.attachments.length,0)>LIMITS.relationships)fail('RELATIONSHIP_LIMIT','The demo supports at most 5000 declared relationships per snapshot.');
  if(new TextEncoder().encode(JSON.stringify(b)).length>LIMITS.bytes)fail('INPUT_LIMIT','The synthetic bundle exceeds 1 MiB.');
  return b;
 }
 // JSON.parse alone accepts duplicate object keys. Detect those before they can erase evidence.
 function parseStrict(raw){
  if(typeof raw!=='string'||new TextEncoder().encode(raw).length>LIMITS.bytes)fail('INPUT_LIMIT','Provide a UTF-8 demo JSON file no larger than 1 MiB.');
  let parsed;try{parsed=JSON.parse(raw);}catch{fail('INVALID_JSON','The file is not valid JSON. No comparison ran.');}
  let i=0;
  const ws=()=>{while(i<raw.length&&/\s/.test(raw[i]))i++;};
  function str(){const start=i++;while(i<raw.length){if(raw[i]==='\\'){i+=2;continue;}if(raw[i++]==='"')break;}return JSON.parse(raw.slice(start,i));}
  function value(depth){
   if(depth>LIMITS.depth)fail('DEPTH_LIMIT','JSON nesting exceeds the supported limit.');ws();
   if(raw[i]==='"'){str();return;}
   if(raw[i]==='{'){
    i++;ws();const seen=new Set();if(raw[i]==='}'){i++;return;}
    while(i<raw.length){ws();const key=str();if(seen.has(key))fail('DUPLICATE_JSON_KEY','Duplicate JSON object keys are not accepted.');seen.add(key);ws();i++;value(depth+1);ws();if(raw[i++]==='}')break;}
   }else if(raw[i]==='['){
    i++;ws();if(raw[i]===']'){i++;return;}while(i<raw.length){value(depth+1);ws();if(raw[i++]===']')break;}
   }else{while(i<raw.length&&!/[\s,}\]]/.test(raw[i]))i++;}
  }
  value(0);return parsed;
 }
 function readArtifact(raw){
  let b=parseStrict(raw);
  if(isObj(b)&&b.format===PACKAGE){keys(b,['format','payload'],'Export package');b=b.payload;}
  return validate(b);
 }
 const encode=x=>JSON.stringify(x,null,2)+'\n';
 function exportPackage(bundle){validate(bundle);return {format:PACKAGE,payload:JSON.parse(JSON.stringify(bundle))};}
 const index=xs=>new Map(xs.map(x=>[x.id,x]));
 const snippet=x=>typeof x==='string'&&x.length>200?x.slice(0,200)+' [preview truncated]':x;
 function inspect(bundle){
  validate(bundle);
  return {protocol:'transferguard-demo-result/v1',version:VERSION,operation:'inspect',execution:'COMPLETED',scope:bundle.scope,
   counts:{records:bundle.records.length,attachments:bundle.attachments.length,relationships:bundle.records.reduce((n,r)=>n+r.links.length+r.attachments.length,0)},
   coverage:{...bundle.coverage},source_system_completeness:'NOT_ESTABLISHED',
   claim_boundary:'Inventory of the supplied synthetic artifact only; not evidence of a complete source account.'};
 }
 function compare(source,destination){
  validate(source);validate(destination);
  if(!source.records.length)fail('EMPTY_SOURCE','A comparison requires a populated source scope. No empty clean verdict is issued.');
  if(source.scope!==destination.scope)fail('SCOPE_MISMATCH','Source and destination scope must match exactly.');
  const s=index(source.records),d=index(destination.records),sa=index(source.attachments),da=index(destination.attachments);
  const report={protocol:'transferguard-demo-result/v1',version:VERSION,operation:'verify',execution:'COMPLETED',scope:source.scope,
   verdict:'NO_DIFFERENCES',exit_code:0,checks_complete:true,source_system_completeness:'NOT_ESTABLISHED',
   summary:{source_records:s.size,destination_records:d.size,source_attachments:sa.size,destination_attachments:da.size,
    expected_relationships:source.records.reduce((n,r)=>n+r.links.length+r.attachments.length,0),checked_relationships:0,findings:0},
   findings:[],source_warnings:[],relationships:[],limitations:[
    'Synthetic demo profile only. No live application, ENEX, Jira, or general CSV support.',
    'IDs and text are compared exactly; no fuzzy identity, semantic matching, or hidden normalization.',
    'Coverage is a statement in supplied data, not independently authenticated source completeness.',
    'A clean comparison does not authorize deleting originals.'],
   claim_boundary:'Comparison of the two supplied synthetic snapshots, not authenticity, source-account completeness, or a real application migration.'};
  const limited=['source','destination'].flatMap(side=>Object.entries(side==='source'?source.coverage:destination.coverage).filter(([,v])=>v!=='complete').map(([k,v])=>`${side}.${k}: ${v}`));
  if(limited.length){report.verdict='NOT_VERIFIABLE';report.exit_code=3;report.checks_complete=false;report.limitations.unshift('Required inventory is incomplete: '+limited.join('; '));return report;}
  const add=(code,object,field,before,after)=>report.findings.push({code,object,field,before:snippet(before),after:snippet(after)});
  for(const [rid,r] of s){
   const target=d.get(rid);
   if(!target)add('RECORD_MISSING',rid,'record',rid,null);
   else for(const field of ['title','text'])if(r[field]!==target[field])add(field.toUpperCase()+'_CHANGED',rid,field,r[field],target[field]);
   for(const [field,srcIndex,dstIndex,kind] of [['links',s,d,'LINK'],['attachments',sa,da,'ATTACHMENT']]){
    for(const ref of r[field]){
     let state='PRESERVED';
     if(!srcIndex.has(ref)){
      state='SOURCE_DANGLING';report.source_warnings.push({code:`SOURCE_${kind}_DANGLING`,object:rid,target:ref});
     }
     if(!target){state='RECORD_MISSING';}
     else if(!target[field].includes(ref)){state='MISSING';add(`${kind}_REMOVED`,rid,field,ref,null);}
     else if(srcIndex.has(ref)&&!dstIndex.has(ref)){state='TARGET_MISSING';add(`${kind}_TARGET_MISSING`,rid,field,ref,null);}
     report.relationships.push({source:rid,target:ref,kind:field,origin:'SOURCE_EXPLICIT',state});
     report.summary.checked_relationships++;
    }
    if(target)for(const ref of target[field])if(!r[field].includes(ref)){
     add(`${kind}_ADDED`,rid,field,null,ref);
     report.relationships.push({source:rid,target:ref,kind:field,origin:'DESTINATION_ONLY',state:'EXTRA'});
    }
   }
  }
  for(const [rid] of d)if(!s.has(rid))add('RECORD_EXTRA',rid,'record',null,rid);
  for(const [aid,a] of sa){const target=da.get(aid);if(!target)add('ATTACHMENT_MISSING',aid,'attachment',aid,null);
   else for(const field of ['name','content'])if(a[field]!==target[field])add('ATTACHMENT_'+field.toUpperCase()+'_CHANGED',aid,field,a[field],target[field]);}
  for(const [aid] of da)if(!sa.has(aid))add('ATTACHMENT_EXTRA',aid,'attachment',null,aid);
  report.summary.findings=report.findings.length;
  if(report.findings.length){report.verdict='DIFFERENCES_FOUND';report.exit_code=1;}
  else if(report.source_warnings.length){report.verdict='REVIEW_REQUIRED';report.exit_code=3;}
  return report;
 }
 return Object.freeze({VERSION,FORMAT,PACKAGE,LIMITS,Problem,validate,parseStrict,readArtifact,encode,exportPackage,inspect,compare});
});
