const SCOUT_T=15,RECLAIM_T=20,RECLAIM_LOT_T=10,CLEAR_T=20,CLEAR_COST=20;
const EAT_EVERY=30,DAY_LEN=90,FOOD_PM=5,MAT_PM=6,DR=0.65,SPEED=80,START_FOOD=10;
function mult(n){let m=0,f=1;for(let i=0;i<n;i++){m+=f;f*=DR;}return m;}
