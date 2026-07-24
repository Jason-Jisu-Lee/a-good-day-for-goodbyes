const TIER_SPEC={
1:{scrap:1,light:[0,1]},
2:{scrap:1,light:[1,2]},
3:{scrap:[1,2],light:[1,2]},
4:{scrap:[1,2],light:2,pr:[0,1]},
5:{scrap:[1,3],light:1,light2:1,pr:1},
6:{scrap:[2,3],light:[1,2],pr:[0,1]},
7:{scrap:[2,3],light:[1,2],pr:[0,1]},
8:{scrap:[2,3],light:[0,1],pr:[0,1]},
9:{scrap:[1,2],light:[0,1],pr:[0,1]},
10:{scrap:1,light:[0,1],pr:[0,1]}
};
function buildTierBag(spec,size){
const bag=[];
for(const k in spec){const n=Array.isArray(spec[k])?rollRange(spec[k]):spec[k];for(let i=0;i<n;i++)bag.push(k);}
if(bag.length>size)bag.length=size;
while(bag.length<size)bag.push("lot");
return shuffle(bag);
}
function newGame(){
const tiles=[];
const originKinds=shuffle(["house2","light2","lot","lot"]);
let oi=0;
const tierN={};
for(let gy=0;gy<GRID;gy++)for(let gx=0;gx<GRID;gx++){
const t={gx,gy,kind:"lot",state:"dark",turnsLeft:0,action:null,atk:false,atkS:0,tier:tierOf({gx,gy})};
if(t.tier>0)tierN[t.tier]=(tierN[t.tier]||0)+1;
tiles.push(t);
}
const bags={},bi={};
for(const tr in tierN)bags[tr]=buildTierBag(TIER_SPEC[tr]||{},tierN[tr]);
for(const t of tiles){
if(t.tier===0){
t.kind=originKinds[oi++];
t.state="owned";
}else{
bi[t.tier]=bi[t.tier]||0;
t.kind=bags[t.tier][bi[t.tier]++];
}
if(Math.random()<b2Chance(t.kind))t.b2=true;
if(t.state!=="owned")t.turnsLeft=baseDays(Math.max(1,t.tier));
delete t.tier;
}
const survivors=[
{name:"MARA",face:0,col:SURV_COLS[0],x:0,y:0,task:null,mc:true},
{name:"REED",face:2,col:SURV_COLS[1],x:0,y:0,task:null},
{name:"JUNE",face:3,col:SURV_COLS[2],x:0,y:0,task:null},
{name:"OKON",face:4,col:SURV_COLS[3],x:0,y:0,task:null}
];
G={v:11,day:1,mats:0,pr:0,light:1,boDay:0,boCount:0,boNeed:0,boFast:false,matsSeen:false,opened:true,atkN:0,nextAtk:rollRange(ATK_FIRST),peak:4,soleMusic:false,tiles,survivors,names:[],faces:[]};
for(let i=0;i<G.survivors.length;i++){const sp=idleSpot(G.survivors[i],i);G.survivors[i].x=sp.x;G.survivors[i].y=sp.y;}
}
