function newGame(){
const tiles=[];
const originKinds=shuffle(["house","house","grocery","mystery"]);
let oi=0;
const bag1=["scrap","grocery","house2","camp","item","lot","lot","lot"];
if(Math.random()<0.5)bag1[6]="camp";
shuffle(bag1);
let b1=0;
const bag2=["scrap","scrap","scrap","grocery","grocery","camp","camp","cache","cache","cache"];
while(bag2.length<24)bag2.push("lot");
shuffle(bag2);
let b2=0;
for(let gy=0;gy<GRID;gy++)for(let gx=0;gx<GRID;gx++){
const t={gx,gy,kind:"lot",state:"dark",progress:0,action:null,dark:0};
const tier=tierOf(t);
if(tier===0){
t.kind=originKinds[oi++];
if(t.kind==="mystery"){t.kind="mysteryroll";t.dark=darkBase(0);}
else t.state="owned";
}else{
t.kind=tier===1?bag1[b1++]:bag2[b2++%bag2.length];
t.dark=darkBase(tier);
}
tiles.push(t);
}
const survivors=[
{name:"MARA",face:0,col:SURV_COLS[0],x:0,y:0,task:null,arriveAt:0,eatT:EAT_EVERY*0.6,hungry:false,power:SURV_POWER},
{name:"REED",face:1,col:SURV_COLS[1],x:0,y:0,task:null,arriveAt:0,eatT:EAT_EVERY,hungry:false,power:SURV_POWER}
];
G={v:5,t:0,day:1,dayT:0,food:START_FOOD,mats:0,matsSeen:false,opened:false,tiles,survivors,names:shuffle(NAME_BAG.slice()),faces:[2,3,4]};
for(let i=0;i<G.survivors.length;i++){const sp=idleSpot(G.survivors[i],i);G.survivors[i].x=sp.x;G.survivors[i].y=sp.y;}
}
