function lockedS(s){return !!s.task;}
function assign(t,type,members){
for(const s of members)s.task={type,tile:t};
if(type==="extinguish"){
if(t.state!=="owned")t.turnsLeft=reclaimTurns(tierOf(t),crew(t).length);
t.action="extinguish";
}
}
function releaseCrew(t){for(const s of crew(t))s.task=null;t.action=null;if(t.state!=="owned")t.turnsLeft=reclaimTurns(tierOf(t));}
function finish(t){
const c=crew(t);
t.action=null;
t.state="owned";
t.turnsLeft=0;
G.opened=true;
if(t.kind==="mysteryroll")t.kind="scrap";
if(t.kind==="camp"){t.kind="lot";recruit(t);}
else if(t.kind==="cache"){G.mats+=10;t.kind="lot";}
else if(t.kind==="pr"){G.pr=(G.pr||0)+1;t.kind="lot";}
for(const s of c)s.task=null;
}
