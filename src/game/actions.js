function lockedS(s){return !!(s.task&&s.task.type!=="gather");}
function assign(t,type,members){
for(const s of members){s.task={type,tile:t};const sp=workSpot(t,G.survivors.indexOf(s));const d=Math.hypot(sp.x-s.x,sp.y-s.y);s.arriveAt=G.t+d/SPEED;}
if(type!=="gather"){t.action=type;
if(type==="scout")t.need=SCOUT_T;
if(type==="reclaim")t.need=(t.kind==="lot"||t.kind==="cache")?RECLAIM_LOT_T:RECLAIM_T;
if(type==="clear"){t.need=CLEAR_T;G.mats-=CLEAR_COST;}
}
}
function releaseCrew(t){for(const s of crew(t))s.task=null;if(t.action==="clear"){G.mats+=CLEAR_COST;t.progress=0;}t.action=null;}
function finish(t){
const type=t.action;
t.action=null;t.progress=0;
if(type==="scout"){
t.state="scouted";
G.opened=true;
if(t.kind==="mysteryroll"){const r=Math.random();t.kind=r<0.4?"grocery":(r<0.75?"cache":"lot");}
for(const s of crew(t))s.task=null;
}
if(type==="reclaim"){
t.state="owned";
if(t.kind==="camp"){t.kind="lot";recruit(t);}
else if(t.kind==="cache"){G.mats+=10;t.kind="lot";}
for(const s of crew(t))s.task=null;
}
if(type==="clear"){t.blocked=false;t.kind="lot";for(const s of crew(t))s.task=null;}
}
