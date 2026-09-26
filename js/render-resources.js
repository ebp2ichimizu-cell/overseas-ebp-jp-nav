import {escapeHtml} from "./utils.js";

const CATEGORY_ORDER=[
  ["practice-guides","海外の実務ガイド","警察実務の進め方を体系的に読む"],
  ["interventions-evidence","対策とエビデンス","対策の効果や研究の位置づけを確認する"],
  ["practice-examples","海外の実践事例","海外の警察・関係機関で実際に行われた取組を見る"],
  ["problem-solving-analysis","問題解決・分析ガイド","問題から分析し、Responseを考える"],
  ["japanese-research","国内の関連研究","国内研究HUBで日本の研究・実装を確認する"]
];

function pageCard(item){
  return `<a class="library-card" href="#/resource/${escapeHtml(item.id)}">
    <div class="library-card-source">${escapeHtml(item.source_name || "")}</div>
    <h3>${escapeHtml(item.title_ja)}</h3>
    <p>${escapeHtml(item.summary_ja || "")}</p>
    <span>日本語ナビを読む →</span>
  </a>`;
}

function guideCard(item){
  return `<a class="library-card guide-card" href="#/guide/${escapeHtml(item.id)}">
    <div class="library-card-source">${escapeHtml(item.title_en || "")}</div>
    <h3>${escapeHtml(item.title_ja)}</h3>
    <p>${escapeHtml(item.summary_ja || "")}</p>
    <span>日本語で読む →</span>
  </a>`;
}

export function renderResources(data){
  const resources=data.resourcePages || [];
  const guides=data.guides || [];

  const sections=CATEGORY_ORDER.map(([id,title,lead])=>{
    if(id==="practice-guides"){
      return `<section class="library-category">
        <h2>${escapeHtml(title)}</h2>
        <p class="library-category-lead">${escapeHtml(lead)}</p>
        <div class="library-grid">${guides.length ? guides.map(guideCard).join("") : '<div class="empty">準備中です。</div>'}</div>
      </section>`;
    }

    if(id==="japanese-research"){
      return `<section class="library-category">
        <h2>${escapeHtml(title)}</h2>
        <p class="library-category-lead">${escapeHtml(lead)}</p>
        <div class="library-grid">
          <a class="library-card" href="https://ebp2ichimizu-cell.github.io/ichimizu-research-hub-github/#/" target="_blank" rel="noopener noreferrer">
            <div class="library-card-source">いちみず会</div>
            <h3>国内警察EBP・犯罪予防研究HUB</h3>
            <p>日本国内の警察・犯罪予防研究、介入、効果検証を確認します。</p>
            <span>研究HUBを開く ↗</span>
          </a>
        </div>
      </section>`;
    }

    const items=resources.filter(x=>x.category_id===id);
    return `<section class="library-category">
      <h2>${escapeHtml(title)}</h2>
      <p class="library-category-lead">${escapeHtml(lead)}</p>
      <div class="library-grid">${items.length ? items.map(pageCard).join("") : '<div class="empty">準備中です。</div>'}</div>
    </section>`;
  }).join("");

  return `<section class="section"><div class="container">
    <p class="section-kicker">OVERSEAS RESOURCES</p>
    <h1>海外の実務ガイド・情報源</h1>
    <p class="lead">
      情報源ごとに役割が異なります。「効果を知る」「実例を見る」「問題を分析する」など、
      目的に合わせて入口を選びます。
    </p>
    ${sections}
  </div></section>`;
}
