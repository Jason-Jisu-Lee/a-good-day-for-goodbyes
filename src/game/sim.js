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
}
}
for(const t of G.tiles){
if(t.state==="owned"&&t.atk){
const q=tpos(t),d=DXY();
const c=t.action==="extinguish"?crew(t):[];
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
if(t.action)releaseCrew(t);
spawnFloat(q.x,q.y-d.hh-4,"TAKEN");
}
}
}
for(const t of G.tiles){
if(t.state==="owned"&&!t.atk){
const p=tpos(t),d=DXY();
if(t.kind==="grocery"){G.food+=FOOD_PER_TILE;spawnFloat(p.x,p.y-d.hh-4,"+"+FOOD_PER_TILE);}
else if(t.kind==="scrap"){G.mats+=MAT_PER_TILE;spawnFloat(p.x,p.y-d.hh-4,"+"+MAT_PER_TILE);}
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
if(G.survivors.length===0&&overT<0){overT=0;persistPR();}
save();
}
