import {escapeHtml,safeExternalUrl} from "./utils.js";
import {loadMarkdown,renderWithStats} from "./markdown.js";
import {
  renderAiReadingBlock,
  activateAiReading
} from "./ai-reading-helper.js";

function missing(){
  return `<section class="section"><div class="container"><div class="empty">ページが見つかりません。</div></div></section>`;
}

function shell(
  title,
  url,
  original,
  notice="",
  extraHtml=""
){
  const safe=safeExternalUrl(original || "");
  return `<section class="section"><div class="container">
    ${notice ? `<div class="content-notice">${escapeHtml(notice)}</div>` : ""}
    <article id="markdownContent" class="commentary-body" data-markdown="${escapeHtml(url || "")}">
      <h1>${escapeHtml(title || "")}</h1>
      <div class="loading">本文を読み込み中...</div>
    </article>
    ${safe ? `<div class="source-actions"><a href="${escapeHtml(safe)}" target="_blank" rel="noopener noreferrer">原文を見る ↗</a></div>` : ""}
    ${extraHtml || ""}
  </div></section>`;
}

/*
 * AI原著読解を実装した資料専用。
 * タイトル・短い概要の直後にAIブロックを置き、
 * 長い独自解説より前で見つけられるようにする。
 * Markdown側の先頭H1は重複を避けるため描画後に除去する。
 */
function evidenceShell(item){
  const url=item.commentary_slug
    ? `./content/evidence/ja/${item.commentary_slug}.md`
    : "";
  const safe=safeExternalUrl(item.original_url || "");
  const aiHtml=renderAiReadingBlock(item.aiReading);

  return `<section class="section"><div class="container">
    <header class="evidence-page-intro">
      <h1>${escapeHtml(item.title_ja || "")}</h1>
      ${item.summary_ja ? `<p class="lead evidence-page-summary">${escapeHtml(item.summary_ja)}</p>` : ""}
    </header>

    ${aiHtml || ""}

    <article
      id="markdownContent"
      class="commentary-body"
      data-markdown="${escapeHtml(url)}"
      data-remove-first-h1="true"
    >
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

  // 現在AI機能を持つ1資料で先行試験。
  // aiReadingがない資料は従来レイアウトのまま。
  if(item.aiReading){
    return evidenceShell(item);
  }

  return shell(
    item.title_ja,
    item.commentary_slug ? `./content/evidence/ja/${item.commentary_slug}.md` : "",
    item.original_url
  );
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
  activateAiReading();

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

    if(target.dataset.removeFirstH1 === "true"){
      target.querySelector("h1")?.remove();
    }
  }catch(err){
    target.innerHTML=`<div class="empty">本文を読み込めませんでした。 ${escapeHtml(err.message)}</div>`;
  }
}
