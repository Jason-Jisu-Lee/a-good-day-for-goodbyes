const START_FOOD=10,FOOD_PER_TILE=2,FOOD_PER_SURV=3,MAT_PER_TILE=1,SPEED=40;
const DEATH_STEP=0.2,DEATH_CAP=0.8,OVER_DUR=3;
const DARK_TIER=[1,2,3,4,5],ATTACK_TIER=1,ATTACK_GRACE_T=3,ATTACK_EVERY_T=3;
function darkBase(tier){return DARK_TIER[Math.min(tier,DARK_TIER.length-1)];}
function deathPct(tier,n){return tier<=1?0:Math.max(0,Math.min(DEATH_CAP,(darkBase(tier)-n+1)*DEATH_STEP));}
function reclaimTurns(tier){return Math.max(1,tier);}
