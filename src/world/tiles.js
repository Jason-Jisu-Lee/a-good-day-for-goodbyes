let fogCv=null,fogKey="";
function fogLayer(){
const key=G.tiles.map(t=>drawnTile(t)?"v":"u").join("")+"|"+S+"|"+W;
if(key===fogKey&&fogCv)return fogCv;
fogKey=key;
fogCv=mk(cv.width,cv.height);
const g=fogCv.getContext("2d");
const d=DXY();
const vis=[];
for(const t of G.tiles)if(drawnTile(t))vis.push(tpos(t));
if(!vis.length)return fogCv;
let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;
for(const p of vis){x0=Math.min(x0,p.x);y0=Math.min(y0,p.y);x1=Math.max(x1,p.x);y1=Math.max(y1,p.y);}
x0-=d.hw*2.6;y0-=d.hh*2.6;x1+=d.hw*2.6;y1+=d.hh*2.6;
g.fillStyle="#262626";
for(let yy=y0;yy<y1;yy+=3){
for(let xx=x0;xx<x1;xx+=3){
let m=1e9;
for(const p of vis){
const v=Math.abs(xx-p.x)/d.hw+Math.abs(yy-p.y)/d.hh;
if(v<m)m=v;
}
if(m<1.55||m>2.45)continue;
if(hash2(xx*7,yy*7)<(2.45-m)*0.24){
const a=rr(xx),b=rr(yy);
g.fillRect(a,b,rr(xx+2)-a,rr(yy+2)-b);
}
}
}
return fogCv;
}
function drawStreets(){
const l=L();
let n=0,ax=0,ay=0;
for(const t of G.tiles)if(drawnTile(t)){n++;const p=tpos(t);ax+=p.x;ay+=p.y;}
if(n<2)return;
const cx0=ax/n,cy0=ay/n;
const len=Math.hypot(66,42);
const dirs=[[66/len,-42/len],[66/len,42/len]];
const Lmax=232*l.sc;
for(const u of dirs){
for(let t=-Lmax;t<=Lmax;t+=2*l.sc){
const ph=((t+Lmax)/l.sc)%20;
if(ph>=12)continue;
const a=Math.abs(t);
let col="#5a5a5a";
if(a>198*l.sc)col="#262626";
else if(a>162*l.sc)col="#333333";
else if(a>122*l.sc)col="#454545";
px(cx0+u[0]*t-l.sc,cy0+u[1]*t-l.sc,2*l.sc,2*l.sc,col);
}
}
}
let shCv=null;
function shineTile(t,p,py){
const l=L();
const sc=l.sc;
const ox=rr(p.x-84*sc),oy=rr(py-116*sc);
const w=rr(p.x+88*sc)-ox,h=rr(py+58*sc)-oy;
if(!shCv||shCv.width<w||shCv.height<h){shCv=mk(w,h);}
const og=shCv.getContext("2d");
og.setTransform(1,0,0,1,0,0);
og.clearRect(0,0,shCv.width,shCv.height);
og.setTransform(1,0,0,1,-ox,-oy);
const main=cx;
setCtx(og);
drawTileVisual(t,p.x,py);
setCtx(main);
og.setTransform(1,0,0,1,0,0);
og.globalCompositeOperation="source-atop";
const tt=(performance.now()%1500)/1500;
const bx=(tt*340-170)*sc*S;
og.save();
og.translate(rr(p.x)-ox,rr(py-25*sc)-oy);
og.rotate(-0.5);
og.fillStyle="rgba(0,0,0,0.42)";
const bw=38*sc*S,bg=11*sc*S;
og.fillRect(bx-bg/2-bw,-340*S,bw,680*S);
og.fillRect(bx+bg/2,-340*S,bw,680*S);
og.restore();
og.globalCompositeOperation="source-over";
cx.globalCompositeOperation="lighter";
cx.drawImage(shCv,0,0,w,h,ox,oy,w,h);
cx.globalCompositeOperation="source-over";
}
function drawTileVisual(t,x,y){
const l=L();
if(t.state==="unknown"){
cx.globalAlpha=0.45;
stampTile(x,y);
cx.globalAlpha=0.9;
text7("?",x,y-10*l.sc,l.sc>0.6?3:2,"c");
cx.globalAlpha=1;
return;
}
cx.globalAlpha=t.state==="owned"?1:0.55;
if(t.kind==="house"){if(!stampHouse(x,y)){stampTile(x,y);text7("HOUSE",x,y-3,1,"c");}}
else if(t.kind==="house2"){if(!stampApt(x,y)){stampTile(x,y);text7("APT",x,y-3,1,"c");}}
else{
stampTile(x,y);
const lb=KIND_LABEL[t.kind];
if(lb)text7(lb,x,y-3,1,"c");
}
cx.globalAlpha=1;
}
function drawTiles(){
cx.drawImage(fogLayer(),0,0);
drawStreets();
const sorted=[...G.tiles].sort((a,b)=>(a.gx+a.gy)-(b.gx+b.gy));
for(const t of sorted){
const p=tpos(t);
if(t===sel)ringUnder(p,FG);
else if(t===hoverTile&&!drawnTile(t))ringUnder(p,MID);
if(t.state==="unknown"&&!drawnTile(t))continue;
if(t===hoverTile){
shineTile(t,p,p.y);
}else{
drawTileVisual(t,p.x,p.y);
}
if(t.action){
const frac=Math.min(1,t.progress);
const d=DXY();
px(p.x-30,p.y-d.hh-16,60,4,"#262626");
if(frac>0)px(p.x-30,p.y-d.hh-16,Math.max(1,Math.round(60*frac)),4,FG);
}
}
}
