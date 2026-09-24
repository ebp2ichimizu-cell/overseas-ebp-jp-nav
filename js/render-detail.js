import {escapeHtml} from "./utils.js";

function cards(items,route,cls,titleKey,emptyText){
  if(!items.length) return `<div class="empty">${escapeHtml(emptyText)}</div>`;
  return `<div class="card-grid">${items.map(x=>`
    <article class="card ${cls}">
      ${x.source_name ? `<div class="meta">${escapeHtml(x.source_name)}</div>` : ""}
      ${x.stage_ja ? `<div class="stage-label">${escapeHtml(x.stage_ja)}</div>` : ""}
      <h3><a href="#/${route}/${escapeHtml(x.id)}">${escapeHtml(x[titleKey] || x.id)}</a></h3>
      ${x.question_ja ? `<p class="card-question">${escapeHtml(x.question_ja)}</p>` : ""}
      <p>${escapeHtml(x.summary_ja || x.result_ja || "")}</p>
      <a class="action-link" href="#/${route}/${escapeHtml(x.id)}">日本語解説を読む →</a>
    </article>`).join("")}</div>`;
}

function missing(){
  return `<section class="section"><div class="container"><div class="empty">ページが見つかりません。</div></div></section>`;
}

export function renderProblem(data,id){
  const problem=(data.problems||[]).find(x=>x.id===id);
  if(!problem) return missing();

  const cases=(problem.case_ids||[])
    .map(cid=>(data.cases||[]).find(x=>x.id===cid))
    .filter(Boolean)
    .map(c=>{
      const src=(data.sources||[]).find(s=>s.id===c.source_id);
      return {...c,source_name:c.provider_ja || src?.name || ""};
    });

  const interventions=(problem.intervention_ids||[])
    .map(iid=>(data.interventions||[]).find(x=>x.id===iid))
    .filter(Boolean);

  return `<section class="section"><div class="container">
    <h1>${escapeHtml(problem.name_ja)}</h1>
    <p class="lead">${escapeHtml(problem.summary_ja || "")}</p>

    <h2 class="section-heading">実例</h2>
    ${cards(cases,"case","card-red","title_ja","この課題の実例は準備中です。")}

    <h2 class="section-heading">関連する対策</h2>
    ${cards(interventions,"intervention","card-blue","name_ja","関連対策は準備中です。")}
  </div></section>`;
}

export function renderIntervention(data,id){
  const item=(data.interventions||[]).find(x=>x.id===id);
  if(!item) return missing();

  const evidence=(item.evidence_page_ids||[])
    .map(eid=>(data.evidencePages||[]).find(x=>x.id===eid))
    .filter(Boolean)
    .map(e=>{
      const src=(data.sources||[]).find(s=>s.id===e.source_id);
      return {...e,source_name:src?.name || ""};
    });

  const cases=(item.case_ids||[])
    .map(cid=>(data.cases||[]).find(x=>x.id===cid))
    .filter(Boolean)
    .map(c=>{
      const src=(data.sources||[]).find(s=>s.id===c.source_id);
      return {...c,source_name:c.provider_ja || src?.name || ""};
    });

  return `<section class="section detail-page"><div class="container">
    ${item.category_ja ? `<div class="detail-category">${escapeHtml(item.category_ja)}</div>` : ""}
    <h1>${escapeHtml(item.name_ja)}</h1>
    <p class="lead detail-lead">${escapeHtml(item.summary_ja || "")}</p>
    ${item.key_point_ja ? `<div class="key-point"><strong>最重要ポイント</strong><p>${escapeHtml(item.key_point_ja)}</p></div>` : ""}

    <h2 class="section-heading">対策・エビデンス</h2>
    ${cards(evidence,"evidence","card-blue","title_ja","海外情報源ごとの解説は準備中です。")}

    <h2 class="section-heading">代表的な実践事例</h2>
    ${cards(cases,"case","card-red","title_ja","この対策を使った実例は準備中です。")}
  </div></section>`;
}
