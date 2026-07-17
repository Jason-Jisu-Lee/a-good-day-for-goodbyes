function resolveReclaim(t){
const pct=deathPct(tierOf(t),crew(t).length);
let alive=0;
for(const s of crew(t)){
if(pct>0&&Math.random()<pct){killSurvivor(s);const q=tpos(t),d=DXY();spawnFloat(q.x,q.y-d.hh-4,"CONSUMED");}
else alive++;
}
if(alive>0)finish(t);
else{t.action=null;t.turnsLeft=reclaimTurns(tierOf(t));}
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
const def=t.action==="extinguish"?crew(t).length:0;
const q=tpos(t),d=DXY();
if(def>0){t.atk=false;releaseCrew(t);spawnFloat(q.x,q.y-d.hh-4,"HELD");}
else{t.atk=false;t.state="dark";t.turnsLeft=reclaimTurns(tierOf(t));if(t.action)releaseCrew(t);spawnFloat(q.x,q.y-d.hh-4,"TAKEN");}
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
if(G.day>=G.atkDay){
if(G.tiles.some(t=>t.atk))G.atkT=ATTACK_EVERY_T;
else{
G.atkT--;
if(G.atkT<=0){
G.atkT=ATTACK_EVERY_T;
const cands=G.tiles.filter(t=>t.state==="owned"&&!t.atk&&tierOf(t)>=1&&frontierT(t));
if(cands.length){cands.sort((a,b)=>tierOf(b)-tierOf(a));cands[0].atk=true;}
}
}
}
if(G.survivors.length===0&&overT<0){overT=0;persistPR();}
save();
}
