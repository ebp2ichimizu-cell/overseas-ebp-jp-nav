const FILES={
  problems:"./data/problems.json",
  interventions:"./data/interventions.json",
  cases:"./data/cases.json",
  sources:"./data/sources.json",
  evidencePages:"./data/evidence-pages.json",
  translations:"./data/translations.json",
  resourcePages:"./data/resource-pages.json",
  guides:"./data/guides.json",
  aiReadingConfigs:"./data/ai-reading.json",
  themeAdditions:"./data/theme-additions-20260930.json"
};

function unique(values){
  return [...new Set(values || [])];
}

function mergeById(base=[],extra=[]){
  const map=new Map(base.map(item=>[item.id,item]));
  for(const item of extra || []){
    if(!item?.id) continue;
    map.set(item.id,{...(map.get(item.id)||{}),...item});
  }
  return [...map.values()];
}

function mergeAiReading(base={},extra={}){
  return {
    ...base,
    evidence:{...(base.evidence||{}),...(extra.evidence||{})},
    cases:{...(base.cases||{}),...(extra.cases||{})}
  };
}

function applyPatches(items=[],patches={}){
  return items.map(item=>{
    const patch=patches?.[item.id];
    if(!patch) return item;

    const next={...item,...(patch.set||{})};
    for(const [key,values] of Object.entries(patch.append||{})){
      next[key]=unique([...(next[key]||[]),...(values||[])]);
    }
    return next;
  });
}

function applyThemeAdditions(data){
  const extra=data.themeAdditions || {};

  data.problems=mergeById(data.problems,extra.problems);
  data.interventions=mergeById(data.interventions,extra.interventions);
  data.cases=mergeById(data.cases,extra.cases);
  data.evidencePages=mergeById(data.evidencePages,extra.evidencePages);
  data.aiReadingConfigs=mergeAiReading(data.aiReadingConfigs,extra.aiReading);

  data.problems=applyPatches(data.problems,extra.patches?.problems);
  data.interventions=applyPatches(data.interventions,extra.patches?.interventions);
  data.cases=applyPatches(data.cases,extra.patches?.cases);
  data.evidencePages=applyPatches(data.evidencePages,extra.patches?.evidencePages);

  delete data.themeAdditions;
  return data;
}

function attachAiReadingConfigs(data){
  const configs=data.aiReadingConfigs || {};

  for(const item of data.evidencePages || []){
    const config=configs.evidence?.[item.id];
    if(config) item.aiReading=config;
  }

  for(const item of data.cases || []){
    const config=configs.cases?.[item.id];
    if(config) item.aiReading=config;
  }

  return data;
}

export async function loadAllData(){
  const entries=await Promise.all(
    Object.entries(FILES).map(async ([key,url])=>{
      const res=await fetch(url,{cache:"no-store"});
      if(!res.ok) throw new Error(`${url} を読み込めませんでした (${res.status})`);
      return [key,await res.json()];
    })
  );

  const data=applyThemeAdditions(Object.fromEntries(entries));
  return attachAiReadingConfigs(data);
}
