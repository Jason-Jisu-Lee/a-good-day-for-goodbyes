const FG="#f2f2f0",BG="#000000",DIM="#333333",MID="#777777";
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
"+":[".....","..X..","..X..","XXXXX","..X..","..X..","....."],
"-":[".....",".....",".....","XXXXX",".....",".....","....."],
"/":["....X","....X","...X.","..X..",".X...","X....","X...."],
" ":[".....",".....",".....",".....",".....",".....","....."]
};

function rr(v){return Math.round(v*S);}
function px(x,y,w,h,col){cx.fillStyle=col;const a=rr(x),b=rr(y);cx.fillRect(a,b,rr(x+w)-a,rr(y+h)-b);}
function tw3(s,n){return (s.length*4-1)*n;}
function text3(s,x,y,n,al,col){col=col||FG;if(al==="c")x=Math.round(x-tw3(s,n)/2);if(al==="r")x=Math.round(x-tw3(s,n));for(const ch of s){const g=F3[ch];if(g)for(let r=0;r<5;r++)for(let q=0;q<3;q++)if(g[r][q]==="X")px(x+q*n,y+r*n,n,n,col);x+=4*n;}}
function tw7(s,n){return (s.length*6-1)*n;}
function text7(s,x,y,n,al,col){col=col||FG;if(al==="c")x=Math.round(x-tw7(s,n)/2);if(al==="r")x=Math.round(x-tw7(s,n));for(const ch of s){const g=F7[ch];if(g)for(let r=0;r<7;r++)for(let q=0;q<5;q++)if(g[r][q]==="X")px(x+q*n,y+r*n,n,n,col);x+=6*n;}}
function blit(c,x,y,n){const a=rr(x),b=rr(y);cx.drawImage(c,a,b,rr(x+c.width*n)-a,rr(y+c.height*n)-b);}
function blitS(img,x,y,w,h){if(!img.width)return false;const a=rr(x),b=rr(y);cx.drawImage(img,a,b,rr(x+w)-a,rr(y+h)-b);return true;}
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

const RING=(()=>{const c=mk(15),g=c.getContext("2d");g.fillStyle=FG;for(let y=0;y<15;y++)for(let x=0;x<15;x++){const d=Math.hypot(x-7,y-7);if(d<=7.2&&d>=4.6)g.fillRect(x,y,1,1);}return c;})();
const RING_D=(()=>{const c=mk(15),g=c.getContext("2d");g.fillStyle=MID;for(let y=0;y<15;y++)for(let x=0;x<15;x++){const d=Math.hypot(x-7,y-7);if(d<=7.2&&d>=4.6)g.fillRect(x,y,1,1);}return c;})();

const FACE_FILES=["face_woman","face_man","face_man2","face_woman2","face_man3"];
const AV=FACE_FILES.map(n=>{const i=new Image();i.src=n+".png?v=1";return i;});
const T_HOUSE=new Image();T_HOUSE.src="ref_house.png?v=1";
const T_APT=new Image();T_APT.src="ref_apt.png?v=1";
const T_TILE=new Image();T_TILE.src="ref_tile.png?v=1";

const KIND_NAME={house:"HOUSE",house2:"APARTMENT",grocery:"FOOD",scrap:"SCRAPYARD",rubble:"RUBBLE",camp:"CAMP",cache:"SUPPLY CACHE",lot:"EMPTY LOT",mysteryroll:"UNKNOWN"};
const KIND_LABEL={grocery:"FOOD",scrap:"SCRAP",rubble:"RUBBLE",camp:"CAMP",cache:"CACHE"};
const SCOUT_T=15,RECLAIM_T=20,RECLAIM_LOT_T=10,CLEAR_T=20,CLEAR_COST=20;
const EAT_EVERY=20,DAY_LEN=90,FOOD_PM=5,MAT_PM=6,DR=0.65,SPEED=55;
const NAME_BAG=["JUNE","OKON","IVY","CALEB","NOOR","SAGE"];

let mode="menu",fade=0,fading=false,hover=null,menuButtons=[];
let G=null,sel=null,picker=null,uiButtons=[],hoverTile=null,ts=1,fps=0,frames=0,fpsT=0;
let saveGag=false;

function mult(n){let m=0,f=1;for(let i=0;i<n;i++){m+=f;f*=DR;}return m;}
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}

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

function L(){
if(PORT)return {ox:270,oy:100,sc:0.5,pnX:45,pnY:470,pnW:450,pnH:300,avX:45,avY:860,hud:20};
return {ox:384,oy:120,sc:1,pnX:756,pnY:60,pnW:188,pnH:392,avX:700,avY:466,hud:12};
}
function DXY(){const l=L();return {dx:96*l.sc,dy:60*l.sc,hw:66*l.sc,hh:42*l.sc};}
function tpos(t){const l=L(),d=DXY();return {x:l.ox+(t.gx-t.gy)*d.dx,y:l.oy+(t.gx+t.gy)*d.dy};}
function tAt(gx,gy){return gx>=0&&gx<4&&gy>=0&&gy<4?G.tiles[gy*4+gx]:null;}
function ownedAdjacent(t){for(const o of G.tiles){if(o.state!=="owned")continue;if(Math.abs(o.gx-t.gx)+Math.abs(o.gy-t.gy)===1)return true;}return false;}
function visibleTile(t){return t.state!=="unknown"||ownedAdjacent(t);}
function tileAt(mx,my){
const d=DXY();
for(const t of G.tiles){
const p=tpos(t);
const m=Math.abs(mx-p.x)/d.hw+Math.abs(my-p.y)/d.hh;
if(m<=1)return visibleTile(t)?t:null;
}
return null;
}
function workSpot(t,i){const p=tpos(t),l=L(),d=DXY();const off=[[0,10],[-20,4],[20,4],[0,18]][i%4];return {x:p.x+off[0]*l.sc,y:p.y+d.hh+off[1]*l.sc};}
function idleSpot(s,i){const l=L(),d=DXY();const cx0=l.ox,cy0=l.oy+3*d.dy;const off=[[-26,6],[26,-6],[-10,-18],[10,18],[-26,-6],[26,6]][i%6];return {x:cx0+off[0]*l.sc,y:cy0+off[1]*l.sc};}
function crew(t){return G.survivors.filter(s=>s.task&&s.task.tile===t);}
function arrived(t){return crew(t).filter(s=>G.t>=s.arriveAt&&(!s.hungry||t.kind==="grocery"));}

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
t.state="scouted";
if(t.kind==="mysteryroll"){const r=Math.random();t.kind=r<0.4?"grocery":(r<0.75?"cache":"lot");}
for(const s of crew(t))s.task=null;
}
if(type==="reclaim"){
t.state="owned";
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
const p=tpos(t),d=DXY();
const s={name,face,x:p.x,y:p.y+d.hh+8,task:null,arriveAt:0,eatT:EAT_EVERY,hungry:false};
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
const r=n*(t.kind==="grocery"?FOOD_PM:MAT_PM)/60*dt;
if(t.kind==="grocery")G.food+=r;else G.mats+=r;
}
}
}
if(G.mats>0&&!G.matsSeen)G.matsSeen=true;
for(const s of G.survivors){
s.eatT-=dt;
if(s.eatT<=0){
if(G.food>=1){G.food-=1;s.hungry=false;s.eatT=EAT_EVERY;}
else{if(!s.hungry&&!(s.task&&s.task.tile.kind==="grocery"))s.bubble={text:"SO HUNGRY.",t:4};s.hungry=true;s.eatT=6;}
}
if(s.hungry&&s.task&&s.task.tile.kind==="grocery"&&G.t>=s.arriveAt&&G.food>=1){G.food-=1;s.hungry=false;s.eatT=EAT_EVERY;}
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

function diaDashFallback(x,y,col){
const d=DXY();
cx.fillStyle=col;
for(let i=0;i<=28;i++){
if(i%7>=4)continue;
const xx=i*d.hw/28,yy=i*d.hh/28;
px(x+xx,y-d.hh+yy,2,2,col);
px(x-xx-2,y-d.hh+yy,2,2,col);
px(x+xx,y+d.hh-yy-2,2,2,col);
px(x-xx-2,y+d.hh-yy-2,2,2,col);
}
}
function stampTile(x,y){
const l=L();
if(T_TILE.width){cx.globalCompositeOperation="lighter";blitS(T_TILE,x-71*l.sc,y-77*l.sc,150*l.sc,128*l.sc);cx.globalCompositeOperation="source-over";}
else diaDashFallback(x,y,FG);
}
function stampHouse(x,y){
const l=L();
if(T_HOUSE.width){cx.globalCompositeOperation="lighter";blitS(T_HOUSE,x-71*l.sc,y-77*l.sc,150*l.sc,128*l.sc);cx.globalCompositeOperation="source-over";return true;}
return false;
}
function stampApt(x,y){
const l=L();
if(T_APT.width){cx.globalCompositeOperation="lighter";blitS(T_APT,x-71*l.sc,y-108*l.sc,155*l.sc,158*l.sc);cx.globalCompositeOperation="source-over";return true;}
return false;
}

function diaOutline(t,col){
const p=tpos(t),d=DXY();
for(let i=0;i<=d.hw;i++){
const yy=d.hh-i*d.hh/d.hw;
px(p.x+i,p.y-yy,1,1,col);
px(p.x-i,p.y-yy,1,1,col);
px(p.x+i,p.y+yy,1,1,col);
px(p.x-i,p.y+yy,1,1,col);
}
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
const sorted=[...G.tiles].sort((a,b)=>(a.gx+a.gy)-(b.gx+b.gy));
for(const t of sorted){
const p=tpos(t);
if(t.state==="unknown"){
if(t.gx<1||t.gx>2||t.gy<1||t.gy>2)continue;
cx.globalAlpha=0.45;
stampTile(p.x,p.y);
cx.globalAlpha=0.9;
text7("?",p.x,p.y-10*l.sc,l.sc>0.6?3:2,"c");
cx.globalAlpha=1;
}else{
cx.globalAlpha=t.state==="owned"?1:0.55;
if(t.kind==="house"){if(!stampHouse(p.x,p.y)){stampTile(p.x,p.y);text7("HOUSE",p.x,p.y-3,1,"c");}}
else if(t.kind==="house2"){if(!stampApt(p.x,p.y)){stampTile(p.x,p.y);text7("APT",p.x,p.y-3,1,"c");}}
else{
stampTile(p.x,p.y);
const lb=KIND_LABEL[t.kind];
if(lb)text7(lb,p.x,p.y-3,1,"c");
}
cx.globalAlpha=1;
}
if(t.action){
const frac=Math.min(1,t.progress);
const d=DXY();
px(p.x-30,p.y-d.hh-16,60,4,"#262626");
if(frac>0)px(p.x-30,p.y-d.hh-16,Math.max(1,Math.round(60*frac)),4,FG);
}
}
if(hoverTile&&hoverTile!==sel){diaOutline(hoverTile,MID);}
if(sel){diaOutline(sel,FG);}
for(let i=0;i<G.survivors.length;i++){
const s=G.survivors[i];
blit(s.hungry?RING_D:RING,s.x-7.5,s.y-7.5,1);
}
text7("FOOD "+Math.floor(G.food),16,l.hud,2);
let inc=0;
const srcs=[];
for(const t of G.tiles){
if(t.state==="owned"&&!t.blocked&&t.kind==="grocery"&&!t.action){
const n=arrived(t).length;
if(n>0){const r=n*FOOD_PM;inc+=r;srcs.push(n+" GATHERING  +"+r+"/MIN");}
}
}
const expn=G.survivors.length*3;
uiButtons.push({id:"inc",x:14,y:l.hud+20,w:96,h:13,en:true});
uiButtons.push({id:"exp",x:14,y:l.hud+34,w:96,h:13,en:true});
text7("+"+inc+"/MIN",16,l.hud+22,1,null,MID);
text7("-"+expn+"/MIN",16,l.hud+36,1,null,MID);
if(hover==="inc")tip(16,l.hud+52,srcs.length?srcs:["NO ONE GATHERING FOOD"]);
if(hover==="exp")tip(16,l.hud+52,[G.survivors.length+" SURVIVORS","EACH EATS 3/MIN"]);
if(G.matsSeen||G.mats>0)text7("MATERIALS "+Math.floor(G.mats),160,l.hud,2);
text7("DAY "+G.day,W-16,l.hud+32,1,"r",MID);
drawPanel();
drawPortraits();
}
function tip(x,y,lines){
let w=0;
for(const s of lines)w=Math.max(w,tw7(s,1));
px(x,y,w+12,lines.length*14+8,BG);
edgeR(x,y,w+12,lines.length*14+8,DIM);
for(let i=0;i<lines.length;i++)text7(lines[i],x+6,y+5+i*14,1);
}
function drawPanel(){
const l=L();
if(!sel)return;
const t=sel;
edgeR(l.pnX,l.pnY,l.pnW,l.pnH,DIM);
const name=t.state==="unknown"?"UNKNOWN":KIND_NAME[t.kind];
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
function lockedS(s){return !!(s.task&&s.task.type!=="gather");}
function drawPicker(y){
const l=L();
text7(picker.type.toUpperCase(),l.pnX+16,y,1,null,MID);y+=18;
for(const s of G.survivors){
const lk=lockedS(s);
const on=picker.set.has(s);
const id="pick_"+G.survivors.indexOf(s);
if(!lk){
uiButtons.push({id,x:l.pnX+8,y:y-4,w:l.pnW-16,h:44,en:true});
if(hover===id)px(l.pnX+8,y-4,l.pnW-16,44,"#141414");
}
edgeR(l.pnX+16,y+8,14,14,lk?DIM:(on?FG:MID));
if(on&&!lk){px(l.pnX+19,y+11,8,8,FG);}
text7(s.name,l.pnX+42,y+6,1,null,lk?DIM:FG);
text7(statusOf(s),l.pnX+42,y+20,1,null,lk?DIM:MID);
y+=48;
}
const n=picker.set.size;
if(n>0){
let line;
if(picker.type==="gather"){
const r=n*(sel.kind==="grocery"?FOOD_PM:MAT_PM);
line="+"+r+"/MIN";
}else{
const need=picker.type==="scout"?SCOUT_T:(picker.type==="clear"?CLEAR_T:((sel.kind==="lot"||sel.kind==="cache")?RECLAIM_LOT_T:RECLAIM_T));
line=Math.ceil(need/mult(n))+"S";
}
text7(line,l.pnX+16,y,2);
}
y+=26;
btn("pick_go","START",l.pnX+16,y,80,n>0);
btn("pick_no","CANCEL",l.pnX+100,y,80);
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
text3("A GOOD DAY FOR GOODBYES",W/2,bs.ty,bs.ts,"c");
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
edgeR(0,0,W,H,"#1c1c1c");
}

function save(){
if(saveGag||!G)return;
const data={v:2,t:G.t,day:G.day,dayT:G.dayT,food:G.food,mats:G.mats,matsSeen:G.matsSeen,names:G.names,faces:G.faces,
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
if(d.v!==2)return false;
G={v:2,t:d.t,day:d.day,dayT:d.dayT,food:d.food,mats:d.mats,matsSeen:!!d.matsSeen||d.mats>0,names:d.names,faces:d.faces,tiles:[],survivors:[]};
G.tiles=d.tiles.map(t=>({gx:t.gx,gy:t.gy,kind:t.kind,state:t.state,blocked:t.blocked,progress:t.progress,need:t.need,action:t.action}));
G.survivors=d.survivors.map(s=>{
const sv={name:s.name,face:s.face,x:s.x,y:s.y,eatT:s.eatT,hungry:s.hungry,task:null,arriveAt:0};
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
else if(!inPanel&&p.y>40){sel=null;picker=null;}
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
if(lockedS(s))return;
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

let sizeItch=false;
const szb=document.createElement("button");
szb.style.cssText="position:fixed;top:6px;right:70px;background:#111;border:1px solid #333;color:#888;font:11px monospace;padding:5px 9px;z-index:9;cursor:pointer";
document.body.appendChild(szb);
szb.addEventListener("click",()=>{sizeItch=!sizeItch;fit();});
function szLabel(){szb.textContent=(sizeItch?"VIEW: ITCH 960":"VIEW: FULL")+(k>=1?" X"+k:"");}
const rsb=document.createElement("button");
rsb.textContent="RESET";
rsb.style.cssText="position:fixed;top:6px;right:6px;background:#111;border:1px solid #333;color:#888;font:11px monospace;padding:5px 9px;z-index:9;cursor:pointer";
document.body.appendChild(rsb);
rsb.addEventListener("click",()=>{wipe();});

function fit(){
dpr=window.devicePixelRatio||1;
PORT=innerHeight>innerWidth;
W=PORT?540:960;H=PORT?960:540;
k=Math.min(innerWidth/W,innerHeight/H);
if(k>=1)k=Math.floor(k);
if(sizeItch)k=Math.min(k,1);
S=k*dpr;
cv.style.width=W*k+"px";cv.style.height=H*k+"px";
cv.width=Math.max(1,Math.round(W*S));cv.height=Math.max(1,Math.round(H*S));
cx.imageSmoothingEnabled=false;
szLabel();
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
