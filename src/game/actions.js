function lockedS(s){return !!s.task;}
function defCrew(t){return crew(t).filter(s=>s.task.type==="extinguish");}
function recrewTile(t,added){
const c=t.state==="owned"?defCrew(t):crew(t);
if(c.length===0){
if(t.state==="owned")t.action=null;
else releaseCrew(t);
return;
}
const S=t.state==="owned"?t.atkS:tileStrength(t);
const fresh=taskDays(S,c.length);
const was=t.action==="extinguish"&&t.turnsLeft>0;
t.action="extinguish";
t.turnsLeft=added&&was?Math.min(t.turnsLeft,fresh):fresh;
}
function releaseCrew(t){for(const s of crew(t))s.task=null;t.action=null;if(t.state!=="owned")t.turnsLeft=baseDays(tileStrength(t));}
function buildLot(t,kind){
if(t.kind!=="lot"||t.state!=="owned"||t.action||G.mats<BUILD_COST)return;
G.mats-=BUILD_COST;
t.action="build";t.build=kind;t.turnsLeft=1;
}
function actionableT(t){
return !!t&&((t.state!=="owned"&&extinguishable(t))||(t.state==="owned"&&t.atk));
}
function dragAssign(s,t){
if(!actionableT(t))return;
const old=s.task?s.task.tile:null;
s.task={type:"extinguish",tile:t};
if(old&&old!==t)recrewTile(old,false);
recrewTile(t,true);
sel=t;picker={type:"extinguish"};
}
function finish(t){
const c=crew(t);
t.action=null;
t.state="owned";
t.turnsLeft=0;
G.opened=true;
if(t.kind==="light"||t.kind==="light2"){G.light=(G.light||0)+1;const p=tpos(t),d=DXY();spawnFloat(p.x,p.y-d.hh-4,"+LIGHT");}
else if(t.kind==="pr"){G.pr=(G.pr||0)+1;t.kind="lot";}
for(const s of c)s.task=null;
}
