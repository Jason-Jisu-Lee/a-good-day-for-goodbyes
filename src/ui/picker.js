function pickTaskType(){return picker.type==="gather"?"gather":"extinguish";}
function pickSet(){
const tt=pickTaskType();
return G.survivors.filter(s=>s.task&&s.task.type===tt&&s.task.tile===sel);
}
function drawPicker(y){
const l=L();
const gather=picker.type==="gather";
const set=pickSet();
let hd=gather?"GATHER "+set.length+"/"+GATHER_SLOTS:(sel.state==="owned"?"DEFEND":"RECLAIM");
text7(hd,l.pnX+16,y,1,null,MID);y+=18;
const S=gather?0:(sel.state==="owned"?sel.atkS:tileStrength(sel));
const capped=gather?set.length>=GATHER_SLOTS:!crewUseful(S,set.length);
for(const s of G.survivors){
const on=set.includes(s);
const lk=!on&&(lockedS(s)||capped);
const id="pick_"+G.survivors.indexOf(s);
if(!lk){
uiButtons.push({id,x:l.pnX+8,y:y-4,w:l.pnW-16,h:44,en:true});
if(hover===id)px(l.pnX+8,y-4,l.pnW-16,44,"#141414");
}
edgeR(l.pnX+16,y+8,14,14,lk?DIM:(on?FG:MID));
if(on){px(l.pnX+19,y+11,8,8,FG);}
text7(s.name,l.pnX+42,y+6,1,null,lk?DIM:FG);
text7(statusOf(s),l.pnX+42,y+20,1,null,lk?DIM:(s.task?s.col:MID));
y+=48;
}
const n=set.length;
if(gather){
const base=sel.kind==="grocery"?FOOD_PER_TILE:MAT_PER_TILE;
text7("+"+(base+GATHER_BONUS*n)+"/DAY",l.pnX+16,y,2);
}else if(n>0&&n<minCrew(S)){
text7("NOT POSSIBLE",l.pnX+16,y,2,null,DANGER);
}else if(n>0){
const tn=sel.action==="extinguish"&&sel.turnsLeft>0?sel.turnsLeft:taskDays(S,n);
const pct=Math.round(taskRisk(S,n)*100);
text7(tn+(tn===1?" DAY":" DAYS"),l.pnX+16,y,2,null,pct>0?DANGER:FG);
if(pct>0)text7(pct+"% RISK",l.pnX+16,y+22,1,null,DANGER);
}
}
