function sim(dt){
G.t+=dt;
G.dayT+=dt;if(G.dayT>=DAY_LEN){G.dayT-=DAY_LEN;G.day++;}
for(const t of G.tiles){
if(t.action==="extinguish"){
const p=crewPower(t);
if(p>0){
const eff=darkEff(t);
t.progress+=dt*p/(eff*EXT_SECS);
if(tierOf(t)>0&&p<=eff){
const per=DEATH_RATE*(eff-p+1)*dt;
for(const s of arrived(t)){if(Math.random()<per){killSurvivor(s);const q=tpos(t),d=DXY();spawnFloat(q.x,q.y-d.hh-4,"LOST");}}
}
if(t.progress>=1)finish(t);
else if(crew(t).length===0)t.action=null;
}
}else if(t.state==="owned"&&(t.kind==="grocery"||t.kind==="scrap")){
const r=genPM(arrived(t).length)/60*dt;
if(t.kind==="grocery")G.food+=r;else G.mats+=r;
t.gainAcc=(t.gainAcc||0)+r;
while(t.gainAcc>=1){
t.gainAcc-=1;
const p=tpos(t),d=DXY();
spawnFloat(p.x,p.y-d.hh-4,"+1");
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
