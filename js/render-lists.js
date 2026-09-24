import {escapeHtml} from "./utils.js";

function renderList(title,lead,items,route,cls){
  const body=items.length
    ? `<div class="card-grid">${items.map(item=>`
        <article class="card ${cls}">
          <h2><a href="#/${route}/${escapeHtml(item.id)}">${escapeHtml(item.name_ja)}</a></h2>
          <p>${escapeHtml(item.summary_ja || "")}</p>
          <a class="action-link" href="#/${route}/${escapeHtml(item.id)}">見る →</a>
        </article>`).join("")}</div>`
    : `<div class="empty">データ準備中です。</div>`;

  return `<section class="section"><div class="container">
    <h1>${escapeHtml(title)}</h1>
    <p class="lead">${escapeHtml(lead)}</p>
    ${body}
  </div></section>`;
}

export function renderProblemList(data){
  return renderList(
    "課題・問題から探す",
    "まず海外の実例を確認し、そこから使われた対策へ進みます。",
    data.problems || [],
    "problem",
    "card-red"
  );
}

export function renderInterventionList(data){
  return renderList(
    "対策から探す",
    "対策の概要を確認し、海外情報源ごとの解説と実例へ進みます。",
    data.interventions || [],
    "intervention",
    "card-blue"
  );
}
