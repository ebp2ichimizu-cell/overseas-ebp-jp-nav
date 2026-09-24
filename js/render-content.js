import {escapeHtml,safeExternalUrl} from "./utils.js";
import {loadMarkdown,renderWithStats} from "./markdown.js";

function missing(){
  return `<section class="section"><div class="container"><div class="empty">ページが見つかりません。</div></div></section>`;
}

function shell(title,url,original,notice=""){
  const safe=safeExternalUrl(original || "");
  return `<section class="section"><div class="container">
    ${notice ? `<div class="content-notice">${escapeHtml(notice)}</div>` : ""}
    <article id="markdownContent" class="commentary-body" data-markdown="${escapeHtml(url || "")}">
      <h1>${escapeHtml(title || "")}</h1>
      <div class="loading">本文を読み込み中...</div>
    </article>
    ${safe ? `<div class="source-actions"><a href="${escapeHtml(safe)}" target="_blank" rel="noopener noreferrer">原文を見る ↗</a></div>` : ""}
  </div></section>`;
}

export function renderCase(data,id){
  const item=(data.cases||[]).find(x=>x.id===id);
  if(!item) return missing();
  return shell(item.title_ja,item.commentary_slug ? `./content/cases/ja/${item.commentary_slug}.md` : "",item.original_url);
}

export function renderEvidence(data,id){
  const item=(data.evidencePages||[]).find(x=>x.id===id);
  if(!item) return missing();
  return shell(item.title_ja,item.commentary_slug ? `./content/evidence/ja/${item.commentary_slug}.md` : "",item.original_url);
}

export function renderTranslation(data,id){
  const item=(data.translations||[]).find(x=>x.id===id);
  if(!item) return missing();
  return shell(item.title_ja,item.content_slug ? `./content/translations/ja/${item.content_slug}.md` : "",item.original_url);
}

export function renderResourcePage(data,id){
  const item=(data.resourcePages||[]).find(x=>x.id===id);
  if(!item) return missing();
  return shell(item.title_ja,item.content_slug ? `./content/resources/ja/${item.content_slug}.md` : "",item.original_url);
}

export function renderGuide(data,id){
  const item=(data.guides||[]).find(x=>x.id===id);
  if(!item) return missing();
  return shell(
    item.title_ja,
    item.content_slug ? `./content/guides/ja/${item.content_slug}.md` : "",
    item.original_url,
    item.translation_status || ""
  );
}

export function renderInterventionGuide(data,id){
  const item=(data.interventions||[]).find(x=>x.id===id);
  if(!item || !item.detail_slug) return missing();
  return shell(item.name_ja,`./content/interventions/ja/${item.detail_slug}.md`,"");
}

export async function activateContent(){
  const target=document.querySelector("#markdownContent");
  if(!target) return;

  const url=target.dataset.markdown;
  if(!url){
    target.innerHTML='<div class="empty">本文準備中です。</div>';
    return;
  }

  try{
    const md=await loadMarkdown(url);
    target.innerHTML=renderWithStats(md);
  }catch(err){
    target.innerHTML=`<div class="empty">本文を読み込めませんでした。 ${escapeHtml(err.message)}</div>`;
  }
}
