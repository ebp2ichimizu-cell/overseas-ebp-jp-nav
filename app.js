'use strict';
async function start(){
const read=async path=>{const r=await fetch(path);if(!r.ok)throw Error(path+' '+r.status);return r.json();};
const values=await Promise.all(['data.json','a-prompts.json','b-prompts.json','commentaries.json'].map(read));
const payload={data:values[0],aPrompts:values[1],bPrompts:values[2],commentaries:values[3]};
'use strict';
const {data,aPrompts,bPrompts,commentaries}=payload;
const names=Object.fromEntries(data.themes.map(t=>[t.id,t.name]));
const $=id=>document.getElementById(id);
const el=(t,c,txt)=>{const e=document.createElement(t);if(c)e.className=c;if(txt!==undefined)e.textContent=txt;return e;};
for(const t of data.themes){for(const mode of ['case','guide']){const s=$(t.type==='課題'?'p-'+mode:'i-'+mode);const o=el('option','',t.name);o.value=t.id;s.appendChild(o);}}
let shown={case:30,guide:30};
// Keywords are independent AND terms, not an exact phrase. Search only public fields and formal themes.
function normalize(value){return String(value??'').normalize('NFKC').toLocaleLowerCase().replace(/[・･\-‐‑‒–—―_／/\\()[\]{}「」『』【】,，、.．:：;；'"“”‘’]/g,' ').replace(/\s+/g,' ').trim();}
const searchIndex=new Map([...data.interventions,...data.guides].map(r=>[r.id,normalize([r.title_ja,r.title_original,r.source,r.author,r.year,r.bibliography,r.summary,r.doi,r.display?.title_ja,r.display?.title_original,r.display?.author,r.display?.year,r.display?.summary,r.display?.theme,...[...r.formal_I,...r.formal_P].flatMap(id=>[names[id],...(data.theme_search_aliases[id]||[])])].filter(Boolean).join(' '))]));
function filtered(mode){const records=mode==='case'?data.interventions:data.guides;const i=$('i-'+mode).value,p=$('p-'+mode).value;
 const terms=normalize($('q-'+mode).value).split(' ').filter(Boolean);
 return records.filter(x=>terms.every(t=>searchIndex.get(x.id).includes(t))&&(!i||x.formal_I.includes(i))&&(!p||x.formal_P.includes(p)));}
function render(mode){const found=filtered(mode),out=$('list-'+mode);out.replaceChildren();$('count-'+mode).textContent=found.length+'件／'+(mode==='case'?'520件':'51件');$('empty-'+mode).classList.toggle('hidden',found.length!==0);
 $('more-'+mode).classList.toggle('hidden',found.length<=shown[mode]);
 for(const r of found.slice(0,shown[mode])){
  const card=el('article','card');card.dataset.resourceId=r.id;
  const d=r.display||{};
  const theme=d.theme||[...r.formal_I,...r.formal_P].map(id=>names[id]).filter(Boolean)[0]||'';
  const title=(d.title_ja||r.title_ja)+(d.year?'（'+d.year+'）':'')+(theme&&!((d.title_ja||r.title_ja).includes(theme))?'：'+theme:'');
  card.appendChild(el('h3','',title));
  if(d.title_original&&d.title_original!==d.title_ja)card.appendChild(el('div','original',d.title_original));
  const authoredPop=['R0083','R0084','R0206','R0207','R0209','R0210','R0211','R0212','R0213','R0214'].includes(r.id);
  const authorLabel=['toolkit','cop_guidance'].includes(r.source_group_code)?'掲載主体':r.source_group_code==='practice'||(r.source_group_code==='pop_case'&&!authoredPop)?'報告主体':'著者';
  if(d.author)card.appendChild(el('p','author',authorLabel+'：'+d.author));
  else card.appendChild(el('p','author unverified',authorLabel+'未確認'));
  if(d.summary)card.appendChild(el('p','summary',d.summary));
  else card.appendChild(el('p','not-summary','簡易説明未確認。原典・掲載先をご確認ください。'));
  const source=el('p','source',r.source+(d.year?'':' ／ 発表年未確認'));
  card.appendChild(source);
  if(d.bibliographic_status?.includes('原題未照合'))card.appendChild(el('p','bibliographic-note','正式原題未照合（公式掲載名に基づく表示）'));
  const details=el('details','verification');details.appendChild(el('summary','','書誌・簡易説明の確認情報'));
  if(d.bibliographic_status)details.appendChild(el('p','','書誌：'+d.bibliographic_status));
  if(d.summary_status)details.appendChild(el('p','','簡易説明：'+d.summary_status));
  if(d.first_published)details.appendChild(el('p','','初回公開：'+d.first_published+(d.last_updated?' ／ 更新：'+d.last_updated:'')));
  if(d.display_bibliography)details.appendChild(el('p','','書誌情報：'+d.display_bibliography));
  if(d.display_doi)details.appendChild(el('p','','DOI：'+d.display_doi));
  for(const [label,urls] of [['書誌の確認元',d.bibliographic_source_urls],['説明の確認元',d.summary_source_urls]]){
   const refs=[...new Set((urls||[]).filter(u=>/^https?:\/\//i.test(u)))];
   if(refs.length){const links=el('div','verification-links');refs.forEach((url,i)=>{const a=el('a','summary-ref',label+(refs.length>1?' '+(i+1):''));a.href=url;a.target='_blank';a.rel='noopener noreferrer';links.appendChild(a);});details.appendChild(links);}
   else details.appendChild(el('p','bibliographic-note',label+'：独立記録なし'));
  }
  card.appendChild(details);
  const tags=el('div','tags');if(!r.formal_I.length&&!r.formal_P.length){tags.appendChild(el('span','tag empty','直接対応する正式テーマなし'));}
  for(const id of [...r.formal_I,...r.formal_P])tags.appendChild(el('span','tag',names[id]));card.appendChild(tags);
  const actions=el('div','actions'),link=el('a','','原典・掲載先を開く');link.href=r.official_url;link.target='_blank';link.rel='noopener noreferrer';actions.appendChild(link);
  if(r.fulltext_pdf_url){const pdf=el('a','','登録済み全文PDFを開く');pdf.href=r.fulltext_pdf_url;pdf.target='_blank';pdf.rel='noopener noreferrer';actions.appendChild(pdf);}
  if(mode==='case'){
   if(Array.isArray(r.verified_fulltext_urls) && r.verified_fulltext_urls.length){
     const full=el('a','','確認済み全文を開く');full.href=r.verified_fulltext_urls[0];full.target='_blank';full.rel='noopener noreferrer';actions.appendChild(full);
   }
   const isToolkit=r.source_group_code==='toolkit';
   const bt=el('button','',isToolkit?'Toolkit確認表版Bをコピー':'予備調査Bをコピー');bt.type='button';bt.addEventListener('click',()=>copyText(bPrompts[r.id]));actions.appendChild(bt);
   if(isToolkit){const audit=el('button','secondary','C②回答の再点検指示をコピー');audit.type='button';audit.addEventListener('click',()=>copyText(toolkitAuditPrompt(r)));actions.appendChild(audit);}
 }
  else {const select=el('select','');select.setAttribute('aria-label',(d.title_ja||r.title_ja)+'の読み方');for(const [v,label] of [['1','① わかりやすく読む'],['2','② 統計も含めて詳しく読む']]){const op=el('option','',label);op.value=v;select.appendChild(op);}actions.appendChild(select);const bt=el('button','','ガイド用Aをコピー');bt.type='button';bt.addEventListener('click',()=>copyText(aPrompts[r.id][select.value]));actions.appendChild(bt);}
  card.appendChild(actions);
   const commentary=commentaries[r.id];
   if(commentary){const box=el('details','commentary');box.appendChild(el('summary','','いちみず会による独自解説'));box.appendChild(el('p','',commentary.text));card.appendChild(box);}
  out.appendChild(card);
 }
}
function toolkitAuditPrompt(r){
 return [
 '直前の同じToolkit解説資料に関するC②回答を、独立した資料に切り替えずに再点検してください。',
 '原題：'+r.title_original,
 '公式原典URL：'+r.official_url,
 ...(r.fulltext_pdf_url?['登録済み全文PDF直リンク：'+r.fulltext_pdf_url+'（直接取得を優先し、解説自身との一致を確認）']:[]),
 '【確認順序】原典の上部評価表、Effect、How strong is the evidence、Mechanism、Moderators、Implementation、Economic considerations、Summaryを実際に再確認する。',
 '表A：Effect scale（方向）、Quality of evidence (Effect)、Mechanism、Moderators、Implementation、Economic costsの公式英語評定6行を、出典位置付きで転記。Strongを効果量と訳さず、本文の慎重な留保は別記する。',
 '表B：本文の重要な定量比較・件数換算・割合・RCT数等を、比較対象・アウトカム・出典節とともに抽出する。従来の統計学的効果量の記載がなくても数値比較を省略しない。',
 '方法論：引用レビューとToolkit独自の評価を分離し、メタ分析対象数、選択バイアス、効果の持続期間を確認できる限り説明する。',
 '表C：公式の効果方向／Effectの証拠の質／EMMIE各評定／定量比較を含む数値探索／原典の留保／アクセスと出典位置の6項目を自己点検し、前回回答で抜けた点と今回の修正を明示する。',
 '現在の取得範囲で確認できない値・ラベルは「未確認」として残し、「原典に記載なし」「全文確認済み」と決めつけない。取得できない場合も確認範囲で回答を完結させる。',
 '※この指示文には対象論文の正解数値や評定は記載していません。実際の原典から検証してください。'
 ].join('\n');
}

function reset(mode){shown[mode]=30;render(mode)}
for(const mode of ['case','guide']){for(const k of ['p','i'])$(k+'-'+mode).addEventListener('change',()=>reset(mode));$('clear-'+mode).addEventListener('click',()=>{$('p-'+mode).value='';$('i-'+mode).value='';$('q-'+mode).value='';reset(mode);});$('more-'+mode).addEventListener('click',()=>{shown[mode]+=30;render(mode);});}
for(const mode of ['case','guide'])for(const evt of ['input','search'])$('q-'+mode).addEventListener(evt,()=>reset(mode));
function activate(mode){const next=mode==='case'?'case':'guide';for(const k of ['case','guide']){$('panel-'+(k==='case'?'interventions':'guides')).classList.toggle('hidden',k!==next);$('tab-'+(k==='case'?'interventions':'guides')).setAttribute('aria-selected',String(k===next));} }
$('tab-interventions').addEventListener('click',()=>activate('case'));$('tab-guides').addEventListener('click',()=>activate('guide'));
let toasting;
function toast(txt){const t=$('toast');t.textContent=txt;t.style.display='block';if(toasting)clearTimeout(toasting);toasting=setTimeout(()=>{t.style.display='none'},2800)}
async function copyText(value){if(!value){toast('コピー対象のテキストがありません。');return;}
 try{if(navigator.clipboard && window.isSecureContext){await navigator.clipboard.writeText(value);toast('コピーしました。AIとの会話へ貼り付けてください。');return;}}catch(e){}
 const t=document.createElement('textarea');t.value=value;t.setAttribute('readonly','');t.style.position='fixed';t.style.opacity='0';document.body.appendChild(t);t.select();let copied=false;try{copied=document.execCommand('copy');}catch(e){}t.remove();
 if(copied){toast('コピーしました。AIとの会話へ貼り付けてください。');return;}
 $('copy-text').value=value;$('manual-copy').classList.add('visible');$('copy-text').focus();$('copy-text').select();
}
$('close-copy').addEventListener('click',()=>{$('manual-copy').classList.remove('visible');});
$('manual-copy').addEventListener('click',e=>{if(e.target===$('manual-copy'))$('manual-copy').classList.remove('visible');});
window.addEventListener('keydown',e=>{if(e.key==='Escape')$('manual-copy').classList.remove('visible');});
// Preserve both external deep links; new architecture keeps intervention/guide tabs distinct.
// The route denotes the entry, not a hidden extra tag restriction.
function applyRoute(){
 const hash=location.hash.replace(/^#\/?/,'');const pos=hash.indexOf('?');
 const route=pos<0?hash:hash.slice(0,pos);const params=new URLSearchParams(pos<0?'':hash.slice(pos+1));
 const q=params.get('q')||'';
 if(route==='problems'||route==='interventions'||route==='guides'||route===''){
  $('search-entry').textContent=route==='problems'?'課題からの検索':route==='interventions'?'対策からの検索':route==='guides'?'実務ガイドの検索':'';
  for(const mode of ['case','guide']){$('p-'+mode).value='';$('i-'+mode).value='';$('q-'+mode).value=q;}
  activate(route==='guides'?'guide':'case');reset('case');reset('guide');
 }
}
window.addEventListener('hashchange',applyRoute);applyRoute();

}
start().catch(e=>{document.getElementById('search-entry').textContent='資料を読み込めませんでした。再読み込みしてください。';console.error(e);});
