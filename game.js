const FG="#f2f2f0",BG="#000000",DIM="#333333",MID="#777777",GRAY="#9a9a9a";
const ROAD="#161616",CURB="#3d3d3d",DASH="#5a5a5a",GLINE="#4a4a4a";
const HUE_FOOD="#7fa06a",HUE_HOME="#b98e5f",HUE_MAT="#c9a83d";
const cv=document.getElementById("cv"),cx=cv.getContext("2d");
let W=960,H=540,k=1,S=1,dpr=1,PORT=false;

const F3={
"A":[".X.","X.X","XXX","X.X","X.X"],"B":["XX.","X.X","XX.","X.X","XX."],
"C":[".XX","X..","X..","X..",".XX"],"D":["XX.","X.X","X.X","X.X","XX."],
"E":["XXX","X..","XX.","X..","XXX"],"F":["XXX","X..","XX.","X..","X.."],
"G":[".XX","X..","X.X","X.X",".XX"],"H":["X.X","X.X","XXX","X.X","X.X"],
"I":["XXX",".X.",".X.",".X.","XXX"],"J":["..X","..X","..X","X.X",".X."],
"K":["X.X","X.X","XX.","X.X","X.X"],"L":["X..","X..","X..","X..","XXX"],
"M":["X.X","XXX","X.X","X.X","X.X"],"N":["XX.","X.X","X.X","X.X","X.X"],
"O":[".X.","X.X","X.X","X.X",".X."],"P":["XX.","X.X","XX.","X..","X.."],
"Q":[".X.","X.X","X.X","XX.","..X"],"R":["XX.","X.X","XX.","X.X","X.X"],
"S":[".XX","X..",".X.","..X","XX."],"T":["XXX",".X.",".X.",".X.",".X."],
"U":["X.X","X.X","X.X","X.X","XXX"],"V":["X.X","X.X","X.X","X.X",".X."],
"W":["X.X","X.X","X.X","XXX","X.X"],"X":["X.X","X.X",".X.","X.X","X.X"],
"Y":["X.X","X.X",".X.",".X.",".X."],"Z":["XXX","..X",".X.","X..","XXX"],
"0":["XXX","X.X","X.X","X.X","XXX"],"1":[".X.","XX.",".X.",".X.","XXX"],
"2":["XXX","..X","XXX","X..","XXX"],"3":["XXX","..X","XXX","..X","XXX"],
"4":["X.X","X.X","XXX","..X","..X"],"5":["XXX","X..","XXX","..X","XXX"],
"6":["XXX","X..","XXX","X.X","XXX"],"7":["XXX","..X","..X","..X","..X"],
"8":["XXX","X.X","XXX","X.X","XXX"],"9":["XXX","X.X","XXX","..X","XXX"],
" ":["...","...","...","...","..."]
};
const F7={
"A":[".XXX.","X...X","X...X","XXXXX","X...X","X...X","X...X"],
"B":["XXXX.","X...X","X...X","XXXX.","X...X","X...X","XXXX."],
"C":[".XXX.","X...X","X....","X....","X....","X...X",".XXX."],
"D":["XXXX.","X...X","X...X","X...X","X...X","X...X","XXXX."],
"E":["XXXXX","X....","X....","XXXX.","X....","X....","XXXXX"],
"F":["XXXXX","X....","X....","XXXX.","X....","X....","X...."],
"G":[".XXX.","X...X","X....","X.XXX","X...X","X...X",".XXXX"],
"H":["X...X","X...X","X...X","XXXXX","X...X","X...X","X...X"],
"I":["XXXXX","..X..","..X..","..X..","..X..","..X..","XXXXX"],
"J":["..XXX","...X.","...X.","...X.","...X.","X..X.",".XX.."],
"K":["X...X","X..X.","X.X..","XX...","X.X..","X..X.","X...X"],
"L":["X....","X....","X....","X....","X....","X....","XXXXX"],
"M":["X...X","XX.XX","X.X.X","X.X.X","X...X","X...X","X...X"],
"N":["X...X","XX..X","X.X.X","X..XX","X...X","X...X","X...X"],
"O":[".XXX.","X...X","X...X","X...X","X...X","X...X",".XXX."],
"P":["XXXX.","X...X","X...X","XXXX.","X....","X....","X...."],
"Q":[".XXX.","X...X","X...X","X...X","X.X.X","X..X.",".XX.X"],
"R":["XXXX.","X...X","X...X","XXXX.","X.X..","X..X.","X...X"],
"S":[".XXXX","X....","X....",".XXX.","....X","....X","XXXX."],
"T":["XXXXX","..X..","..X..","..X..","..X..","..X..","..X.."],
"U":["X...X","X...X","X...X","X...X","X...X","X...X",".XXX."],
"V":["X...X","X...X","X...X","X...X","X...X",".X.X.","..X.."],
"W":["X...X","X...X","X...X","X.X.X","X.X.X","XX.XX","X...X"],
"X":["X...X","X...X",".X.X.","..X..",".X.X.","X...X","X...X"],
"Y":["X...X","X...X",".X.X.","..X..","..X..","..X..","..X.."],
"Z":["XXXXX","....X","...X.","..X..",".X...","X....","XXXXX"],
"0":[".XXX.","X...X","X..XX","X.X.X","XX..X","X...X",".XXX."],
"1":["..X..",".XX..","..X..","..X..","..X..","..X..","XXXXX"],
"2":[".XXX.","X...X","....X","..XX.",".X...","X....","XXXXX"],
"3":[".XXX.","X...X","....X","..XX.","....X","X...X",".XXX."],
"4":["...X.","..XX.",".X.X.","X..X.","XXXXX","...X.","...X."],
"5":["XXXXX","X....","XXXX.","....X","....X","X...X",".XXX."],
"6":[".XXX.","X....","X....","XXXX.","X...X","X...X",".XXX."],
"7":["XXXXX","....X","...X.","..X..",".X...",".X...",".X..."],
"8":[".XXX.","X...X","X...X",".XXX.","X...X","X...X",".XXX."],
"9":[".XXX.","X...X","X...X",".XXXX","....X","....X",".XXX."],
"?":[".XXX.","X...X","....X","..XX.","..X..",".....","..X.."],
".":[".....",".....",".....",".....",".....","..X..","....."],
" ":[".....",".....",".....",".....",".....",".....","....."]
};

function rr(v){return Math.round(v*S);}
function px(x,y,w,h,col){cx.fillStyle=col;const a=rr(x),b=rr(y);cx.fillRect(a,b,rr(x+w)-a,rr(y+h)-b);}
function tw3(s,n){return (s.length*4-1)*n;}
function text3(s,x,y,n,al,col){col=col||FG;if(al==="c")x=Math.round(x-tw3(s,n)/2);if(al==="r")x=Math.round(x-tw3(s,n));for(const ch of s){const g=F3[ch];if(g)for(let r=0;r<5;r++)for(let q=0;q<3;q++)if(g[r][q]==="X")px(x+q*n,y+r*n,n,n,col);x+=4*n;}}
function tw7(s,n){return (s.length*6-1)*n;}
function text7(s,x,y,n,al,col){col=col||FG;if(al==="c")x=Math.round(x-tw7(s,n)/2);if(al==="r")x=Math.round(x-tw7(s,n));for(const ch of s){const g=F7[ch];if(g)for(let r=0;r<7;r++)for(let q=0;q<5;q++)if(g[r][q]==="X")px(x+q*n,y+r*n,n,n,col);x+=6*n;}}
function blit(c,x,y,n){const a=rr(x),b=rr(y);cx.drawImage(c,a,b,rr(x+c.width*n)-a,rr(y+c.height*n)-b);}
function blitImg(img,x,y,w){if(!img.width)return false;const a=rr(x),b=rr(y);cx.drawImage(img,a,b,rr(x+w)-a,rr(y+w)-b);return true;}
function edgeR(x,y,w,h,col){px(x,y,w,1,col);px(x,y+h-1,w,1,col);px(x,y,1,h,col);px(x+w-1,y,1,h,col);}

function mk(w,h){const c=document.createElement("canvas");c.width=w;c.height=h||w;return c;}
function sheetRows(rows){const c=mk(rows[0].length,rows.length);const g=c.getContext("2d");g.fillStyle=FG;for(let y=0;y<rows.length;y++)for(let x=0;x<rows[y].length;x++)if(rows[y][x]==="X")g.fillRect(x,y,1,1);return c;}
const DISCORD=["..............","..XX......XX..",".XXXXXXXXXXXX.",".XXXXXXXXXXXX.","XXXXXXXXXXXXXX","XXX..XXXX..XXX","XXX..XXXX..XXX","XXX..XXXX..XXX","XXXXXXXXXXXXXX","XXXXXXXXXXXXXX",".XXXXXXXXXXXX.","..XXX....XXX..","...X......X...",".............."];
function steamSheet(){const n=14,c=mk(n),g=c.getContext("2d");g.fillStyle=FG;
const on=(x,y)=>g.fillRect(x,y,1,1);
for(let y=0;y<n;y++)for(let x=0;x<n;x++){const dx=x-6.5,dy=y-6.5,d=Math.sqrt(dx*dx+dy*dy);if(d<=6.4&&d>=5.3){const ang=Math.atan2(dy,dx)*180/Math.PI;if(!(ang>108&&ang<168))on(x,y);}}
for(let y=0;y<n;y++)for(let x=0;x<n;x++){const dx=x-7.5,dy=y-5.6,d=Math.sqrt(dx*dx+dy*dy);if(d<=2.5&&d>=1.3)on(x,y);}
for(let t=0;t<=1;t+=0.05){const x=6.2-4.2*t,y=7.4+3.9*t;on(Math.round(x),Math.round(y));on(Math.round(x+1),Math.round(y));on(Math.round(x),Math.round(y+1));}
return c;}
const IC_DISCORD=sheetRows(DISCORD),IC_STEAM=steamSheet();

function disc(g,cx0,cy0,r){for(let y=Math.floor(cy0-r);y<=Math.ceil(cy0+r);y++){const dy=y-cy0,t=r*r-dy*dy;if(t<0)continue;const hw=Math.sqrt(t);for(let x=Math.ceil(cx0-hw);x<=Math.floor(cx0+hw);x++)g.fillRect(x,y,1,1);}}
function SPRSET(col){
function T(fn){const c=mk(34),g=c.getContext("2d");g.fillStyle=GLINE;g.fillRect(4,29,26,1);g.fillStyle=col;fn(g);return c;}
const house=T(g=>{
g.fillRect(10,17,14,12);
for(let y=9;y<=16;y++){const hw=Math.round((y-8)*1.15);for(let x=17-hw;x<=17+hw;x++)if(x>=8&&x<=26)g.fillRect(x,y,1,1);}
g.fillRect(21,10,2,4);
g.clearRect(14,22,3,7);
g.clearRect(19,19,3,3);
});
const grocery=T(g=>{
g.fillRect(5,12,24,2);
g.fillRect(6,14,22,15);
g.clearRect(9,13,8,1);
g.clearRect(9,18,9,7);
g.clearRect(21,19,4,10);
g.fillRect(22,24,1,1);
});
const scrap=T(g=>{
g.fillRect(4,20,13,1);
g.fillRect(4,20,1,9);g.fillRect(10,20,1,9);g.fillRect(16,20,1,9);
g.fillRect(20,23,4,6);
g.fillRect(24,21,5,8);
g.fillRect(21,20,3,3);
disc(g,19,27,2);g.clearRect(19,27,1,1);
});
const rubble=T(g=>{
g.fillRect(5,23,4,6);g.fillRect(5,21,2,2);
g.fillRect(12,26,9,3);g.fillRect(14,24,4,2);g.fillRect(19,25,2,1);
g.fillRect(24,24,5,5);g.fillRect(26,22,2,2);
g.fillRect(10,28,1,1);g.fillRect(22,28,1,1);g.fillRect(17,22,1,1);
g.clearRect(25,26,2,1);
});
const camp=T(g=>{
for(let i=0;i<14;i++){const half=Math.min(Math.floor(i*0.75),9);for(let x=11-half;x<=11+half;x++)if(x>=2)g.fillRect(x,15+i,1,1);}
g.clearRect(10,24,3,5);
g.fillRect(24,28,5,1);
g.fillRect(26,25,1,3);g.fillRect(25,26,1,2);g.fillRect(27,26,1,2);
g.fillRect(26,21,1,1);g.fillRect(27,19,1,1);
});
const cache=T(g=>{
g.fillRect(8,21,8,8);g.clearRect(9,24,6,1);
g.fillRect(18,23,6,6);g.clearRect(19,25,4,1);
g.fillRect(12,15,6,6);g.clearRect(13,17,4,1);
g.fillRect(26,27,2,2);
});
const lot=T(g=>{
g.fillRect(6,27,1,2);g.fillRect(11,28,1,1);g.fillRect(17,26,1,3);g.fillRect(23,28,1,1);g.fillRect(28,27,1,2);
g.fillRect(14,28,2,1);
});
return {house,grocery,scrap,rubble,camp,cache,lot};
}
const SPR_W=SPRSET(FG),SPR_G=SPRSET(GRAY);
const RING=(()=>{const c=mk(15),g=c.getContext("2d");g.fillStyle=FG;for(let y=0;y<15;y++)for(let x=0;x<15;x++){const d=Math.hypot(x-7,y-7);if(d<=7.2&&d>=4.6)g.fillRect(x,y,1,1);}return c;})();
const RING_D=(()=>{const c=mk(15),g=c.getContext("2d");g.fillStyle=MID;for(let y=0;y<15;y++)for(let x=0;x<15;x++){const d=Math.hypot(x-7,y-7);if(d<=7.2&&d>=4.6)g.fillRect(x,y,1,1);}return c;})();

const FACE_FILES=["face_woman","face_man","face_man2","face_woman2","face_man3"];
const AV=FACE_FILES.map(n=>{const i=new Image();i.src=n+".png?v=1";return i;});

const KIND_NAME={house:"HOUSE",grocery:"GROCERY",scrap:"SCRAPYARD",rubble:"RUBBLE",camp:"CAMP",cache:"SUPPLY CACHE",lot:"EMPTY LOT",mystery:"UNKNOWN"};
const HUES={grocery:HUE_FOOD,house:HUE_HOME,scrap:HUE_MAT};
const TS=102,ST=14,SPEED=55;
const SCOUT_T=15,RECLAIM_T=20,RECLAIM_LOT_T=10,CLEAR_T=20,CLEAR_COST=20;
const EAT_EVERY=40,DAY_LEN=90,FOOD_RATE=1/8,MAT_RATE=1/10,DR=0.65;
const NAME_BAG=["JUNE","OKON","IVY","CALEB","NOOR","SAGE"];
const BUBBLES=["COLD TONIGHT.","QUIET OUT THERE.","STILL STANDING.","SMELLS LIKE RAIN.","I MISS MUSIC."];

let mode="menu",fade=0,fading=false,hover=null,menuButtons=[];
let G=null,sel=null,picker=null,uiButtons=[],hoverTile=null,ts=1,fps=0,frames=0,fpsT=0;
let saveGag=false;

function mult(n){let m=0,f=1;for(let i=0;i<n;i++){m+=f;f*=DR;}return m;}
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}

function newGame(){
const tiles=[];
const originKinds=shuffle(["grocery","house","rubble","mystery"]);
let oi=0;
const bag=["scrap","scrap","grocery","house","camp"];
if(Math.random()<0.5)bag.push("camp");
while(bag.length<12)bag.push("lot");
shuffle(bag);
let bi=0;
for(let gy=0;gy<4;gy++)for(let gx=0;gx<4;gx++){
const origin=(gx===1||gx===2)&&(gy===1||gy===2);
const t={gx,gy,kind:origin?originKinds[oi++]:bag[bi++],state:"unknown",blocked:false,progress:0,need:0,action:null,reveal:0,pour:0};
if(origin&&t.kind!=="mystery"){t.state="owned";if(t.kind==="rubble")t.blocked=true;}
if(t.kind==="mystery")t.kind="mysteryroll";
tiles.push(t);
}
const survivors=[
{name:"MARA",face:0,x:0,y:0,task:null,arriveAt:0,eatT:EAT_EVERY*0.6,hungry:false,bubble:null,bubT:20+Math.random()*20},
{name:"REED",face:1,x:0,y:0,task:null,arriveAt:0,eatT:EAT_EVERY,hungry:false,bubble:null,bubT:30+Math.random()*20}
];
G={v:1,t:0,day:1,dayT:0,food:8,mats:0,tiles,survivors,names:shuffle(NAME_BAG.slice()),faces:[2,3,4]};
for(let i=0;i<G.survivors.length;i++){const sp=idleSpot(G.survivors[i],i);G.survivors[i].x=sp.x;G.survivors[i].y=sp.y;}
}

function L(){
if(PORT)return {mapX:45,mapY:64,pnX:45,pnY:548,pnW:450,pnH:300,avX:45,avY:880,hud:20};
return {mapX:60,mapY:52,pnX:700,pnY:60,pnW:244,pnH:392,avX:700,avY:466,hud:12};
}
function tileXY(t){const l=L();return {x:l.mapX+t.gx*(TS+ST),y:l.mapY+t.gy*(TS+ST)};}
function tileAt(mx,my){const l=L();for(const t of G.tiles){const p=tileXY(t);if(mx>=p.x&&mx<p.x+TS&&my>=p.y&&my<p.y+TS)return t;}return null;}
function workSpot(t,i){const p=tileXY(t);const off=[[30,68],[72,34],[52,82],[26,38]][i%4];return {x:p.x+off[0],y:p.y+off[1]};}
function ownedAdjacent(t){for(const o of G.tiles){if(o.state!=="owned")continue;if(Math.abs(o.gx-t.gx)<=1&&Math.abs(o.gy-t.gy)<=1&&o!==t)return true;}return false;}
function crew(t){return G.survivors.filter(s=>s.task&&s.task.tile===t);}
function arrived(t){return crew(t).filter(s=>G.t>=s.arriveAt&&(!s.hungry||t.kind==="grocery"));}
function idleSpot(s,i){const l=L();const cx0=l.mapX+2*TS+1.5*ST,cy0=l.mapY+2*TS+1.5*ST;const off=[[-26,12],[26,-12],[-10,-32],[12,32],[-38,-10],[38,12]][i%6];return {x:cx0+off[0],y:cy0+off[1]};}

function assign(t,type,members){
for(const s of members){s.task={type,tile:t};const sp=workSpot(t,G.survivors.indexOf(s));const d=Math.hypot(sp.x-s.x,sp.y-s.y);s.arriveAt=G.t+d/SPEED;}
if(type!=="gather"){t.action=type;
if(type==="scout")t.need=SCOUT_T;
if(type==="reclaim")t.need=(t.kind==="lot"||t.kind==="cache")?RECLAIM_LOT_T:RECLAIM_T;
if(type==="clear"){t.need=CLEAR_T;G.mats-=CLEAR_COST;}
}
}
function releaseCrew(t){for(const s of crew(t))s.task=null;if(t.action==="clear"){G.mats+=CLEAR_COST;t.progress=0;}t.action=null;}
function finish(t){
const type=t.action;
t.action=null;t.progress=0;
if(type==="scout"){
t.state="scouted";t.reveal=1;
if(t.kind==="mysteryroll"){const r=Math.random();t.kind=r<0.4?"grocery":(r<0.75?"cache":"lot");}
for(const s of crew(t))s.task=null;
}
if(type==="reclaim"){
t.state="owned";t.pour=1;
if(t.kind==="camp"){t.kind="lot";recruit(t);}
else if(t.kind==="cache"){G.mats+=25;t.kind="lot";}
for(const s of crew(t))s.task=null;
}
if(type==="clear"){t.blocked=false;t.kind="lot";for(const s of crew(t))s.task=null;}
}
function recruit(t){
if(G.survivors.length>=6)return;
const name=G.names.pop()||"ASH";
const face=G.faces.length?G.faces.shift():1;
const p=tileXY(t);
const s={name,face,x:p.x+51,y:p.y+51,task:null,arriveAt:0,eatT:EAT_EVERY,hungry:false,bubble:{text:"THANK YOU.",t:4},bubT:30};
G.survivors.push(s);
}

function sim(dt){
G.t+=dt;
G.dayT+=dt;if(G.dayT>=DAY_LEN){G.dayT-=DAY_LEN;G.day++;}
for(const t of G.tiles){
if(t.action){
const n=arrived(t).length;
if(n>0){t.progress+=dt*mult(n)/t.need;if(t.progress>=1)finish(t);}
}else if(t.state==="owned"&&!t.blocked&&(t.kind==="grocery"||t.kind==="scrap")){
const n=arrived(t).length;
if(n>0){
const r=mult(n)*(t.kind==="grocery"?FOOD_RATE:MAT_RATE)*dt;
if(t.kind==="grocery")G.food+=r;else G.mats+=r;
}
}
if(t.reveal>0)t.reveal=Math.max(0,t.reveal-dt*2);
if(t.pour>0)t.pour=Math.max(0,t.pour-dt*2.5);
}
for(const s of G.survivors){
s.eatT-=dt;
if(s.eatT<=0){
if(G.food>=1){G.food-=1;s.hungry=false;s.eatT=EAT_EVERY;}
else{if(!s.hungry&&!(s.task&&s.task.tile.kind==="grocery"))s.bubble={text:"SO HUNGRY.",t:4};s.hungry=true;s.eatT=6;}
}
if(s.hungry&&s.task&&s.task.tile.kind==="grocery"&&G.t>=s.arriveAt&&G.food>=1){G.food-=1;s.hungry=false;s.eatT=EAT_EVERY;}
s.bubT-=dt;
if(s.bubT<=0){s.bubT=25+Math.random()*30;if(!s.bubble&&Math.random()<0.6)s.bubble={text:BUBBLES[Math.floor(Math.random()*BUBBLES.length)],t:4};}
if(s.bubble){s.bubble.t-=dt;if(s.bubble.t<=0)s.bubble=null;}
}
}

function visual(dt){
for(let i=0;i<G.survivors.length;i++){
const s=G.survivors[i];
let target;
if(s.task){const spot=workSpot(s.task.tile,G.survivors.indexOf(s));target=s.hungry&&s.task.tile.kind!=="grocery"?null:spot;}
else target=idleSpot(s,i);
if(target){
const d=Math.hypot(target.x-s.x,target.y-s.y);
if(d>1){const step=Math.min(d,SPEED*dt*ts);s.x+=(target.x-s.x)/d*step;s.y+=(target.y-s.y)/d*step;}
}
}
}

function hash2(x,y){return Math.abs(Math.sin(x*12.9898+y*78.233)*43758.5453)%1;}
function unknownTile(x,y,amt){
for(let yy=0;yy<TS;yy+=2)for(let xx=0;xx<TS;xx+=2){
const d=Math.min(xx,yy,TS-2-xx,TS-2-yy);
if(d<8&&((xx+yy)/2)%2===0)px(x+xx,y+yy,2,2,"#242424");
else if(amt>0&&hash2(xx,yy)<amt)px(x+xx,y+yy,2,2,"#101010");
}}
function fogEdge(x,y,w,h){
for(let yy=y-22;yy<y+h+22;yy+=2)for(let xx=x-22;xx<x+w+22;xx+=2){
if(xx>=x&&xx<x+w&&yy>=y&&yy<y+h)continue;
const dx=Math.max(x-xx,xx-(x+w),0),dy=Math.max(y-yy,yy-(y+h),0),d=Math.max(dx,dy);
if(hash2(xx,yy)<0.45-d*0.02)px(xx,yy,2,2,"#1e1e1e");
}}
function streets(){
const l=L();
for(let i=0;i<3;i++){
const x=l.mapX+TS+i*(TS+ST),y=l.mapY;
px(x,y,ST,4*TS+3*ST,ROAD);
px(x,y,1,4*TS+3*ST,CURB);px(x+ST-1,y,1,4*TS+3*ST,CURB);
for(let yy=4;yy<4*TS+3*ST-8;yy+=24)px(x+6,y+yy,2,8,DASH);
}
for(let i=0;i<3;i++){
const y=l.mapY+TS+i*(TS+ST),x=l.mapX;
px(x,y,4*TS+3*ST,ST,ROAD);
px(x,y,4*TS+3*ST,1,CURB);px(x,y+ST-1,4*TS+3*ST,1,CURB);
for(let xx=4;xx<4*TS+3*ST-8;xx+=24)px(x+xx,y+6,8,2,DASH);
}
for(let i=0;i<3;i++)for(let j=0;j<3;j++){
px(l.mapX+TS+i*(TS+ST),l.mapY+TS+j*(TS+ST),ST,ST,ROAD);
}
}
function bubble(x,y,s){
const wdt=tw7(s,1)+10;
let bx=Math.min(Math.max(4,x),W-wdt-4);
px(bx,y,wdt,13,BG);
edgeR(bx,y,wdt,13,FG);
text7(s,bx+5,y+3,1);
px(x+1,y+13,1,1,FG);px(x,y+14,1,1,FG);
}

function statusOf(s){
if(s.hungry)return "HUNGRY";
if(!s.task)return "IDLE";
if(G.t<s.arriveAt)return "WALKING";
if(s.task.type==="gather")return s.task.tile.kind==="grocery"?"FOOD":"MATERIALS";
return s.task.type.toUpperCase()+"ING";
}
function btn(id,label,x,y,w,en){
uiButtons.push({id,x,y,w,h:44,en:en!==false});
const on=hover===id&&en!==false;
if(on){px(x,y,w,44,FG);text7(label,x+w/2,y+15,2,"c",BG);}
else{edgeR(x,y,w,44,en===false?DIM:FG);text7(label,x+w/2,y+15,2,"c",en===false?DIM:FG);}
}

function drawGame(){
const l=L();
uiButtons=[];
streets();
fogEdge(l.mapX,l.mapY,4*TS+3*ST,4*TS+3*ST);
for(const t of G.tiles){
const p=tileXY(t);
if(t.state==="unknown"){unknownTile(p.x,p.y,0);}
else{
px(p.x-1,p.y-1,TS+2,TS+2,BG);
edgeR(p.x-1,p.y-1,TS+2,TS+2,t.state==="owned"?DIM:"#262626");
const set=t.state==="owned"?SPR_W:SPR_G;
const kind=t.kind==="mysteryroll"?"lot":t.kind;
blit(set[kind]||set.lot,p.x,p.y,3);
if(t.state==="owned"&&!t.blocked&&HUES[t.kind]){
const full=78,wdt=t.pour>0?Math.round(full*(1-t.pour)):full;
px(p.x+12,p.y+87,wdt,3,HUES[t.kind]);
}
if(t.reveal>0){unknownTile(p.x,p.y,t.reveal*0.9);}
}
if(t.action){
const frac=Math.min(1,t.progress);
px(p.x+21,p.y+6,60,4,"#262626");
if(frac>0)px(p.x+21,p.y+6,Math.max(1,Math.round(60*frac)),4,FG);
}
}
if(hoverTile&&hoverTile!==sel){cornerMarks(hoverTile,DIM);}
if(sel){cornerMarks(sel,FG);}
for(let i=0;i<G.survivors.length;i++){
const s=G.survivors[i];
blit(s.hungry?RING_D:RING,s.x-15,s.y-15,2);
const nw=tw7(s.name,1);
px(s.x-nw/2-2,s.y-30,nw+4,11,BG);
text7(s.name,s.x,s.y-28,1,"c");
}
for(const s of G.survivors)if(s.bubble)bubble(s.x+6,s.y-48,s.bubble.text);
text7("FOOD "+Math.floor(G.food),16,l.hud,2);
text7("MATERIALS "+Math.floor(G.mats),160,l.hud,2);
text7("DAY "+G.day,W-16,l.hud+2,1,"r",MID);
drawPanel();
drawPortraits();
}
function cornerMarks(t,col){
const p=tileXY(t);
px(p.x-3,p.y-3,8,2,col);px(p.x-3,p.y-3,2,8,col);
px(p.x+TS-5,p.y-3,8,2,col);px(p.x+TS+1,p.y-3,2,8,col);
px(p.x-3,p.y+TS-5,2,8,col);px(p.x-3,p.y+TS+1,8,2,col);
px(p.x+TS-5,p.y+TS+1,8,2,col);px(p.x+TS+1,p.y+TS-5,2,8,col);
}
function drawPanel(){
const l=L();
if(!sel){edgeR(l.pnX,l.pnY,l.pnW,64,DIM);text7("TOWN",l.pnX+16,l.pnY+14,2,null,MID);text7(G.survivors.length+" SURVIVORS",l.pnX+16,l.pnY+38,1,null,MID);return;}
const t=sel;
edgeR(l.pnX,l.pnY,l.pnW,l.pnH,DIM);
const name=t.state==="unknown"?"UNKNOWN":KIND_NAME[t.kind==="mysteryroll"?"mystery":t.kind];
text7(name,l.pnX+16,l.pnY+14,2);
let status=t.state.toUpperCase();
if(t.state==="owned"&&t.blocked)status="BLOCKED";
if(t.action)status=t.action.toUpperCase()+"ING";
text7(status,l.pnX+16,l.pnY+40,1,null,MID);
let y=l.pnY+60;
if(t.action){
const n=arrived(t).length,c=crew(t);
text7(c.map(s=>s.name).join(" "),l.pnX+16,y,1,null,MID);y+=16;
if(n>0){const rem=Math.ceil((1-t.progress)*t.need/mult(n));text7(rem+"S LEFT",l.pnX+16,y,1,null,MID);}
y+=24;
btn("stop","STOP",l.pnX+16,y,120);
return;
}
if(picker){drawPicker(y);return;}
if(t.state==="unknown"&&ownedAdjacent(t)){btn("act_scout","SCOUT",l.pnX+16,y,140);y+=56;}
if(t.state==="scouted"){btn("act_reclaim","RECLAIM",l.pnX+16,y,140);y+=56;}
if(t.state==="owned"&&t.blocked){
text7("COST "+CLEAR_COST+" MATERIALS",l.pnX+16,y,1,null,MID);y+=20;
btn("act_clear","CLEAR",l.pnX+16,y,140,G.mats>=CLEAR_COST);y+=56;
}
if(t.state==="owned"&&!t.blocked&&(t.kind==="grocery"||t.kind==="scrap")){
const n=crew(t).length;
if(n>0){text7(n+" WORKING",l.pnX+16,y,1,null,MID);y+=20;btn("stop","STOP",l.pnX+16,y,120);y+=56;}
else{btn("act_gather","GATHER",l.pnX+16,y,140);y+=56;}
}
}
function drawPicker(y){
const l=L();
text7(picker.type.toUpperCase(),l.pnX+16,y,1,null,MID);y+=18;
for(const s of G.survivors){
const on=picker.set.has(s);
const id="pick_"+G.survivors.indexOf(s);
uiButtons.push({id,x:l.pnX+8,y:y-4,w:l.pnW-16,h:44,en:true});
if(hover===id)px(l.pnX+8,y-4,l.pnW-16,44,"#141414");
edgeR(l.pnX+16,y+8,14,14,on?FG:MID);
if(on){px(l.pnX+19,y+11,8,8,FG);}
text7(s.name,l.pnX+42,y+6,1);
text7(statusOf(s),l.pnX+42,y+20,1,null,MID);
y+=48;
}
y+=4;
btn("pick_go","START",l.pnX+16,y,110,picker.set.size>0);
btn("pick_no","CANCEL",l.pnX+140,y,110);
}
function drawPortraits(){
const l=L();
text7("SURVIVORS",l.avX,l.avY-14,1,null,MID);
for(let i=0;i<G.survivors.length;i++){
const s=G.survivors[i];
const x=l.avX+i*56;
if(!blitImg(AV[s.face],x,l.avY,48)){blit(RING,x+9,l.avY+9,2);}
if(s.hungry)edgeR(x,l.avY,48,48,MID);
}
}

function menuLayout(){
const port=H>W;
const mains=["ENTER","SETTINGS","QUIT GAME"];
const bs=port?{ty:220,ts:3,by:430,bh:64,bsc:3,dy:868}:{ty:150,ts:4,by:280,bh:52,bsc:3,dy:486};
menuButtons=[];
for(let i=0;i<3;i++){const label=mains[i];const w=tw3(label,bs.bsc)+56;const h=48;menuButtons.push({id:label,label,x:W/2-w/2,y:bs.by+i*bs.bh-h/2+8,w,h,scale:bs.bsc,ty:bs.by+i*bs.bh});}
const wl=tw3("WISHLIST",2),dc=tw3("DISCORD",2);
const g1=28+8+wl,g2=28+8+dc,total=g1+44+g2,x0=W/2-total/2;
menuButtons.push({id:"WISHLIST",label:"WISHLIST",x:x0-8,y:bs.dy-10,w:g1+16,h:44,scale:2,icon:IC_STEAM,ix:x0,iy:bs.dy,tx:x0+36,ty:bs.dy+9,dead:true});
menuButtons.push({id:"DISCORD",label:"DISCORD",x:x0+g1+44-8,y:bs.dy-10,w:g2+16,h:44,scale:2,icon:IC_DISCORD,ix:x0+g1+44,iy:bs.dy,tx:x0+g1+44+36,ty:bs.dy+9,dead:true});
return bs;
}
function drawMenu(){
const bs=menuLayout();
cx.globalAlpha=1-fade;
text3("A GOOD DAY TO SAY GOODBYE",W/2,bs.ty,bs.ts,"c");
for(const b of menuButtons){
if(b.dead){
cx.globalAlpha=(hover===b.id?1:0.55)*(1-fade);
blit(b.icon,b.ix,b.iy,2);
text3(b.label,b.tx,b.ty,2);
cx.globalAlpha=1-fade;
}else{
if(hover===b.id){px(b.x,b.y,b.w,b.h,FG);text3(b.label,W/2,b.ty,b.scale,"c",BG);}
else text3(b.label,W/2,b.ty,b.scale,"c");
}
}
cx.globalAlpha=1;
}

function draw(){
px(0,0,W,H,BG);
if(mode==="menu")drawMenu();
else drawGame();
}

function save(){
if(saveGag||!G)return;
const data={v:1,t:G.t,day:G.day,dayT:G.dayT,food:G.food,mats:G.mats,names:G.names,faces:G.faces,
tiles:G.tiles.map(t=>({gx:t.gx,gy:t.gy,kind:t.kind,state:t.state,blocked:t.blocked,progress:t.progress,need:t.need,action:t.action})),
survivors:G.survivors.map(s=>({name:s.name,face:s.face,x:Math.round(s.x),y:Math.round(s.y),eatT:s.eatT,hungry:s.hungry,
task:s.task?{type:s.task.type,gx:s.task.tile.gx,gy:s.task.tile.gy}:null}))};
try{localStorage.setItem("goodbyes_save",JSON.stringify(data));}catch(e){}
}
function load(){
try{
const raw=localStorage.getItem("goodbyes_save");
if(!raw)return false;
const d=JSON.parse(raw);
if(d.v!==1)return false;
G={v:1,t:d.t,day:d.day,dayT:d.dayT,food:d.food,mats:d.mats,names:d.names,faces:d.faces,tiles:[],survivors:[]};
G.tiles=d.tiles.map(t=>({gx:t.gx,gy:t.gy,kind:t.kind,state:t.state,blocked:t.blocked,progress:t.progress,need:t.need,action:t.action,reveal:0,pour:0}));
G.survivors=d.survivors.map(s=>{
const sv={name:s.name,face:s.face,x:s.x,y:s.y,eatT:s.eatT,hungry:s.hungry,task:null,arriveAt:0,bubble:null,bubT:20+Math.random()*20};
if(s.task){const tile=G.tiles.find(t=>t.gx===s.task.gx&&t.gy===s.task.gy);if(tile)sv.task={type:s.task.type,tile};}
return sv;
});
return true;
}catch(e){return false;}
}
function wipe(){
saveGag=true;
try{localStorage.removeItem("goodbyes_save");}catch(e){}
location.reload();
}

function toLogical(e){const r=cv.getBoundingClientRect();return {x:(e.clientX-r.left)/k,y:(e.clientY-r.top)/k};}
cv.addEventListener("pointermove",e=>{
const p=toLogical(e);
let h=null;
if(mode==="menu"){for(const b of menuButtons)if(p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h)h=b.id;hoverTile=null;}
else{
for(const b of uiButtons)if(p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h)h=b.id;
hoverTile=h?null:(G?tileAt(p.x,p.y):null);
}
hover=h;
cv.style.cursor=(h&&h!=="none")||hoverTile?"pointer":"default";
});
cv.addEventListener("pointerup",e=>{
const p=toLogical(e);
if(mode==="menu"){
for(const b of menuButtons){if(p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h){
if(b.id==="ENTER")fading=true;
if(b.id==="QUIT GAME")window.close();
}}
return;
}
for(const b of uiButtons){
if(p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h){
if(!b.en)return;
clickUI(b.id);
return;
}
}
const t=tileAt(p.x,p.y);
const l=L();
const inPanel=sel&&p.x>=l.pnX&&p.x<=l.pnX+l.pnW&&p.y>=l.pnY&&p.y<=l.pnY+l.pnH;
if(t){sel=t;picker=null;}
else if(!inPanel&&p.y>l.mapY-20){sel=null;picker=null;}
});
function clickUI(id){
if(id.startsWith("act_")){
const type=id.slice(4);
picker={type,set:new Set(G.survivors.filter(s=>!s.task&&!s.hungry).slice(0,1))};
return;
}
if(id.startsWith("pick_")){
const rest=id.slice(5);
if(rest==="go"){
if(picker.set.size>0){
for(const s of picker.set)if(s.task)s.task=null;
assign(sel,picker.type==="gather"?"gather":picker.type,[...picker.set]);
picker=null;
}
return;
}
if(rest==="no"){picker=null;return;}
const s=G.survivors[parseInt(rest,10)];
if(picker.set.has(s))picker.set.delete(s);else picker.set.add(s);
return;
}
if(id==="stop"){releaseCrew(sel);return;}
}
addEventListener("keydown",e=>{
if(e.key==="`"){toggleDbg();return;}
if(e.key==="Escape"){
if(mode==="game"){
if(picker){picker=null;return;}
if(sel){sel=null;return;}
save();mode="menu";fade=0;fading=false;sel=null;picker=null;
}
}
});

const dbg=document.createElement("div");
dbg.id="dbg";
dbg.hidden=true;
dbg.style.cssText="position:fixed;top:6px;left:6px;background:#111;border:1px solid #444;color:#ddd;font:11px monospace;padding:8px;z-index:9;user-select:none";
dbg.innerHTML='<div id="dbgstat"></div><div style="margin-top:6px"><button data-a="food">+25 FOOD</button> <button data-a="mats">+25 MATS</button></div><div style="margin-top:6px">SPEED <button data-a="x1">X1</button> <button data-a="x5">X5</button> <button data-a="x20">X20</button></div><div style="margin-top:6px"><button data-a="save">SAVE</button> <button data-a="wipe">WIPE</button></div>';
document.body.appendChild(dbg);
dbg.addEventListener("click",e=>{
const a=e.target.dataset&&e.target.dataset.a;
if(!a||!G)return;
if(a==="food")G.food+=25;
if(a==="mats")G.mats+=25;
if(a==="x1")ts=1;
if(a==="x5")ts=5;
if(a==="x20")ts=20;
if(a==="save")save();
if(a==="wipe")wipe();
});
function toggleDbg(){dbg.hidden=!dbg.hidden;if(dbg.hidden)ts=1;}
if(location.hash.includes("debug"))dbg.hidden=false;

function fit(){
dpr=window.devicePixelRatio||1;
PORT=innerHeight>innerWidth;
W=PORT?540:960;H=PORT?960:540;
k=Math.min(innerWidth/W,innerHeight/H);
if(k>=1)k=Math.floor(k);
S=k*dpr;
cv.style.width=W*k+"px";cv.style.height=H*k+"px";
cv.width=Math.max(1,Math.round(W*S));cv.height=Math.max(1,Math.round(H*S));
cx.imageSmoothingEnabled=false;
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
if(mode==="game"&&G)visual(dt);
frames++;fpsT+=dt;if(fpsT>=1){fps=frames;frames=0;fpsT=0;}
if(!dbg.hidden&&G)document.getElementById("dbgstat").textContent="fps "+fps+" | day "+G.day+" | food "+G.food.toFixed(1)+" | mats "+G.mats.toFixed(1)+" | pop "+G.survivors.length+" | x"+ts;
draw();
requestAnimationFrame(step);
}
addEventListener("resize",fit);
if(location.hash.includes("game")){fit();if(!load())newGame();mode="game";}
fit();
requestAnimationFrame(step);
