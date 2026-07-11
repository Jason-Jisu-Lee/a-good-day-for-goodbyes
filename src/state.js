const FG="#f2f2f0",BG="#000000",DIM="#333333",MID="#777777";
const KIND_NAME={house:"HOUSE",house2:"APARTMENT",grocery:"FOOD",scrap:"SCRAPYARD",rubble:"RUBBLE",camp:"CAMP",cache:"SUPPLY CACHE",lot:"EMPTY LOT",mysteryroll:"UNKNOWN"};
const KIND_LABEL={grocery:"FOOD",scrap:"SCRAP",rubble:"RUBBLE",camp:"CAMP",cache:"CACHE"};
const SCOUT_T=15,RECLAIM_T=20,RECLAIM_LOT_T=10,CLEAR_T=20,CLEAR_COST=20;
const EAT_EVERY=20,DAY_LEN=90,FOOD_PM=5,MAT_PM=6,DR=0.65,SPEED=55;
const NAME_BAG=["JUNE","OKON","IVY","CALEB","NOOR","SAGE"];

let mode="menu",fade=0,fading=false,hover=null,menuButtons=[];
let G=null,sel=null,picker=null,uiButtons=[],hoverTile=null,hoverA=0,ts=1,fps=0,frames=0,fpsT=0;
let saveGag=false,viewItch=false;

function mult(n){let m=0,f=1;for(let i=0;i<n;i++){m+=f;f*=DR;}return m;}
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function hash2(x,y){return Math.abs(Math.sin(x*12.9898+y*78.233)*43758.5453)%1;}
