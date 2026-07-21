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
for(const t of G.tiles){
if(t.action==="extinguish"&&t.state!=="owned"&&crew(t).length>0){
t.turnsLeft--;
if(t.turnsLeft<=0)resolveReclaim(t);
}else if(t.action==="clear"&&t.state==="owned"&&!t.atk){
t.turnsLeft--;
if(t.turnsLeft<=0)finishRubble(t);
}
}
for(const t of G.tiles){
if(t.state==="owned"&&t.atk){
const q=tpos(t),d=DXY();
const c=t.action==="extinguish"?defCrew(t):[];
if(c.length>0){
t.turnsLeft--;
if(t.turnsLeft<=0){
const alive=rollConsumed(t.atkS,c,q,d);
t.atk=false;t.atkS=0;releaseCrew(t);
if(alive>0)spawnFloat(q.x,q.y-d.hh-4,"HELD");
else{t.state="dark";t.turnsLeft=baseDays(tileStrength(t));spawnFloat(q.x,q.y-d.hh-4,"TAKEN");}
}
}else{
t.atk=false;t.atkS=0;t.state="dark";t.turnsLeft=baseDays(tileStrength(t));
releaseCrew(t);
spawnFloat(q.x,q.y-d.hh-4,"TAKEN");
}
}
}
for(const t of G.tiles){
if(t.state==="owned"&&!t.atk){
const p=tpos(t),d=DXY();
const w=crew(t).filter(s=>s.task.type==="gather").length;
if(t.kind==="grocery"){const r=tilePassive(t)+GATHER_BONUS*w;G.food+=r;spawnFloat(p.x,p.y-d.hh-4,"+"+r);}
else if(t.kind==="scrap"){const r=tilePassive(t)+GATHER_BONUS*w;G.mats+=r;spawnFloat(p.x,p.y-d.hh-4,"+"+r);}
}
}
G.food=Math.max(0,G.food-FOOD_PER_SURV*G.survivors.length);
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
boWordStart();
}
if(G.boDay&&G.day>=G.boDay){
G.boDay=0;
if((G.light||0)<(G.boNeed||0))endRun();
}
if(G.survivors.length===0)endRun();
save();
}
function endRun(){if(overT<0){overT=0;metaBank();}}
