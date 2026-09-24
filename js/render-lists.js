import {escapeHtml} from "./utils.js";
import {matchesSearch,normalizeSearchText} from "./search.js";

function cards(items,route,cls){
  return items.map(item=>`
    <article class="card ${cls} searchable-card" data-item-id="${escapeHtml(item.id)}">
      <h2><a href="#/${route}/${escapeHtml(item.id)}">${escapeHtml(item.name_ja)}</a></h2>
      ${item.name_en ? `<div class="list-name-en">${escapeHtml(item.name_en)}</div>` : ""}
      <p>${escapeHtml(item.summary_ja || "")}</p>
      <a class="action-link" href="#/${route}/${escapeHtml(item.id)}">見る →</a>
    </article>`).join("");
}

function renderSearchList({title,lead,items,route,cls,placeholder,mode}){
  const body=items.length
    ? `<div class="card-grid search-list-grid">${cards(items,route,cls)}</div>`
    : `<div class="empty">データ準備中です。</div>`;

  return `<section class="section search-list-page"><div class="container">
    <h1>${escapeHtml(title)}</h1>
    <p class="lead">${escapeHtml(lead)}</p>

    <div class="search-panel" data-search-mode="${escapeHtml(mode)}">
      <label class="search-label" for="siteSearchInput">キーワードで探す</label>
      <div class="search-row">
        <input
          id="siteSearchInput"
          class="search-input"
          type="search"
          inputmode="search"
          autocomplete="off"
          placeholder="${escapeHtml(placeholder)}"
          aria-describedby="searchHelp"
        >
        <button id="siteSearchClear" class="search-clear" type="button">クリア</button>
      </div>
      <p id="searchHelp" class="search-help">
        日本語・英語・関連語で検索できます。語が分からない場合は、下の一覧から選べます。
      </p>
      <div id="searchStatus" class="search-status" aria-live="polite"></div>
    </div>

    <div class="list-heading-row">
      <h2>一覧から探す</h2>
      <span class="list-count">${items.length}件収録</span>
    </div>

    <div id="searchNoResult" class="empty search-no-result" hidden>
      該当する項目が見つかりませんでした。検索語を短くするか、下の一覧から探してください。
    </div>

    ${body}
  </div></section>`;
}

function activateSearch(items){
  const input=document.querySelector("#siteSearchInput");
  const clear=document.querySelector("#siteSearchClear");
  const status=document.querySelector("#searchStatus");
  const noResult=document.querySelector("#searchNoResult");
  const cards=[...document.querySelectorAll(".searchable-card")];

  if(!input) return;

  function apply(){
    const query=input.value;
    const normalized=normalizeSearchText(query);
    let hit=0;

    cards.forEach(card=>{
      const item=items.find(x=>x.id===card.dataset.itemId);
      const matched=item ? matchesSearch(item,query) : false;
      card.hidden=!matched;
      if(matched) hit++;
    });

    if(!normalized){
      cards.forEach(card=>card.hidden=false);
      status.textContent="";
      noResult.hidden=true;
      return;
    }

    status.textContent=`「${query.trim()}」：${hit}件`;
    noResult.hidden=hit!==0;

    // No-hit fallback: keep the full list visible below the message.
    if(hit===0){
      cards.forEach(card=>card.hidden=false);
    }
  }

  input.addEventListener("input",apply);
  input.addEventListener("search",apply);
  clear?.addEventListener("click",()=>{
    input.value="";
    apply();
    input.focus();
  });
}

export function renderProblemList(data){
  return renderSearchList({
    title:"課題・問題から探す",
    lead:"現場の課題を検索し、海外で実際に行われた実例や関連する対策へ進みます。",
    items:data.problems || [],
    route:"problem",
    cls:"card-red",
    placeholder:"例：自転車盗、施錠、盗品市場、駐輪場",
    mode:"problems"
  });
}

export function renderInterventionList(data){
  return renderSearchList({
    title:"対策から探す",
    lead:"対策名や関連する実務用語から検索し、海外情報源ごとの解説と実例へ進みます。",
    items:data.interventions || [],
    route:"intervention",
    cls:"card-blue",
    placeholder:"例：ホットスポット、重点パトロール、POP、micro places",
    mode:"interventions"
  });
}

export function activateListSearch(data,mode){
  const items=mode==="problems" ? (data.problems || []) : (data.interventions || []);
  activateSearch(items);
}
