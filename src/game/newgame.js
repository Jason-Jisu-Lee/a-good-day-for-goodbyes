function newGame(){
const tiles=[];
const originKinds=shuffle(["house","house","grocery","mystery"]);
let oi=0;
const bags={
1:shuffle(["camp","grocery","scrap","rubble","lot","lot","lot","lot"]),
2:shuffle(["camp","grocery","grocery","scrap","rubble","cache","lot","lot","lot","lot","lot","lot"]),
3:shuffle(["camp","grocery","grocery","scrap","scrap","rubble","rubble","pr","lot","lot","lot","lot","lot","lot","lot","lot"]),
4:shuffle(["camp","grocery","grocery","scrap","scrap","rubble","rubble","pr","lot","lot","lot","lot","lot","lot","lot","lot","lot","lot","lot","lot"]),
5:shuffle(["grocery","grocery","grocery","scrap","scrap","scrap","rubble","rubble","rubble","pr","lot","lot","lot","lot","lot","lot","lot","lot","lot","lot","lot","lot","lot","lot"]),
6:shuffle(["grocery","grocery","scrap","scrap","scrap","scrap","rubble","rubble","rubble","lot","lot","lot","lot","lot","lot","lot","lot","lot","lot","lot"]),
7:shuffle(["grocery","grocery","scrap","scrap","scrap","scrap","rubble","rubble","pr","lot","lot","lot","lot","lot","lot","lot"]),
8:shuffle(["grocery","grocery","scrap","scrap","scrap","scrap","rubble","rubble","lot","lot","lot","lot"]),
9:shuffle(["grocery","grocery","scrap","scrap","scrap","rubble","pr","lot"]),
10:shuffle(["grocery","scrap","scrap","pr"])
};
const bi={};
for(let gy=0;gy<GRID;gy++)for(let gx=0;gx<GRID;gx++){
const t={gx,gy,kind:"lot",state:"dark",turnsLeft:0,action:null,atk:false,atkS:0};
const tier=tierOf(t);
if(tier===0){
t.kind=originKinds[oi++];
if(t.kind==="mystery")t.kind="mysteryroll";
else t.state="owned";
}else{
bi[tier]=bi[tier]||0;
t.kind=bags[tier][bi[tier]++];
}
if(t.state!=="owned")t.turnsLeft=baseDays(Math.max(1,tier));
tiles.push(t);
}
const survivors=[
{name:"MARA",face:0,col:SURV_COLS[0],x:0,y:0,task:null},
{name:"REED",face:1,col:SURV_COLS[1],x:0,y:0,task:null}
];
G={v:9,day:1,food:START_FOOD,mats:0,pr:0,items:{p1:0,p2:0},tutDay:3+Math.floor(Math.random()*3),zoomTipSeen:false,tut:1,atkTipSeen:false,matsSeen:false,opened:false,atkN:0,nextAtk:rollRange(ATK_FIRST),tiles,survivors,names:NAME_BAG.slice(),faces:[2,3,4]};
for(let i=0;i<G.survivors.length;i++){const sp=idleSpot(G.survivors[i],i);G.survivors[i].x=sp.x;G.survivors[i].y=sp.y;}
}
