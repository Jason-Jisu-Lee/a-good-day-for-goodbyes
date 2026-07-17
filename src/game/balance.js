const START_FOOD=10,FOOD_PER_TILE=2,FOOD_PER_SURV=3,MAT_PER_TILE=1,SPEED=40;
const DEATH_STEP=0.2,DEATH_CAP=0.8,OVER_DUR=3;
const DARK_TIER=[1,2,3,4,5],ATK_DAY_MIN=5,ATK_DAY_MAX=7,ATTACK_EVERY_T=3;
function darkBase(tier){return DARK_TIER[Math.min(tier,DARK_TIER.length-1)];}
function deathPct(tier,n){return tier<=1?0:Math.max(0,Math.min(DEATH_CAP,(darkBase(tier)-n+1)*DEATH_STEP));}
function safeCrew(tier){let n=1;while(deathPct(tier,n)>0)n++;return n;}
function reclaimTurns(tier,n){
const base=Math.max(1,tier);
if(n==null||deathPct(tier,n)>0)return base;
return Math.max(1,base-(n-safeCrew(tier)));
}
function crewUseful(tier,n){return !(deathPct(tier,n)<=0&&reclaimTurns(tier,n)<=1);}
