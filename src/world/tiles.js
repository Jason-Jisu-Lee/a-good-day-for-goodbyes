function drawTileVisual(t,x,y){
const l=L();
if(t.state==="unknown"){
cx.globalAlpha=0.45;
stampTile(x,y);
cx.globalAlpha=0.9;
text7("?",x,y-5*l.sc,2,"c");
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
const l=L();
drawStreets();
const sorted=[...G.tiles].sort((a,b)=>(a.gx+a.gy)-(b.gx+b.gy));
for(const t of sorted){
if(!drawnTile(t))continue;
const p=tpos(t);
const lift=t===hoverTile?Math.round(hoverA*2*Math.max(l.sc,0.5)):0;
drawTileVisual(t,p.x,p.y-lift);
if(t.action){
const frac=Math.min(1,t.progress);
const d=DXY();
px(p.x-15,p.y-d.hh-10,30,3,"#262626");
if(frac>0)px(p.x-15,p.y-d.hh-10,Math.max(1,Math.round(30*frac)),3,FG);
}
}
if(showIds){
const d=DXY();
for(const t of G.tiles){
const p=tpos(t);
text7(tileId(t),p.x,p.y+d.hh-11,1,"c",drawnTile(t)?MID:DIM);
}
}
}
