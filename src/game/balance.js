const START_FOOD=20,FOOD_PER_TILE=1,FOOD_PER_SURV=2,MAT_PER_TILE=1,SPEED=40,SURV_CAP=4;
const RUBBLE_COST=10,RUBBLE_FOOD=5,GATHER_BONUS=3,GATHER_SLOTS=1,CACHE_ROLL=[2,3];
const OVER_DUR=3,DAYS_CAP=3,RISK_STEP=0.33,RISK_CAP=0.99;
const ATK_FIRST=[5,7],ATK_SECOND=[5,6],ATK_REST=[4,7];
const BO_EVERY=10,BO_LEAD=2,BO_FAST_STEP=0.05,BO_FAST_CAP=0.4,BO_GROW=15,BO_GROW_CAP=115;
function boFastChance(count){return count<=1?0:Math.min(BO_FAST_CAP,BO_FAST_STEP*(count-1));}
function boHeightVS(count){return 1+Math.min(BO_GROW_CAP,BO_GROW*(Math.max(1,count)-1))/100;}
function boDark(count){const n=Math.max(1,count);return (n+1)*(n+2)/2;}
function tilePassive(t){return (t.kind==="grocery"?FOOD_PER_TILE:MAT_PER_TILE)+(t.b2?1:0);}
function rollRange(r){return r[0]+Math.floor(Math.random()*(r[1]-r[0]+1));}
function tileStrength(t){return Math.max(1,tierOf(t));}
function consumedN(S){return S<4?0:Math.floor((S-2)/2);}
function minCrew(S){return Math.max(1,consumedN(S));}
function effNeed(S,n){return S-n+1-Math.max(0,consumedN(S)-1);}
function taskDays(S,n){return Math.max(1,Math.min(DAYS_CAP,effNeed(S,n)));}
function taskRisk(S,n){const o=effNeed(S,n)-DAYS_CAP;return o>0?Math.min(RISK_CAP,Math.round(o*RISK_STEP*100)/100):0;}
function baseDays(S){return taskDays(S,minCrew(S));}
function crewUseful(S,n){return n<minCrew(S)||taskRisk(S,n)>0||taskDays(S,n)>1;}
function attackStrength(day){return day<8?1:Math.floor((day-8)/4)+2;}
function atkGap(n){return rollRange(n<=1?ATK_SECOND:ATK_REST);}
