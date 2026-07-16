function newGame(){
const tiles=[];
const originKinds=shuffle(["house","house","grocery","mystery"]);
let oi=0;
const bag1=["camp","grocery","scrap","scrap","item","item","lot","lot"];
shuffle(bag1);
let b1=0;
const bag2=["scrap","scrap","scrap","grocery","grocery","camp","camp","cache","pr","pr"];
while(bag2.length<24)bag2.push("lot");
shuffle(bag2);
let b2=0;
for(let gy=0;gy<GRID;gy++)for(let gx=0;gx<GRID;gx++){
const t={gx,gy,kind:"lot",state:"dark",turnsLeft:0,action:null,atk:false};
const tier=tierOf(t);
if(tier===0){
t.kind=originKinds[oi++];
if(t.kind==="mystery")t.kind="mysteryroll";
else t.state="owned";
}else{
t.kind=tier===1?bag1[b1++]:bag2[b2++%bag2.length];
}
if(t.state!=="owned")t.turnsLeft=reclaimTurns(tier);
tiles.push(t);
}
const survivors=[
{name:"MARA",face:0,col:SURV_COLS[0],x:0,y:0,task:null,power:SURV_POWER},
{name:"REED",face:1,col:SURV_COLS[1],x:0,y:0,task:null,power:SURV_POWER}
];
G={v:6,day:1,food:START_FOOD,mats:0,pr:0,matsSeen:false,opened:false,attackOn:false,armT:-1,atkT:ATTACK_EVERY_T,tiles,survivors,names:shuffle(NAME_BAG.slice()),faces:[2,3,4]};
for(let i=0;i<G.survivors.length;i++){const sp=idleSpot(G.survivors[i],i);G.survivors[i].x=sp.x;G.survivors[i].y=sp.y;}
}
