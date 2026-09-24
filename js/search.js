export function normalizeSearchText(value=""){
  return String(value)
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[・･\-‐‑‒–—―ー_／/\\()[\]{}「」『』【】,，.．:：;；'"“”‘’]/g," ")
    .replace(/\s+/g," ")
    .trim();
}

export function itemSearchText(item){
  const values=[
    item.name_ja,
    item.name_en,
    item.title_ja,
    item.title_en,
    item.category_ja,
    item.summary_ja,
    ...(item.search_terms || [])
  ].filter(Boolean);
  return normalizeSearchText(values.join(" "));
}

export function matchesSearch(item,query){
  const q=normalizeSearchText(query);
  if(!q) return true;

  const haystack=itemSearchText(item);
  const terms=q.split(" ").filter(Boolean);

  // AND search: every entered term must appear somewhere.
  return terms.every(term=>haystack.includes(term));
}
