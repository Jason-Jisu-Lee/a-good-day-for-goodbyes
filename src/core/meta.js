const META={emb:0,upMat:0,upFood:0};
function metaSave(){try{localStorage.setItem("goodbyes_meta",JSON.stringify(META));}catch(e){}}
function metaLoad(){
try{
const d=JSON.parse(localStorage.getItem("goodbyes_meta")||"null");
if(d){META.emb=Math.max(0,d.emb|0);META.upMat=Math.min(3,Math.max(0,d.upMat|0));META.upFood=Math.min(3,Math.max(0,d.upFood|0));}
const old=parseInt(localStorage.getItem("goodbyes_pr")||"0",10)||0;
if(old){META.emb+=old;localStorage.removeItem("goodbyes_pr");metaSave();}
}catch(e){}
}
function metaBank(){if(G&&G.pr){META.emb+=G.pr;metaSave();}}
function b2Chance(kind){return (kind==="grocery"?META.upFood:kind==="scrap"?META.upMat:0)*0.1;}
metaLoad();
