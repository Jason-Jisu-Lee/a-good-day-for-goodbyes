function tip(x,y,lines){
let w=0;
for(const s of lines)w=Math.max(w,tw7(s,1));
px(x,y,w+12,lines.length*14+8,BG);
edgeR(x,y,w+12,lines.length*14+8,DIM);
for(let i=0;i<lines.length;i++)text7(lines[i],x+6,y+5+i*14,1);
}
function rateInfo(kind){
const m=new Map();
let tot=0,n=0;
for(const t of G.tiles){
if(t.state!=="owned"||t.kind!==kind)continue;
const w=crew(t).filter(s=>s.task.type==="gather").length;
const r=tilePassive(t)+GATHER_BONUS*w;
tot+=r;n++;
const key=r+"/DAY"+(w?" WORKED":"");
m.set(key,(m.get(key)||0)+1);
}
const lines=[...m.entries()].sort((a,b)=>parseInt(a[0])-parseInt(b[0])).map(([k,c])=>c+" X "+k);
return {tot,n,lines};
}
function drawHUD(){
const l=L();
text7("FOOD "+Math.floor(G.food),16,l.hud,2);
const fi=rateInfo("grocery"),mi=rateInfo("scrap");
const expn=G.survivors.length*FOOD_PER_SURV;
uiButtons.push({id:"inc",x:14,y:l.hud+20,w:96,h:13,en:true});
uiButtons.push({id:"exp",x:14,y:l.hud+34,w:96,h:13,en:true});
text7("+"+fi.tot+"/DAY",16,l.hud+22,1,null,FG);
text7("-"+expn+"/DAY",16,l.hud+36,1,null,FG);
if(hover==="inc")tip(16,l.hud+52,["FOOD TILES "+fi.n,...fi.lines]);
if(hover==="exp")tip(16,l.hud+52,["SURVIVORS "+G.survivors.length,G.survivors.length+" X "+FOOD_PER_SURV+"/DAY"]);
if(G.matsSeen||G.mats>0){
text7("MATERIAL "+Math.floor(G.mats),160,l.hud,2);
uiButtons.push({id:"minc",x:158,y:l.hud+20,w:96,h:13,en:true});
text7("+"+mi.tot+"/DAY",160,l.hud+22,1,null,FG);
if(hover==="minc")tip(160,l.hud+38,["MATERIAL TILES "+mi.n,...mi.lines]);
}
if(G.pr>0)text7("EMBER "+G.pr,300,l.hud,2);
if(G.items&&G.items.p1>0)text7("PLACEHOLDER1 "+G.items.p1,440,l.hud,1,null,MID);
if(G.items&&G.items.p2>0)text7("PLACEHOLDER2 "+G.items.p2,440,l.hud+14,1,null,MID);
const cap=G.tiles.filter(t=>t.state==="owned"&&(t.kind==="house"||t.kind==="house2")).length;
text7("SURVIVORS "+G.survivors.length+"/"+cap,160,l.hud+36,1,null,MID);
text7("DAY "+G.day,16,H-24,1,null,MID);
let tb=null;
if(G.tut===1)tb="SELECT A DARK TILE";
else if(G.tut===2&&G.tiles.some(t=>t.action))tb="TASKS RESOLVE AT END DAY";
else if(!G.atkTipSeen&&G.tiles.some(t=>t.atk))tb="DARKNESS ATTACKS";
if(tb){
const tw=tw7(tb,1)+32,bx=W/2-tw/2,by=54;
px(bx,by,tw,44,BG);
edgeR(bx,by,tw,44,MID);
text7(tb,W/2,by+15,1,"c",FG);
}else if(G.day>=G.tutDay&&!G.zoomTipSeen){
const msg=("ontouchstart" in window)?"PINCH: ZOOM MAP":"MOUSE WHEEL: ZOOM MAP";
const tw=tw7(msg,1)+32;
const bx=W/2-tw/2,by=54;
px(bx,by,tw,44,BG);
edgeR(bx,by,tw,44,MID);
text7(msg,W/2,by+15,1,"c",FG);
uiButtons.push({id:"ztip",x:bx,y:by,w:tw,h:44,en:true});
}
btn("endturn","END DAY",W/2-75,H-58,150);
}
