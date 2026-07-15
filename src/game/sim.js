function resolveExtinguish(t,power){
const pct=tierOf(t)>0?deathPct(tierOf(t),power):0;
let alive=0;
for(const s of crew(t)){
if(pct>0&&Math.random()<pct){killSurvivor(s);const q=tpos(t),d=DXY();spawnFloat(q.x,q.y-d.hh-4,"LOST");}
else alive++;
}
if(alive>0)finish(t);
else{t.action=null;t.progress=0;}
}
function sim(dt){
G.t+=dt;
G.dayT+=dt;if(G.dayT>=DAY_LEN){G.dayT-=DAY_LEN;G.day++;}
for(const t of G.tiles){
if(t.action==="extinguish"&&t.state!=="owned"){
const p=crewPower(t);
if(p>0){
t.progress+=dt*p/(darkEff(t)*EXT_SECS);
if(t.progress>=1)resolveExtinguish(t,p);
else if(crew(t).length===0)t.action=null;
}
}else if(t.state==="owned"&&t.atk>0){
const def=t.action==="extinguish"?arrived(t).length:0;
if(def>0){t.atk-=dt*def/DEFEND_SECS;if(t.atk<=0){t.atk=0;releaseCrew(t);}}
else{t.atk+=dt/ATTACK_SECS;if(t.atk>=1){t.atk=0;t.state="dark";t.dark=darkBase(tierOf(t));if(t.action)releaseCrew(t);const q=tpos(t),d=DXY();spawnFloat(q.x,q.y-d.hh-4,"TAKEN");}}
}else if(t.state==="owned"&&!t.action&&(t.kind==="grocery"||t.kind==="scrap")){
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
if(!G.attackOn){
if(G.armT<0){if(G.tiles.some(t=>t.state==="owned"&&tierOf(t)>=ATTACK_TIER))G.armT=ARM_MIN+Math.random()*(ARM_MAX-ARM_MIN);}
else{G.armT-=dt;if(G.armT<=0)G.attackOn=true;}
}
if(G.attackOn){
if(G.tiles.some(t=>t.atk>0))G.atkTimer=ATTACK_EVERY;
else{
G.atkTimer=(G.atkTimer||0)-dt;
if(G.atkTimer<=0){
G.atkTimer=ATTACK_EVERY;
const cands=G.tiles.filter(t=>t.state==="owned"&&!(t.atk>0)&&tierOf(t)>=1&&frontierT(t));
if(cands.length){cands.sort((a,b)=>tierOf(b)-tierOf(a));cands[0].atk=0.001;}
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
if(G.survivors.length===0&&overT<0){overT=0;persistPR();}
}
