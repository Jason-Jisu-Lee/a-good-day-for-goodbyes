function pickTaskType(){return picker.type==="gather"?"gather":"extinguish";}
function pickSet(){
const tt=pickTaskType();
return G.survivors.filter(s=>s.task&&s.task.type===tt&&s.task.tile===sel);
}
function drawPicker(y){
const l=L();
const gather=picker.type==="gather";
const set=pickSet();
if(!gather&&sel.atk){text7("ILLUMINATE",l.pnX+l.pnW/2,y,1,"c",MID);y+=18;}
const S=gather?0:(sel.state==="owned"?sel.atkS:tileStrength(sel));
const capped=gather?set.length>=GATHER_SLOTS:!crewUseful(S,set.length);
for(const s of G.survivors){
const on=set.includes(s);
const lk=!on&&(lockedS(s)||capped);
const id="pick_"+G.survivors.indexOf(s);
const rh=30;
if(!lk){
uiButtons.push({id,x:l.pnX+8,y,w:l.pnW-16,h:rh,en:true});
if(hover===id)px(l.pnX+8,y,l.pnW-16,rh,"#141414");
}
const bx=l.pnX+16,by=y+7;
edgeR(bx,by,16,16,lk?DIM:(on?s.col:MID));
if(on){px(bx+3,by+3,10,10,s.col);}
text7(s.name,l.pnX+42,by+4,1,null,lk?DIM:FG);
y+=rh;
}
const n=set.length;
if(!gather&&n>0&&n<minCrew(S)){
text7("NOT POSSIBLE",l.pnX+16,y,2,null,DANGER);
}else if(!gather&&n>0){
const tn=sel.action==="extinguish"&&sel.turnsLeft>0?sel.turnsLeft:taskDays(S,n);
const pct=Math.round(taskRisk(S,n)*100);
text7(tn+(tn===1?" DAY":" DAYS"),l.pnX+16,y,2,null,pct>0?DANGER:FG);
if(pct>0)text7(pct+"% RISK",l.pnX+16,y+22,1,null,DANGER);
}
}
