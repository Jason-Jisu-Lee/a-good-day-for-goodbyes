function drawPicker(y){
const l=L();
text7(picker.type.toUpperCase(),l.pnX+16,y,1,null,MID);y+=18;
for(const s of G.survivors){
const lk=lockedS(s);
const on=picker.set.has(s);
const id="pick_"+G.survivors.indexOf(s);
if(!lk){
uiButtons.push({id,x:l.pnX+8,y:y-4,w:l.pnW-16,h:44,en:true});
if(hover===id)px(l.pnX+8,y-4,l.pnW-16,44,"#141414");
}
edgeR(l.pnX+16,y+8,14,14,lk?DIM:(on?FG:MID));
if(on&&!lk){px(l.pnX+19,y+11,8,8,FG);}
text7(s.name,l.pnX+42,y+6,1,null,lk?DIM:FG);
text7(statusOf(s),l.pnX+42,y+20,1,null,lk?DIM:MID);
y+=48;
}
const n=picker.set.size;
if(n>0){
let line;
if(picker.type==="gather"){
const r=n*(sel.kind==="grocery"?FOOD_PM:MAT_PM);
line="+"+r+"/MIN";
}else{
const need=picker.type==="scout"?SCOUT_T:(picker.type==="clear"?CLEAR_T:((sel.kind==="lot"||sel.kind==="cache")?RECLAIM_LOT_T:RECLAIM_T));
line=Math.ceil(need/mult(n))+"S";
}
text7(line,l.pnX+16,y,2);
}
y+=26;
btn("pick_go","START",l.pnX+16,y,80,n>0);
btn("pick_no","CANCEL",l.pnX+100,y,80);
}
