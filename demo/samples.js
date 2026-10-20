/* Constructed examples, not customer records or reproduced application bugs. */
(function(root,factory){'use strict';const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.TransferGuardSamples=api;})(globalThis,function(){
 'use strict';
 const cases=[
  {id:'healthy',label:'Healthy transfer',description:'Everything arrives, including the existing links.',expected:'NO_DIFFERENCES'},
  {id:'equal-count-loss',label:'Same count, missing note',description:'Four notes arrive. Are they the right four?',expected:'DIFFERENCES_FOUND'},
  {id:'wrong-link',label:'Link points to the wrong note',description:'The link still opens, but its meaning changed.',expected:'DIFFERENCES_FOUND'},
  {id:'missing-attachment',label:'Missing attachment',description:'The note exists, but its attached checklist does not.',expected:'DIFFERENCES_FOUND'},
  {id:'changed-text',label:'A paragraph disappears',description:'An ID and title match even though the body changed.',expected:'DIFFERENCES_FOUND'},
  {id:'partial-inventory',label:'Not enough evidence',description:'Only part of the destination was observed.',expected:'NOT_VERIFIABLE'},
  {id:'source-broken-link',label:'A link was already broken',description:'Do not blame the transfer for a source problem.',expected:'REVIEW_REQUIRED'}
 ];
 function source(){return {format:'transferguard-demo/v1',synthetic:true,scope:'field-notes-practice',coverage:{records:'complete',attachments:'complete',relationships:'complete'},
  records:[
   {id:'NOTE-1',title:'Project overview',text:'The field-notes project has a plan, a checklist, and a decision record.',links:['NOTE-2','NOTE-4'],attachments:[]},
   {id:'NOTE-2',title:'Field plan',text:'Bring the checklist before starting.\nKeep the original observations unchanged.',links:['NOTE-3'],attachments:['FILE-1']},
   {id:'NOTE-3',title:'Observation log',text:'Record what happened, including anything that could not be checked.',links:[],attachments:['FILE-2']},
   {id:'NOTE-4',title:'Decision record',text:'Review unresolved findings before choosing the next step.',links:['NOTE-3'],attachments:[]}],
  attachments:[{id:'FILE-1',name:'checklist.txt',content:'Before: confirm scope.\nAfter: inspect the result.\n'},
   {id:'FILE-2',name:'observations.txt',content:'Sample only: no real field observations.\n'}]};}
 function pair(name){const s=source(),d=JSON.parse(JSON.stringify(s));
  if(!cases.some(c=>c.id===name))throw new Error('Unknown synthetic case.');
  if(name==='equal-count-loss'){d.records=d.records.filter(r=>r.id!=='NOTE-3');d.records.push({...JSON.parse(JSON.stringify(d.records[0])),id:'NOTE-5'});}
  if(name==='wrong-link')d.records[1].links=['NOTE-4'];
  if(name==='missing-attachment')d.attachments=d.attachments.filter(a=>a.id!=='FILE-1');
  if(name==='changed-text')d.records[1].text='Bring the checklist before starting.';
  if(name==='partial-inventory'){d.records=d.records.slice(0,2);d.coverage.records='partial';}
  if(name==='source-broken-link'){s.records[3].links=['NOTE-404'];d.records[3].links=['NOTE-404'];}
  return {source:s,destination:d};
 }
 return Object.freeze({cases,source,pair});
});
