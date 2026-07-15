function drawTileVisual(t,x,y){
if(t.state!=="owned"){
const hp=darkEff(t);
const period=0.3*hp+0.25;
const on=(performance.now()/1000)%period<period*0.5;
cx.globalAlpha=on?0.6:0.15;
stampTile(x,y);
const s=Math.min(hp,8);
const pip=3,gap=2,tot=s*pip+(s-1)*gap;
let px0=x-tot/2;
for(let i=0;i<s;i++){px(px0,y-1.5,pip,pip,FG);px0+=pip+gap;}
cx.globalAlpha=1;
return;
}
if(t.kind==="house"){stampTile(x,y);if(!stampHouse(x,y))text7("HOUSE",x,y-3,1,"c");}
else if(t.kind==="house2"){stampTile(x,y);if(!stampApt(x,y))text7("APT",x,y-3,1,"c");}
else{stampTile(x,y);const lb=KIND_LABEL[t.kind];if(lb)text7(lb,x,y-3,1,"c");}
}
function drawTiles(){
const l=L();
drawStreets();
const sorted=[...G.tiles].sort((a,b)=>(a.gx+a.gy)-(b.gx+b.gy));
for(const t of sorted){
if(!drawnTile(t))continue;
const p=tpos(t);
const lift=t===hoverTile?hoverA*3*Math.max(l.sc,0.5):0;
drawTileVisual(t,p.x,p.y-lift);
if(t.action){
const frac=Math.min(1,t.progress);
const d=DXY();
px(p.x-15,p.y-d.hh-10,30,3,"#262626");
if(frac>0)px(p.x-15,p.y-d.hh-10,Math.max(1,Math.round(30*frac)),3,FG);
}
}
}
