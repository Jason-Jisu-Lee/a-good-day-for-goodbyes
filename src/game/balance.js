const SCOUT_T=15,RECLAIM_T=20,RECLAIM_LOT_T=10,CLEAR_T=20,CLEAR_COST=20,FIRST_T=5;
const EAT_EVERY=30,DAY_LEN=90,GEN_PM=1,GEN_SURV_PM=2,GATHER_SLOTS=1,DR=0.65,SPEED=40,START_FOOD=10;
function genPM(n){return GEN_PM+GEN_SURV_PM*n;}
function mult(n){let m=0,f=1;for(let i=0;i<n;i++){m+=f;f*=DR;}return m;}
function scoutNeed(t){return tierOf(t)===0?FIRST_T:(tierOf(t)>=2?SCOUT_T*2:SCOUT_T);}
function reclaimNeed(t){return tierOf(t)===0?FIRST_T:((t.kind==="lot"||t.kind==="cache")?RECLAIM_LOT_T:RECLAIM_T);}
