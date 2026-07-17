function drawTileVisual(t,x,y){
if(t.state!=="owned"){
cx.globalAlpha=0.4;
stampTile(x,y);
cx.globalAlpha=1;
return;
}
if(t.atk)cx.globalAlpha=0.25+0.7*(0.5+0.5*Math.sin(performance.now()/1200*Math.PI*2));
if(t.kind==="house"){stampTile(x,y,t.atk);if(!stampHouse(x,y))text7("HOUSE",x,y-3,1,"c");}
else if(t.kind==="house2"){stampTile(x,y,t.atk);if(!stampApt(x,y))text7("APT",x,y-3,1,"c");}
else{stampTile(x,y,t.atk);const lb=KIND_LABEL[t.kind];if(lb)text7(lb,x,y-3,1,"c");}
cx.globalAlpha=1;
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
if(t.action&&t.turnsLeft>0&&(t.state!=="owned"||t.atk)){
const d=DXY();
text7(t.turnsLeft+"D",p.x,p.y-d.hh-12,1,"c",FG);
}
}
}
