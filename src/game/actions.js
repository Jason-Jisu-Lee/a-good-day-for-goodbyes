function lockedS(s){return !!(s.task&&s.task.type!=="gather");}
function defCrew(t){return crew(t).filter(s=>s.task.type==="extinguish");}
function assign(t,type,members){
for(const s of members)s.task={type,tile:t};
if(type==="extinguish"){
if(t.state!=="owned")t.turnsLeft=taskDays(tileStrength(t),crew(t).length);
else if(t.atk)t.turnsLeft=taskDays(t.atkS,defCrew(t).length);
t.action="extinguish";
}
}
function releaseCrew(t){for(const s of crew(t))s.task=null;t.action=null;if(t.state!=="owned")t.turnsLeft=baseDays(tileStrength(t));}
function clearRubble(t){
if(t.kind!=="rubble"||t.state!=="owned"||t.action||G.mats<RUBBLE_COST)return;
G.mats-=RUBBLE_COST;
t.action="clear";
t.turnsLeft=t.clearD||1;
}
function finishRubble(t){
const p=tpos(t),d=DXY();
const r=Math.random();
if(r<0.4){G.food+=RUBBLE_FOOD;spawnFloat(p.x,p.y-d.hh-4,"+"+RUBBLE_FOOD);}
else if(r<0.7){G.items.p1++;spawnFloat(p.x,p.y-d.hh-4,"PLACEHOLDER1");}
else{G.items.p2++;spawnFloat(p.x,p.y-d.hh-4,"PLACEHOLDER2");}
t.action=null;
t.kind="lot";
}
function finish(t){
const c=crew(t);
t.action=null;
t.state="owned";
t.turnsLeft=0;
G.opened=true;
if(t.kind==="mysteryroll"){t.kind="lot";recruit(t);}
else if(t.kind==="camp"){t.kind="lot";recruit(t);}
else if(t.kind==="cache"){const n=rollRange(CACHE_ROLL);if(Math.random()<0.5)G.mats+=n;else G.food+=n;t.kind="lot";}
else if(t.kind==="pr"){G.pr=(G.pr||0)+1;t.kind="lot";}
for(const s of c)s.task=null;
}
