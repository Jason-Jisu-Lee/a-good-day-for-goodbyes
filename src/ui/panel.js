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
if(dark)text7("?",l.pnX+l.pnW/2,l.pnY+14,2,"c",FG);
else text7(atk?"UNDER ATTACK":KIND_NAME[t.kind],l.pnX+16,l.pnY+14,2,null,atk?DANGER:FG);
const tn0=baseDays(tileStrength(t));
let status="";
if(dark)status=t.action?"":tn0+(tn0===1?" DAY":" DAYS");
else if(atk)status=t.action==="extinguish"?"":"FALLS NEXT DAY";
const gw=!dark&&!atk?crew(t).filter(s=>s.task.type==="gather").length:0;
if(!dark&&!atk&&(t.kind==="grocery"||t.kind==="scrap"))status="+"+(tilePassive(t)+GATHER_BONUS*gw)+"/DAY";
if(!dark&&!atk&&t.kind==="rubble")status=t.action==="clear"?"CLEARING":RUBBLE_COST+" MATERIAL   "+(t.clearD||1)+(( t.clearD||1)===1?" DAY":" DAYS");
text7(status,l.pnX+16,l.pnY+40,1,null,atk&&!t.action?DANGER:MID);
let y=l.pnY+60;
if(picker){drawPicker(y);return;}
if(t.action==="extinguish"){
picker={type:"extinguish"};
drawPicker(y);
return;
}
if(dark){
if(extinguishable(t)){picker={type:"extinguish"};drawPicker(y);}
return;
}
if(atk){btn("act_extinguish","DEFEND",l.pnX+16,y,150,G.survivors.some(s=>!lockedS(s)));return;}
if(t.kind==="rubble"){
if(t.action==="clear"){text7(t.turnsLeft+(t.turnsLeft===1?" DAY LEFT":" DAYS LEFT"),l.pnX+16,y,1,null,MID);return;}
btn("clear","CLEAR",l.pnX+16,y,120,G.mats>=RUBBLE_COST);
return;
}
if(t.kind==="grocery"||t.kind==="scrap"){
if(gw>0){
text7(crew(t).filter(s=>s.task.type==="gather").map(s=>s.name).join(" "),l.pnX+16,y,1,null,MID);y+=20;
btn("stop","STOP",l.pnX+16,y,120);
}else btn("act_gather","GATHER",l.pnX+16,y,140,G.survivors.some(s=>!lockedS(s)));
return;
}
}
