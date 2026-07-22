function tileLabel(s,x,y){
const l=L();
cx.save();
cx.scale(S,S);
cx.font="600 10px "+FONT_STACK;
cx.textBaseline="middle";
cx.textAlign="center";
cx.fillStyle=FG;
cx.fillText(s,x,y+3*l.sc);
cx.restore();
}
function drawTileVisual(t,x,y){
if(t.state!=="owned"){
cx.globalAlpha=0.4;
stampTile(x,y);
cx.globalAlpha=1;
return;
}
if(t.atk)cx.globalAlpha=0.25+0.7*(0.5+0.5*Math.sin(performance.now()/1200*Math.PI*2));
if(t.kind==="house"){stampTile(x,y,t.atk);if(!stampHouse(x,y))tileLabel("HOUSE",x,y);}
else if(t.kind==="house2"){stampTile(x,y,t.atk);if(!stampApt(x,y))tileLabel("APT",x,y);}
else{if(t.kind==="lot")floorFill(x,y);stampTile(x,y,t.atk);const lb=KIND_LABEL[t.kind];if(lb)tileLabel(lb,x,y);}
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
const bp=beatPrevFor(t);
const vt=bp?{kind:bp.prev.kind,state:bp.prev.state,atk:false}:t;
drawTileVisual(vt,p.x,p.y-lift);
if(!bp&&t.action&&t.turnsLeft>0&&(t.state!=="owned"||t.atk||t.action==="clear")){
const d=DXY();
text7(t.turnsLeft+"D",p.x,p.y-d.hh-12,1,"c",FG);
}
}
}
