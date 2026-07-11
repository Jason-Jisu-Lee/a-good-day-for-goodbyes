function newGame(){
const tiles=[];
const originKinds=shuffle(["grocery","house","rubble","mystery"]);
let oi=0;
const bag=["scrap","scrap","grocery","house2","camp"];
if(Math.random()<0.5)bag.push("camp");
while(bag.length<12)bag.push("lot");
shuffle(bag);
let bi=0;
for(let gy=0;gy<4;gy++)for(let gx=0;gx<4;gx++){
const origin=(gx===1||gx===2)&&(gy===1||gy===2);
const t={gx,gy,kind:origin?originKinds[oi++]:bag[bi++],state:"unknown",blocked:false,progress:0,need:0,action:null};
if(origin&&t.kind!=="mystery"){t.state="owned";if(t.kind==="rubble")t.blocked=true;}
if(t.kind==="mystery")t.kind="mysteryroll";
tiles.push(t);
}
const survivors=[
{name:"MARA",face:0,x:0,y:0,task:null,arriveAt:0,eatT:EAT_EVERY*0.6,hungry:false},
{name:"REED",face:1,x:0,y:0,task:null,arriveAt:0,eatT:EAT_EVERY,hungry:false}
];
G={v:3,t:0,day:1,dayT:0,food:8,mats:0,matsSeen:false,opened:false,tiles,survivors,names:shuffle(NAME_BAG.slice()),faces:[2,3,4]};
for(let i=0;i<G.survivors.length;i++){const sp=idleSpot(G.survivors[i],i);G.survivors[i].x=sp.x;G.survivors[i].y=sp.y;}
}
