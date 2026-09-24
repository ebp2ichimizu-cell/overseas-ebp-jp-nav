import {loadAllData} from "./data-loader.js";
import {parseRoute,startRouter} from "./router.js";
import {renderHome} from "./render-home.js";
import {renderProblemList,renderInterventionList} from "./render-lists.js";
import {renderProblem,renderIntervention} from "./render-detail.js";
import {renderCase,renderEvidence,renderTranslation,activateContent} from "./render-content.js";
import {escapeHtml} from "./utils.js";

const app=document.querySelector("#app");
let data=null;

function page(){
  if(!data) return;
  const route=parseRoute();

  switch(route.page){
    case "home":
      app.innerHTML=renderHome();
      break;
    case "problems":
      app.innerHTML=renderProblemList(data);
      break;
    case "problem":
      app.innerHTML=renderProblem(data,route.id);
      break;
    case "interventions":
      app.innerHTML=renderInterventionList(data);
      break;
    case "intervention":
      app.innerHTML=renderIntervention(data,route.id);
      break;
    case "case":
      app.innerHTML=renderCase(data,route.id);
      activateContent();
      break;
    case "evidence":
      app.innerHTML=renderEvidence(data,route.id);
      activateContent();
      break;
    case "translation":
      app.innerHTML=renderTranslation(data,route.id);
      activateContent();
      break;
    default:
      app.innerHTML='<section class="section"><div class="container"><div class="empty">ページが見つかりません。</div></div></section>';
  }

  window.scrollTo({top:0,behavior:"instant"});
  app.focus({preventScroll:true});
}

document.querySelector("#backButton").addEventListener("click",()=>{
  if(history.length>1) history.back();
  else location.hash="#/";
});

try{
  data=await loadAllData();
  startRouter(page);
}catch(err){
  app.innerHTML=`<section class="section"><div class="container"><div class="empty">データを読み込めませんでした。 ${escapeHtml(err.message)}</div></div></section>`;
}
