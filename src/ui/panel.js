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
const atk=t.atk>0;
text7(dark?"DARKNESS":(atk?"UNDER ATTACK":KIND_NAME[t.kind]),l.pnX+16,l.pnY+14,2,null,atk?DANGER:FG);
let status=dark?"STRENGTH "+darkEff(t):(atk?"HOLD IT":"CLEAR");
if(t.action==="extinguish")status=dark?"EXTINGUISHING":"SECURING";
text7(status,l.pnX+16,l.pnY+40,1,null,atk&&!t.action?DANGER:MID);
let y=l.pnY+60;
if(t.action==="extinguish"){
const c=crew(t);
text7(c.map(s=>s.name).join(" "),l.pnX+16,y,1,null,MID);y+=16;
if(dark){
const p=crewPower(t),eff=darkEff(t);
text7("PWR "+p+" / STR "+eff,l.pnX+16,y,1,null,p>0&&p<eff?DANGER:MID);y+=16;
if(p>0){const rem=Math.ceil((1-t.progress)*eff*EXT_SECS/p);text7(rem+"S LEFT",l.pnX+16,y,1,null,MID);}
}else{
const n=arrived(t).length;
if(n>0)text7(Math.max(1,Math.ceil(t.atk*DEFEND_SECS/n))+"S TO SECURE",l.pnX+16,y,1,null,MID);
}
y+=22;btn("stop","PULL BACK",l.pnX+16,y,140);
return;
}
if(picker){drawPicker(y);return;}
if(dark){if(extinguishable(t))btn("act_extinguish","EXTINGUISH",l.pnX+16,y,150,G.survivors.some(s=>!s.task));return;}
if(atk){btn("act_extinguish","DEFEND",l.pnX+16,y,150,G.survivors.some(s=>!s.task));return;}
if(t.kind==="grocery"||t.kind==="scrap"){
const n=crew(t).length;
if(n>0){text7(n+"/"+GATHER_SLOTS+" WORKING",l.pnX+16,y,1,null,MID);y+=20;btn("stop","STOP",l.pnX+16,y,120);y+=56;}
else{btn("act_gather","GATHER",l.pnX+16,y,140);y+=56;}
}
}
