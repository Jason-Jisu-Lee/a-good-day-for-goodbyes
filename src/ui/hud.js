function tip(x,y,lines){
let w=0;
for(const s of lines)w=Math.max(w,tw7(s,1));
px(x,y,w+12,lines.length*14+8,BG);
edgeR(x,y,w+12,lines.length*14+8,DIM);
for(let i=0;i<lines.length;i++)text7(lines[i],x+6,y+5+i*14,1);
}
function drawHUD(){
const l=L();
text7("FOOD "+Math.floor(G.food),16,l.hud,2);
let nf=0,nm=0;
for(const t of G.tiles){
if(t.state!=="owned")continue;
if(t.kind==="grocery")nf++;
else if(t.kind==="scrap")nm++;
}
const inc=nf*FOOD_PER_TILE;
const expn=G.survivors.length*FOOD_PER_SURV;
uiButtons.push({id:"inc",x:14,y:l.hud+20,w:96,h:13,en:true});
uiButtons.push({id:"exp",x:14,y:l.hud+34,w:96,h:13,en:true});
text7("+"+inc+"/DAY",16,l.hud+22,1,null,FG);
text7("-"+expn+"/DAY",16,l.hud+36,1,null,FG);
if(hover==="inc")tip(16,l.hud+52,["FOOD TILES "+nf,nf+" X "+FOOD_PER_TILE+"/DAY"]);
if(hover==="exp")tip(16,l.hud+52,["SURVIVORS "+G.survivors.length,G.survivors.length+" X "+FOOD_PER_SURV+"/DAY"]);
if(G.matsSeen||G.mats>0){
text7("MATERIAL "+Math.floor(G.mats),160,l.hud,2);
uiButtons.push({id:"minc",x:158,y:l.hud+20,w:96,h:13,en:true});
text7("+"+nm*MAT_PER_TILE+"/DAY",160,l.hud+22,1,null,FG);
if(hover==="minc")tip(160,l.hud+38,["MATERIAL TILES "+nm,nm+" X "+MAT_PER_TILE+"/DAY"]);
}
if(G.pr>0)text7("EMBER "+G.pr,300,l.hud,2);
const cap=G.tiles.filter(t=>t.state==="owned"&&(t.kind==="house"||t.kind==="house2")).length;
text7("SURVIVORS "+G.survivors.length+"/"+cap,160,l.hud+36,1,null,MID);
text7("DAY "+G.day,16,H-24,1,null,MID);
btn("endturn","END DAY",W/2-75,H-58,150);
}
