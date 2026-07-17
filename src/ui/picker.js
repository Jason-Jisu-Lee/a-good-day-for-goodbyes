function drawPicker(y){
const l=L();
const gather=picker.type==="gather";
let hd=gather?"GATHER "+picker.set.size+"/"+GATHER_SLOTS:(sel.state==="owned"?"DEFEND":"RECLAIM");
text7(hd,l.pnX+16,y,1,null,MID);y+=18;
const S=gather?0:(sel.state==="owned"?sel.atkS:tileStrength(sel));
const capped=gather?picker.set.size>=GATHER_SLOTS:!crewUseful(S,picker.set.size);
for(const s of G.survivors){
const on=picker.set.has(s);
const lk=(lockedS(s)||capped)&&!on;
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
const n=picker.set.size;
if(gather){
const base=sel.kind==="grocery"?FOOD_PER_TILE:MAT_PER_TILE;
text7("+"+(base+GATHER_BONUS*n)+"/DAY",l.pnX+16,y,2);
y+=48;
}else{
const short=n<minCrew(S);
if(n>0&&short){
text7("NOT POSSIBLE",l.pnX+16,y,2,null,DANGER);
y+=48;
}else if(n>0){
const tn=taskDays(S,n),pct=Math.round(taskRisk(S,n)*100);
text7(tn+(tn===1?" DAY":" DAYS"),l.pnX+16,y,2,null,pct>0?DANGER:FG);
if(pct>0)text7(pct+"% RISK",l.pnX+16,y+22,1,null,DANGER);
y+=48;
}else y+=30;
}
btn("pick_go","START",l.pnX+16,y,80,n>0&&(gather||n>=minCrew(S)));
btn("pick_no","CANCEL",l.pnX+100,y,80);
}
