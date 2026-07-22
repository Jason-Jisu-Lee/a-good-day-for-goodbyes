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
let hudD={g:null,food:0,mats:0,light:0,pr:0};
function tickHud(dt){
if(!G){hudD.g=null;return;}
if(hudD.g!==G){hudD.g=G;hudD.food=G.food;hudD.mats=G.mats;hudD.light=G.light||0;hudD.pr=G.pr||0;return;}
const sp=Math.min(1,dt*7),tgt={food:G.food,mats:G.mats,light:G.light||0,pr:G.pr||0};
for(const k in tgt){hudD[k]+=(tgt[k]-hudD[k])*sp;if(Math.abs(tgt[k]-hudD[k])<0.5)hudD[k]=tgt[k];}
}
function drawHUD(){
const l=L();
text7("FOOD "+Math.round(hudD.food),16,l.hud,2);
const fi=rateInfo("grocery"),mi=rateInfo("scrap");
const expn=G.survivors.length*FOOD_PER_SURV;
uiButtons.push({id:"inc",x:14,y:l.hud+20,w:96,h:13,en:true});
uiButtons.push({id:"exp",x:14,y:l.hud+34,w:96,h:13,en:true});
text7("+"+fi.tot+"/DAY",16,l.hud+22,1,null,FG);
text7("-"+expn+"/DAY",16,l.hud+36,1,null,FG);
if(hover==="inc")tip(16,l.hud+52,["FOOD TILES "+fi.n,...fi.lines]);
if(hover==="exp")tip(16,l.hud+52,["SURVIVORS "+G.survivors.length,G.survivors.length+" X "+FOOD_PER_SURV+"/DAY"]);
if(G.matsSeen||G.mats>0){
text7("MATERIAL "+Math.round(hudD.mats),160,l.hud,2);
uiButtons.push({id:"minc",x:158,y:l.hud+20,w:96,h:13,en:true});
text7("+"+mi.tot+"/DAY",160,l.hud+22,1,null,FG);
if(hover==="minc")tip(160,l.hud+38,["MATERIAL TILES "+mi.n,...mi.lines]);
}
if((G.light||0)>0)text7("LIGHT "+Math.round(hudD.light),300,l.hud,2);
let ex=440;
if(darkVisible()){
let dx=300;
if((G.light||0)>0)dx=300+tw7("LIGHT "+G.light,2)+16;
const ds="BLACKOUT "+darkShown();
cx.save();cx.globalAlpha=darkAlpha();
text7(ds,dx,l.hud,2,null,DANGER);
cx.restore();
ex=Math.max(ex,dx+tw7(ds,2)+16);
}
if(G.pr>0)text7("EMBER "+Math.round(hudD.pr),ex,l.hud,2);
if(G.items&&G.items.p1>0)text7("PLACEHOLDER1 "+G.items.p1,580,l.hud,1,null,MID);
if(G.items&&G.items.p2>0)text7("PLACEHOLDER2 "+G.items.p2,580,l.hud+14,1,null,MID);
const cap=G.tiles.filter(t=>t.state==="owned"&&(t.kind==="house"||t.kind==="house2")).length;
text7("SURVIVORS "+G.survivors.length+"/"+cap,160,l.hud+36,1,null,MID);
text7("DAY "+G.day,16,H-24,1,null,MID);
if(G.day>=G.tutDay&&!G.zoomTipSeen){
const msg=("ontouchstart" in window)?"PINCH: ZOOM MAP":"MOUSE WHEEL: ZOOM MAP";
const tw=tw7(msg,1)+32;
const bx=16,by=Math.round(H/2)-22;
px(bx,by,tw,44,BG);
edgeR(bx,by,tw,44,MID);
text7(msg,bx+16,by+15,1,null,FG);
uiButtons.push({id:"ztip",x:bx,y:by,w:tw,h:44,en:true});
}
if(zoomBarT>0){
const a=Math.min(1,zoomBarT/0.3);
cx.save();
cx.globalAlpha=a;
const ty=Math.round(H*0.3),th=Math.round(H*0.4),bx=W-11;
px(bx,ty,3,th,DIM);
for(let i=0;i<=8;i++){
const yy=ty+th-Math.round(i/8*th);
px(bx-1,yy,5,1,i===4?MID:DIM);
}
px(bx-2,ty+Math.round(th/2)-1,7,2,MID);
const p=(zoomS-ZOOM_MIN)/(ZOOM_MAX-ZOOM_MIN);
const my=ty+th-Math.round(p*th);
px(bx-2,my-5,7,10,FG);
cx.restore();
}
drawRoster();
btn("endturn","END DAY",W/2-75,H-58,150);
}
