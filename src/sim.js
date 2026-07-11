function sim(dt){
G.t+=dt;
G.dayT+=dt;if(G.dayT>=DAY_LEN){G.dayT-=DAY_LEN;G.day++;}
for(const t of G.tiles){
if(t.action){
const n=arrived(t).length;
if(n>0){t.progress+=dt*mult(n)/t.need;if(t.progress>=1)finish(t);}
}else if(t.state==="owned"&&!t.blocked&&(t.kind==="grocery"||t.kind==="scrap")){
const n=arrived(t).length;
if(n>0){
const r=n*(t.kind==="grocery"?FOOD_PM:MAT_PM)/60*dt;
if(t.kind==="grocery")G.food+=r;else G.mats+=r;
}
}
}
if(G.mats>0&&!G.matsSeen)G.matsSeen=true;
for(const s of G.survivors){
s.eatT-=dt;
if(s.eatT<=0){
if(G.food>=1){G.food-=1;s.hungry=false;s.eatT=EAT_EVERY;}
else{s.hungry=true;s.eatT=6;}
}
if(s.hungry&&s.task&&s.task.tile.kind==="grocery"&&G.t>=s.arriveAt&&G.food>=1){G.food-=1;s.hungry=false;s.eatT=EAT_EVERY;}
}
}
