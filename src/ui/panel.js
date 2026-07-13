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
const name=t.state==="unknown"?"UNKNOWN":KIND_NAME[t.kind];
text7(name,l.pnX+16,l.pnY+14,2);
let status=t.state.toUpperCase();
if(t.state==="owned"&&t.blocked)status="BLOCKED";
if(t.action)status=t.action.toUpperCase()+"ING";
text7(status,l.pnX+16,l.pnY+40,1,null,MID);
let y=l.pnY+60;
if(t.action){
const n=arrived(t).length,c=crew(t);
text7(c.map(s=>s.name).join(" "),l.pnX+16,y,1,null,MID);y+=16;
if(n>0){const rem=Math.ceil((1-t.progress)*t.need/mult(n));text7(rem+"S LEFT",l.pnX+16,y,1,null,MID);}
return;
}
if(picker){drawPicker(y);return;}
if(t.state==="unknown"&&ownedAdjacent(t)){btn("act_scout","SCOUT",l.pnX+16,y,140);y+=56;}
if(t.state==="scouted"){btn("act_reclaim","RECLAIM",l.pnX+16,y,140);y+=56;}
if(t.state==="owned"&&t.blocked){
text7("COST "+CLEAR_COST+" MATERIALS",l.pnX+16,y,1,null,MID);y+=20;
btn("act_clear","CLEAR",l.pnX+16,y,140,G.mats>=CLEAR_COST);y+=56;
}
if(t.state==="owned"&&!t.blocked&&(t.kind==="grocery"||t.kind==="scrap")){
const n=crew(t).length;
if(n>0){text7(n+"/"+GATHER_SLOTS+" WORKING",l.pnX+16,y,1,null,MID);y+=20;btn("stop","STOP",l.pnX+16,y,120);y+=56;}
else{btn("act_gather","GATHER",l.pnX+16,y,140);y+=56;}
}
}
