/* Browser controller. Untrusted sample strings are displayed using textContent. */
'use strict';
(function(){
 const tg=globalThis.TransferGuardDemo,samples=globalThis.TransferGuardSamples;
 const $=id=>document.getElementById(id);
 let current='healthy',pair=samples.pair(current),report=null,imported=false,generation=0;
 const el=(tag,text,cls)=>{const x=document.createElement(tag);if(text!==undefined)x.textContent=text;if(cls)x.className=cls;return x;};
 function banner(title,body,kind=''){$('result').className='banner '+kind;$('result').replaceChildren(el('strong',title),el('p',body));}
 function clear(){report=null;$('save-report').disabled=true;$('findings').replaceChildren();$('relations').replaceChildren();$('relations-section').classList.add('hidden');}
 function table(headers,rows){const outer=el('div',undefined,'table-scroll'),t=el('table'),head=el('thead'),hr=el('tr');
  headers.forEach(h=>{const th=el('th',h);th.scope='col';hr.append(th);});head.append(hr);t.append(head);const body=el('tbody');
  rows.forEach(row=>{const tr=el('tr');row.forEach(v=>tr.append(el('td',v===null?'Not present':String(v),'evidence')));body.append(tr);});t.append(body);outer.append(t);return outer;
 }
 function counts(){
  $('source-count').textContent=pair.source.records.length+' notes';$('source-detail').textContent=pair.source.attachments.length+' text attachments · '+tg.inspect(pair.source).counts.relationships+' connections';
  $('destination-count').textContent=pair.destination?pair.destination.records.length+' notes':'Unavailable';
  $('destination-detail').textContent=pair.destination?pair.destination.attachments.length+' text attachments · '+tg.inspect(pair.destination).counts.relationships+' connections':'Import a valid synthetic package or select another sample.';
  $('destination-label').textContent=imported?'Imported from your selected file':'Transferred sample';$('run').disabled=!pair.destination;$('save-workspace').disabled=!imported||!pair.destination;
  const rows=[];for(const [label,b] of [['Source',pair.source],['Destination',pair.destination]])if(b)for(const r of b.records)rows.push([label,r.id,r.title,r.text,r.links.join(', ')||'None',r.attachments.join(', ')||'None']);
  $('records').replaceChildren(table(['Side','ID','Title','Body','Links','Attachments'],rows));
 }
 function choose(id){generation++;current=id;pair=samples.pair(id);imported=false;clear();
  const meta=samples.cases.find(c=>c.id===id);$('comparison-title').textContent=meta.label;$('description').textContent=meta.description;
  $('expected-text').textContent=meta.expected+'. This expectation describes the constructed fixture, not a previous test result.';$('expected').open=false;$('expected').classList.remove('hidden');
  for(const b of $('cases').children)b.setAttribute('aria-pressed',String(b.dataset.case===id));
  $('import-file').value='';$('import-state').textContent='No saved file imported.';counts();banner('No checks run yet','Run the comparison for the selected sample.');
 }
 const labels={RECORD_MISSING:'Note missing',RECORD_EXTRA:'Unexpected note',TITLE_CHANGED:'Title changed',TEXT_CHANGED:'Body changed',LINK_REMOVED:'Connection removed',LINK_ADDED:'Connection added',LINK_TARGET_MISSING:'Connection target missing',ATTACHMENT_REMOVED:'Attachment reference removed',ATTACHMENT_ADDED:'Attachment reference added',ATTACHMENT_TARGET_MISSING:'Attachment reference has no file',ATTACHMENT_MISSING:'Attachment missing',ATTACHMENT_EXTRA:'Unexpected attachment',ATTACHMENT_NAME_CHANGED:'Attachment name changed',ATTACHMENT_CONTENT_CHANGED:'Attachment content changed'};
 async function digest(raw){return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(raw)))).map(b=>b.toString(16).padStart(2,'0')).join('');}
 async function run(){
  const ticket=++generation;clear();if(!pair.destination){banner('Not verifiable','No valid destination is loaded.','warn');return;}
  try{
   const r=tg.compare(pair.source,pair.destination);
   // Semantic snapshots are bound to the representation actually compared; source-account completeness is never inferred.
   const hashes=await Promise.all([digest(tg.encode(pair.source)),digest(tg.encode(pair.destination))]);
   if(ticket!==generation)return;r.evidence={source_sha256:hashes[0],destination_sha256:hashes[1],identity_boundary:'reserialized in-memory synthetic snapshots'};report=r;
   const messages={NO_DIFFERENCES:['No differences in the checked sample','All declared demo checks completed. This is not a source-account completeness claim.','good'],
    DIFFERENCES_FOUND:[r.findings.length+' differences need attention','The records and connections below show the exact changes.','bad'],
    NOT_VERIFIABLE:['Not enough evidence to verify','Required destination or source inventory is partial or unknown. No clean verdict was issued.','warn'],
    REVIEW_REQUIRED:['No transfer differences; source review needed','The original sample already has a broken reference. This was not invented as a transfer defect.','warn']};
   banner(...messages[r.verdict]);
   if(r.findings.length)$('findings').append(table(['Finding','Object','Field','Source','Destination'],r.findings.map(f=>[labels[f.code]||f.code,f.object,f.field,f.before,f.after])));
   if(r.source_warnings.length)$('findings').append(table(['Original-source warning','Object','Target'],r.source_warnings.map(w=>[w.code,w.object,w.target])));
   if(!r.checks_complete)$('findings').append(el('p',r.limitations[0],'small'));
   if(r.relationships.length){$('relations-section').classList.remove('hidden');$('relations-title').textContent='Inspect existing relationships ('+r.summary.checked_relationships+' source connections checked)';$('relations').append(table(['From','To','Type','Evidence origin','Result'],r.relationships.map(x=>[x.source,x.target,x.kind,x.origin,x.state])));}
   $('save-report').disabled=false;
  }catch(e){if(ticket!==generation)return;clear();banner('Comparison blocked',e instanceof tg.Problem?e.message:'The browser could not complete the check. No successful result is being retained.','warn');}
 }
 function download(name,raw){
  const blob=new Blob([raw],{type:'application/json;charset=utf-8'}),url=URL.createObjectURL(blob),a=el('a');a.href=url;a.download=name;a.hidden=true;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
 }
 samples.cases.forEach(c=>{const b=el('button',undefined,'case');b.type='button';b.dataset.case=c.id;b.append(el('strong',c.label),el('span',c.description));b.addEventListener('click',()=>choose(c.id));$('cases').append(b);});
 $('run').addEventListener('click',run);
 $('save-report').addEventListener('click',()=>{if(report)download('transferguard-demo-report.json',tg.encode(report));});
 $('export').addEventListener('click',()=>{download('transferguard-demo-export.json',tg.encode(tg.exportPackage(pair.source)));$('import-state').textContent='Download requested. Select the saved file below to read it back; the page cannot confirm the save itself.';});
 $('save-workspace').addEventListener('click',()=>{if(imported&&pair.destination)download('transferguard-demo-workspace.json',tg.encode(pair.destination));});
 $('import-file').addEventListener('change',async()=>{
  const ticket=++generation,file=$('import-file').files[0];clear();pair.destination=null;imported=false;counts();$('expected').classList.add('hidden');
  banner('Destination not yet verified','The previous result was cleared. Reading only the file you selected.','warn');
  if(!file){$('import-state').textContent='No file selected.';return;}
  try{
   if(file.size>tg.LIMITS.bytes)throw new tg.Problem('INPUT_LIMIT','The demo file must be no larger than 1 MiB.');
   const bytes=await file.arrayBuffer();if(ticket!==generation)return;
   let raw;try{raw=new TextDecoder('utf-8',{fatal:true}).decode(bytes);}catch{throw new tg.Problem('INVALID_ENCODING','The demo file must use valid UTF-8.');}
   const p=tg.parseStrict(raw);if(!p||p.format!==tg.PACKAGE)throw new tg.Problem('EXPECTED_PACKAGE','Select the synthetic export package downloaded by this demo, not an application export.');
   const b=tg.readArtifact(raw);if(b.scope!==pair.source.scope)throw new tg.Problem('SCOPE_MISMATCH','The imported sample has a different scope.');
   pair.destination=b;imported=true;counts();$('description').textContent='Comparing the original sample with the file you actually selected.';
   $('import-state').textContent='Imported into this page’s temporary practice workspace. Nothing was imported into another app. Run the comparison above.';
   banner('File imported; checks not run yet','Press Run comparison to inspect this actual selected file.');
  }catch(e){if(ticket!==generation)return;$('import-state').textContent=e instanceof tg.Problem?e.message:'The selected file could not be read.';banner('Import blocked','No valid destination or earlier successful result is being retained.','warn');}
 });
 $('feedback').addEventListener('click',()=>download('transferguard-personal-feedback.json',tg.encode({build:tg.VERSION,synthetic_only:true,
  instructions:'Fill this locally. Do not include private data. No feedback is sent automatically.',
  questions:{opened_without_help:'',healthy_result_clear:'',equal_count_loss_understood:'',wrong_link_understood:'',unknown_not_confused_with_pass:'',export_import_completed:'',most_confusing_step:'',one_change_to_make_it_useful:''}})));
 choose('healthy');
})();
