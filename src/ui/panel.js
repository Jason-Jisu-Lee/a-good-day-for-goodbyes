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
const hdr=dark?"?":KIND_NAME[t.kind];
text7(hdr,l.pnX+l.pnW/2,l.pnY+14,2,"c",atk?DANGER:FG);
const tn0=baseDays(tileStrength(t));
let status="";
if(dark)status=t.action?"":tn0+(tn0===1?" DAY":" DAYS");
else if(atk)status=t.action==="extinguish"?"":"CONSUMED IN 1 DAY";
else if(t.kind==="scrap")status="+"+tilePassive(t)+"/DAY";
else if(t.kind==="light"||t.kind==="light2")status="1 LIGHT";
else if(t.kind==="lot")status=t.action==="build"?"BUILDING":"BUILD   "+BUILD_COST+" MATERIAL";
text7(status,l.pnX+l.pnW/2,l.pnY+40,1,"c",atk&&!t.action?DANGER:MID);
let y=l.pnY+60;
if(picker){drawPicker(y);return;}
if(t.action==="extinguish"){picker={type:"extinguish"};drawPicker(y);return;}
if(dark){
if(extinguishable(t)){picker={type:"extinguish"};drawPicker(y);}
return;
}
if(atk){picker={type:"extinguish"};drawPicker(y);return;}
if(t.kind==="lot"){
if(t.action==="build"){text7(t.turnsLeft+(t.turnsLeft===1?" DAY LEFT":" DAYS LEFT"),l.pnX+16,y,1,null,MID);return;}
btn("build_mat","MATERIAL",l.pnX+16,y,l.pnW-32,G.mats>=BUILD_COST);
return;
}
}
