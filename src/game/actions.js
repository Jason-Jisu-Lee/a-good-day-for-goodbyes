function lockedS(s){return !!(s.task&&s.task.type!=="gather");}
function assign(t,type,members){
for(const s of members){s.task={type,tile:t};const sp=workSpot(t,G.survivors.indexOf(s));const d=Math.hypot(sp.x-s.x,sp.y-s.y);s.arriveAt=G.t+d/SPEED;}
if(type==="extinguish")t.action="extinguish";
}
function releaseCrew(t){for(const s of crew(t))s.task=null;t.action=null;}
function finish(t){
const type=t.action;
const c=crew(t);
t.action=null;t.progress=0;
if(type==="extinguish"){
t.state="owned";
G.opened=true;
if(t.kind==="mysteryroll"){const r=Math.random();t.kind=r<0.4?"grocery":(r<0.75?"cache":"lot");}
if(t.kind==="camp"){t.kind="lot";recruit(t);}
else if(t.kind==="cache"){G.mats+=10;t.kind="lot";}
else if(t.kind==="item"){const s=c[0]||G.survivors[0];if(s)s.power=(s.power||SURV_POWER)+1;t.kind="lot";}
}
for(const s of c)s.task=null;
}
