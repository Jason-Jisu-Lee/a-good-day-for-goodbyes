function drawPicker(y){
const l=L();
let hd=picker.type.toUpperCase();
if(picker.type==="gather")hd+=" "+picker.set.size+"/"+GATHER_SLOTS;
text7(hd,l.pnX+16,y,1,null,MID);y+=18;
const full=picker.type==="gather"&&picker.set.size>=GATHER_SLOTS;
for(const s of G.survivors){
const on=picker.set.has(s);
const lk=lockedS(s)||(full&&!on);
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
if(picker.type==="gather"){text7("+"+genPM(n)+"/MIN",l.pnX+16,y,2);y+=30;}
else if(n>0){
let p=0;for(const s of picker.set)p+=s.power||SURV_POWER;
const eff=darkEff(sel),risk=p<eff;
text7("PWR "+p+" / STR "+eff,l.pnX+16,y,2,null,risk?DANGER:FG);
text7(Math.ceil(eff*EXT_SECS/p)+"S"+(risk?"   DEATH RISK":(p===eff?"   AT RISK":"")),l.pnX+16,y+22,1,null,risk?DANGER:MID);
y+=48;
}else y+=30;
btn("pick_go","START",l.pnX+16,y,80,n>0);
btn("pick_no","CANCEL",l.pnX+100,y,80);
}
