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
G={v:2,t:0,day:1,dayT:0,food:8,mats:0,matsSeen:false,tiles,survivors,names:shuffle(NAME_BAG.slice()),faces:[2,3,4]};
for(let i=0;i<G.survivors.length;i++){const sp=idleSpot(G.survivors[i],i);G.survivors[i].x=sp.x;G.survivors[i].y=sp.y;}
}

function drawGame(){
uiButtons=[];
drawTiles();
drawSurvivors();
drawHUD();
drawTopbar();
drawPanel();
}
function draw(){
px(0,0,W,H,BG);
if(mode==="menu")drawMenu();
else drawGame();
edgeR(0,0,W,H,"#1c1c1c");
}

let simLast=Date.now();
setInterval(()=>{
const now=Date.now();
const dt=Math.min(2,(now-simLast)/1000);
simLast=now;
if(mode==="game"&&G)sim(dt*ts);
},100);
setInterval(save,10000);
document.addEventListener("visibilitychange",()=>{if(document.hidden)save();});

let last=performance.now();
function step(t){
const dt=Math.min(100,t-last)/1000;last=t;
if(fading){fade=Math.min(1,fade+dt*3.5);if(fade>=1){fading=false;if(!G&&!load())newGame();mode="game";}}
if(mode==="game"&&G){
visual(dt);
hoverA+=((hoverTile?1:0)-hoverA)*Math.min(1,dt*10);
}
frames++;fpsT+=dt;if(fpsT>=1){fps=frames;frames=0;fpsT=0;}
if(!dbg.hidden&&G)document.getElementById("dbgstat").textContent="fps "+fps+" | day "+G.day+" | food "+G.food.toFixed(1)+" | mats "+G.mats.toFixed(1)+" | pop "+G.survivors.length+" | x"+ts;
draw();
requestAnimationFrame(step);
}
addEventListener("resize",fit);
if(location.hash.includes("game")){fit();if(!load())newGame();mode="game";}
fit();
requestAnimationFrame(step);
