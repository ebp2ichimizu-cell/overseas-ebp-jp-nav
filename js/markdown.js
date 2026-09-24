import {escapeHtml,safeExternalUrl} from "./utils.js";

function inlineMarkdown(value=""){
  let text=String(value);
  const tokens=[];
  function token(html){ const key=`\uE000${tokens.length}\uE001`; tokens.push(html); return key; }

  text=text.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g,(_,label,url)=>{
    const safe=safeExternalUrl(url);
    return safe ? token(`<a href="${escapeHtml(safe)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)} ↗</a>`) : label;
  });
  text=escapeHtml(text)
    .replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>")
    .replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g,"$1<em>$2</em>");
  tokens.forEach((html,index)=>{ text=text.replaceAll(escapeHtml(`\uE000${index}\uE001`),html); });
  return text;
}

function splitTableRow(line){ return line.trim().replace(/^\|/,"").replace(/\|$/,"").split("|").map(x=>x.trim()); }
function isTableSeparator(line){ const cells=splitTableRow(line); return cells.length>0 && cells.every(c=>/^:?-{3,}:?$/.test(c)); }

export function renderMarkdown(markdown=""){
  const lines=String(markdown).replace(/\r\n?/g,"\n").split("\n");
  const out=[]; let i=0;
  while(i<lines.length){
    const line=lines[i];
    if(!line.trim() || /^<!--/.test(line)){ i++; continue; }

    const h=line.match(/^(#{1,6})\s+(.+)$/);
    if(h){ const level=h[1].length; out.push(`<h${level}>${inlineMarkdown(h[2])}</h${level}>`); i++; continue; }

    if(/^>\s?/.test(line)){
      const q=[]; while(i<lines.length && /^>\s?/.test(lines[i])){ q.push(lines[i].replace(/^>\s?/,"")); i++; }
      out.push(`<blockquote>${q.map(inlineMarkdown).join("<br>")}</blockquote>`); continue;
    }

    if(/^[-*]\s+/.test(line)){
      const items=[]; while(i<lines.length && /^[-*]\s+/.test(lines[i])){ items.push(lines[i].replace(/^[-*]\s+/,"")); i++; }
      out.push(`<ul>${items.map(x=>`<li>${inlineMarkdown(x)}</li>`).join("")}</ul>`); continue;
    }

    if(/^\d+[\.．]\s*/.test(line)){
      const items=[]; while(i<lines.length && /^\d+[\.．]\s*/.test(lines[i])){ items.push(lines[i].replace(/^\d+[\.．]\s*/,"")); i++; }
      out.push(`<ol>${items.map(x=>`<li>${inlineMarkdown(x)}</li>`).join("")}</ol>`); continue;
    }

    if(/^\|.*\|\s*$/.test(line) && isTableSeparator(lines[i+1] || "")){
      const header=splitTableRow(line); i+=2; const rows=[];
      while(i<lines.length && /^\|.*\|\s*$/.test(lines[i])){ rows.push(splitTableRow(lines[i])); i++; }
      out.push(`<div class="commentary-table-wrap"><table><thead><tr>${header.map(c=>`<th>${inlineMarkdown(c)}</th>`).join("")}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${inlineMarkdown(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`); continue;
    }

    const p=[line.trim()]; i++;
    while(i<lines.length && lines[i].trim() && !/^(#{1,6})\s+/.test(lines[i]) && !/^>\s?/.test(lines[i]) && !/^[-*]\s+/.test(lines[i]) && !/^\d+[\.．]\s*/.test(lines[i]) && !/^<!--/.test(lines[i]) && !(/^\|.*\|\s*$/.test(lines[i]) && isTableSeparator(lines[i+1] || ""))){ p.push(lines[i].trim()); i++; }
    out.push(`<p>${inlineMarkdown(p.join(" "))}</p>`);
  }
  return out.join("\n");
}

export function removeFrontMatter(markdown=""){
  const text=String(markdown).replace(/\r\n?/g,"\n");
  if(!text.startsWith("---\n")) return text;
  const end=text.indexOf("\n---\n",4);
  return end>=0 ? text.slice(end+5) : text;
}

export function renderWithStats(markdown=""){
  const startMarker="<!-- STATS_DETAIL_START -->";
  const endMarker="<!-- STATS_DETAIL_END -->";
  let text=String(markdown); let out="";
  while(true){
    const start=text.indexOf(startMarker);
    if(start<0){ out+=renderMarkdown(text); break; }
    const end=text.indexOf(endMarker,start+startMarker.length);
    if(end<0){ out+=renderMarkdown(text); break; }
    out+=renderMarkdown(text.slice(0,start));
    let stats=text.slice(start+startMarker.length,end);
    stats=stats.replace(/^\s*##\s+(?:統計を詳しく見る|統計で確認する)\s*\n/i,"");
    out+=`<details class="commentary-stats"><summary>統計を詳しく見る</summary><div class="commentary-stats-content">${renderMarkdown(stats)}</div></details>`;
    text=text.slice(end+endMarker.length);
  }
  return out;
}

export async function loadMarkdown(url){
  const res=await fetch(url,{cache:"no-store"});
  if(!res.ok) throw new Error(`${url} (${res.status})`);
  return removeFrontMatter(await res.text());
}
