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
x0-=d.hw+70;y0-=d.hh+50;x1+=d.hw+70;y1+=d.hh+50;
g.fillStyle="#262626";
for(let yy=y0;yy<y1;yy+=3){
for(let xx=x0;xx<x1;xx+=3){
let m=1e9;
for(const p of vis){
const v=Math.abs(xx-p.x)/d.hw+Math.abs(yy-p.y)/d.hh;
if(v<m)m=v;
}
if(m<1.06||m>2)continue;
if(hash2(xx*7,yy*7)<(2-m)*0.22){
const a=rr(xx),b=rr(yy);
g.fillRect(a,b,rr(xx+2)-a,rr(yy+2)-b);
}
}
}
return fogCv;
}
function shineSweep(cxx,cyy,sc){
const t=(performance.now()%1500)/1500;
const bx=(t*2-0.5)*190*sc*S;
cx.save();
cx.beginPath();
const x0=rr(cxx-82*sc),y0=rr(cyy-115*sc);
cx.rect(x0,y0,rr(cxx+86*sc)-x0,rr(cyy+56*sc)-y0);
cx.clip();
cx.globalCompositeOperation="multiply";
cx.translate(rr(cxx),rr(cyy-25*sc));
cx.rotate(-0.5);
cx.fillStyle="rgba(0,0,0,0.42)";
const w=38*sc*S,g=11*sc*S;
cx.fillRect(bx-g/2-w,-320*S,w,640*S);
cx.fillRect(bx+g/2,-320*S,w,640*S);
cx.restore();
cx.globalCompositeOperation="source-over";
}
function drawTiles(){
const l=L();
cx.drawImage(fogLayer(),0,0);
const sorted=[...G.tiles].sort((a,b)=>(a.gx+a.gy)-(b.gx+b.gy));
for(const t of sorted){
const p=tpos(t);
if(t===sel)ringUnder(p,FG);
else if(t===hoverTile&&!drawnTile(t))ringUnder(p,MID);
const hovered=t===hoverTile&&drawnTile(t);
const lift=hovered?Math.round(hoverA*4*Math.max(l.sc,0.5)):0;
const py=p.y-lift;
if(t.state==="unknown"){
if(!drawnTile(t))continue;
cx.globalAlpha=0.45;
stampTile(p.x,py);
cx.globalAlpha=0.9;
text7("?",p.x,py-10*l.sc,l.sc>0.6?3:2,"c");
cx.globalAlpha=1;
}else{
cx.globalAlpha=t.state==="owned"?1:0.55;
if(t.kind==="house"){if(!stampHouse(p.x,py)){stampTile(p.x,py);text7("HOUSE",p.x,py-3,1,"c");}}
else if(t.kind==="house2"){if(!stampApt(p.x,py)){stampTile(p.x,py);text7("APT",p.x,py-3,1,"c");}}
else{
stampTile(p.x,py);
const lb=KIND_LABEL[t.kind];
if(lb)text7(lb,p.x,py-3,1,"c");
}
cx.globalAlpha=1;
}
if(hovered)shineSweep(p.x,py,l.sc);
if(t.action){
const frac=Math.min(1,t.progress);
const d=DXY();
px(p.x-30,p.y-d.hh-16,60,4,"#262626");
if(frac>0)px(p.x-30,p.y-d.hh-16,Math.max(1,Math.round(60*frac)),4,FG);
}
}
}
