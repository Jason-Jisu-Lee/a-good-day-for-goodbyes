function btn(id,label,x,y,w,en){
uiButtons.push({id,x,y,w,h:44,en:en!==false});
const on=hover===id&&en!==false;
if(on){px(x,y,w,44,FG);text7(label,x+w/2,y+15,2,"c",BG);}
else{edgeR(x,y,w,44,en===false?DIM:FG);text7(label,x+w/2,y+15,2,"c",en===false?DIM:FG);}
}
function drawPanel(){
const l=L();
if(!sel)return;
const t=sel;
edgeR(l.pnX,l.pnY,l.pnW,l.pnH,DIM);
const dark=t.state!=="owned";
const atk=!!t.atk;
text7(dark?"DARKNESS":(atk?"UNDER ATTACK":KIND_NAME[t.kind]),l.pnX+16,l.pnY+14,2,null,atk?DANGER:FG);
let status=dark?reclaimTurns(tierOf(t))+" TURNS":(atk?"FALLS NEXT TURN":"");
if(t.action==="extinguish")status=dark?"RECLAIMING":"DEFENDING";
if(!dark&&!atk&&t.kind==="grocery")status="+"+FOOD_PER_TILE+"/TURN";
if(!dark&&!atk&&t.kind==="scrap")status="+"+MAT_PER_TILE+"/TURN";
text7(status,l.pnX+16,l.pnY+40,1,null,atk&&!t.action?DANGER:MID);
let y=l.pnY+60;
if(t.action==="extinguish"){
const c=crew(t);
text7(c.map(s=>s.name).join(" "),l.pnX+16,y,1,null,MID);y+=16;
if(dark){
const p=crewPower(t),pct=Math.round(deathPct(tierOf(t),p)*100);
text7("PWR "+p+(pct>0?"   "+pct+"% DEATH":""),l.pnX+16,y,1,null,pct>0?DANGER:MID);y+=16;
text7(t.turnsLeft+(t.turnsLeft===1?" TURN LEFT":" TURNS LEFT"),l.pnX+16,y,1,null,MID);
}
y+=22;btn("stop","PULL BACK",l.pnX+16,y,140);
return;
}
if(picker){drawPicker(y);return;}
if(dark){if(extinguishable(t))btn("act_extinguish","RECLAIM",l.pnX+16,y,150,G.survivors.some(s=>!s.task));return;}
if(atk){btn("act_extinguish","DEFEND",l.pnX+16,y,150,G.survivors.some(s=>!s.task));return;}
}
