\
export function escapeHtml(value=""){
  return String(value).replace(/[&<>"']/g,ch=>({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[ch]));
}

export function safeExternalUrl(value=""){
  try{
    const url=new URL(value,location.href);
    return ["http:","https:"].includes(url.protocol) ? url.href : "";
  }catch{
    return "";
  }
}
