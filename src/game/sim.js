function rollConsumed(S,c,q,d){
const pct=taskRisk(S,c.length);
let dead=[];
if(pct>0&&Math.random()<pct){
const pool=c.slice();
for(let i=0;i<consumedN(S)&&pool.length;i++){
const s=pool.splice(Math.floor(Math.random()*pool.length),1)[0];
killSurvivor(s);
spawnFloat(q.x,q.y-d.hh-4,"CONSUMED");
dead.push(s);
}
}
return c.length-dead.length;
}
function resolveReclaim(t){
const q=tpos(t),d=DXY();
const alive=rollConsumed(tileStrength(t),crew(t),q,d);
if(alive>0)finish(t);
else{t.action=null;t.turnsLeft=baseDays(tileStrength(t));}
}
function endTurn(){
if(!META.tutZoom&&G.tiles.some(t=>tierOf(t)===4&&drawnTile(t))){META.tutZoom=true;metaSave();}
beatsBegin();
let boFire=false;
for(const t of G.tiles){
if(t.action==="extinguish"&&t.state!=="owned"&&crew(t).length>=minCrew(tileStrength(t))){
const ev=beatEv(t);
t.turnsLeft--;
if(t.turnsLeft<=0){
floatSink=ev.floats;
const b4=[G.food,G.mats,G.light||0,G.pr||0];
resolveReclaim(t);
ev.delta={food:G.food-b4[0],mats:G.mats-b4[1],light:(G.light||0)-b4[2],pr:(G.pr||0)-b4[3]};
floatSink=null;
beatOut(ev,t);
}else beatWork(ev,t);
}else if(t.action==="clear"&&t.state==="owned"&&!t.atk){
t.turnsLeft--;
if(t.turnsLeft<=0){
const ev=beatEv(t);
floatSink=ev.floats;
const b4=[G.food,G.mats];
finishRubble(t);
ev.delta.food=G.food-b4[0];ev.delta.mats=G.mats-b4[1];
floatSink=null;
ev.out="done";ev.label="CLEARED";ev.au="material";
beatCap.push(ev);
}
}
}
for(const t of G.tiles){
if(t.state==="owned"&&t.atk){
const q=tpos(t),d=DXY();
const c=t.action==="extinguish"?defCrew(t):[];
if(c.length>=minCrew(t.atkS)){
const ev=beatEv(t);
t.turnsLeft--;
if(t.turnsLeft<=0){
floatSink=ev.floats;
const alive=rollConsumed(t.atkS,c,q,d);
t.atk=false;t.atkS=0;releaseCrew(t);
if(alive>0)spawnFloat(q.x,q.y-d.hh-4,"HELD");
else{t.state="dark";t.turnsLeft=baseDays(tileStrength(t));spawnFloat(q.x,q.y-d.hh-4,"TAKEN");}
floatSink=null;
beatOut(ev,t);
}else beatWork(ev,t);
}else{
t.atk=false;t.atkS=0;t.state="dark";t.turnsLeft=baseDays(tileStrength(t));
releaseCrew(t);
spawnFloat(q.x,q.y-d.hh-4,"TAKEN");
}
}
}
for(const t of G.tiles){
if(t.state==="owned"&&!t.atk){
const w=crew(t).filter(s=>s.task.type==="gather").length;
if(t.kind==="grocery"){const r=tilePassive(t)+GATHER_BONUS*w;G.food+=r;beatIncome(t,"food",r);}
else if(t.kind==="scrap"){const r=tilePassive(t)+GATHER_BONUS*w;G.mats+=r;beatIncome(t,"mats",r);}
}
}
const spent=FOOD_PER_SURV*G.survivors.length;
const deficit=spent>G.food;
const foodPre=G.food;
G.food=Math.max(0,G.food-spent);
beatEat(foodPre-G.food);
if(deficit&&G.survivors.length>0){
G.starveStreak=(G.starveStreak||0)+1;
let kills=Math.min(G.starveStreak,G.survivors.length);
while(kills-->0&&G.survivors.length>0){
const pool=G.survivors.filter(s=>!s.mc);
const arr=pool.length?pool:G.survivors;
const s=arr[Math.floor(Math.random()*arr.length)];
beatStarve(s);
killSurvivor(s);
}
}else G.starveStreak=0;
for(const t of G.tiles){
if(t.action==="extinguish"){
const c=t.state==="owned"?defCrew(t):crew(t);
if(c.length===0){if(t.state==="owned")t.action=null;else releaseCrew(t);}
}
}
if(G.mats>0&&!G.matsSeen)G.matsSeen=true;
G.day++;
if(G.day>=G.nextAtk&&!G.tiles.some(t=>t.atk)){
const cands=G.tiles.filter(t=>t.state==="owned"&&tierOf(t)>=1&&frontierT(t));
if(cands.length){
cands.sort((a,b)=>tierOf(b)-tierOf(a));
const t=cands[0];
t.atk=true;
t.atkS=attackStrength(G.day);
G.atkN=(G.atkN||0)+1;
G.nextAtk=G.day+atkGap(G.atkN);
}
}
if(G.day%BO_EVERY===0){
G.boCount=(G.boCount||0)+1;
G.boNeed=boDark(G.boCount);
G.boFast=Math.random()<boFastChance(G.boCount);
G.boDay=G.day+(G.boFast?1:BO_LEAD);
boFire=true;
}
if(G.boDay&&G.day>=G.boDay){
G.boDay=0;
if((G.light||0)<(G.boNeed||0))endRun();
}
if(!G.survivors.some(s=>s.mc))endRun();
else if(G.survivors.length===1&&(G.peak||0)>=4&&!G.soleMusic){G.soleMusic=true;playSoleSurvivor();}
beatsEnd(boFire);
save();
}
function endRun(){if(overT<0){overT=0;stopDies();beatsClear();metaBank();}}
