const SHOP_CATS=[["MATERIAL TILE","upMat"],["FOOD TILE","upFood"],["EMBER TILE",null],["MISC",null]];
function drawShop(){
uiButtons=[];
const port=H>W;
const cols=port?2:4;
const cw=Math.floor((W-64)/cols);
const rh=port?190:0;
text3("EMBER UPGRADES",W/2,port?Math.round(H*0.08):56,3,"c");
text7("EMBER "+META.emb,W/2,(port?Math.round(H*0.08):56)+34,2,"c",MID);
const top=port?Math.round(H*0.2):150;
for(let i=0;i<SHOP_CATS.length;i++){
const cat=SHOP_CATS[i][0],key=SHOP_CATS[i][1];
const x=32+(i%cols)*cw,y=top+Math.floor(i/cols)*(port?rh+40:0);
text7(cat,x,y,1,null,FG);
if(!key){text7("-",x,y+30,1,null,DIM);continue;}
const lvl=META[key];
for(let p=0;p<3;p++){
if(p<lvl)px(x+p*22,y+28,14,14,BO_YEL);
else edgeR(x+p*22,y+28,14,14,DIM);
}
text7(lvl*10+"%",x+74,y+27,1,null,lvl>0?BO_YEL:MID);
text7("+2/DAY TILE",x,y+52,1,null,MID);
const can=lvl<3&&META.emb>=1;
btn("buy_"+key,lvl>=3?"MAX":"BUY 1 EMBER",x,y+78,cw-28,can);
}
btn("shopclose","CONTINUE",W/2-75,H-(port?96:72),150);
}
function shopClick(id){
if(id==="shopclose"){mode="menu";fade=0;fading=false;return;}
if(id.startsWith("buy_")){
const k=id.slice(4);
if(META[k]!=null&&META[k]<3&&META.emb>=1){META[k]++;META.emb--;metaSave();}
}
}
