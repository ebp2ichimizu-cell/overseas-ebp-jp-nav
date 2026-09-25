const FILES={
  problems:"./data/problems.json",
  interventions:"./data/interventions.json",
  cases:"./data/cases.json",
  sources:"./data/sources.json",
  evidencePages:"./data/evidence-pages.json",
  translations:"./data/translations.json",
  resourcePages:"./data/resource-pages.json",
  guides:"./data/guides.json",
  aiReadingConfigs:"./data/ai-reading.json"
};

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

  return attachAiReadingConfigs(Object.fromEntries(entries));
}
