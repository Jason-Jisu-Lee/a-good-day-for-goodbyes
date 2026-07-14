const EAT_EVERY=30,DAY_LEN=90,GEN_PM=1,GEN_SURV_PM=2,GATHER_SLOTS=1,SPEED=40,START_FOOD=10;
const SURV_POWER=1,EXT_SECS=4,DEATH_RATE=0.02;
const DARK_TIER=[1,2,3];
function genPM(n){return GEN_PM+GEN_SURV_PM*n;}
function darkBase(tier){return DARK_TIER[Math.min(tier,DARK_TIER.length-1)];}
function ownedNeighbors(t){let n=0;for(const o of G.tiles){if(o.state==="owned"&&Math.abs(o.gx-t.gx)+Math.abs(o.gy-t.gy)===1)n++;}return n;}
function darkEff(t){return Math.max(1,(t.dark||0)-Math.max(0,ownedNeighbors(t)-1));}
