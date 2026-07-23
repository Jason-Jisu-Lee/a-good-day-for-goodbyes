const GRID=12,OB0=5,OB1=6;
const ZOOM_MIN=0.75,ZOOM_MAX=1.75,ZOOM_DEF=1.25,ZOOM_STEP=0.125;
let zoomS=ZOOM_DEF,zoomBarT=0;
function L(){
if(PORT)return {ox:W/2,oy:Math.round(H*0.18),sc:zoomS,pnX:W/2-225,pnY:Math.round(H*0.4896),pnW:450,pnH:300,hud:20};
return {ox:W/2,oy:H/2-120,sc:zoomS,pnX:W-204,pnY:60,pnW:188,pnH:392,hud:12};
}
function setZoom(nz,px2,py2){
nz=Math.max(ZOOM_MIN,Math.min(ZOOM_MAX,nz));
nz=ZOOM_MIN+Math.round((nz-ZOOM_MIN)/ZOOM_STEP)*ZOOM_STEP;
zoomBarT=1.4;
if(nz===zoomS)return;
const l=L(),r=nz/zoomS;
if(G){
for(const s of G.survivors){s.x=l.ox+(s.x-l.ox)*r;s.y=l.oy+(s.y-l.oy)*r;}
for(const f of floats){f.x=l.ox+(f.x-l.ox)*r;f.y=l.oy+(f.y-l.oy)*r;}
}
const wx=px2-camX,wy=py2-camY;
zoomS=nz;
camX=px2-(l.ox+(wx-l.ox)*r);
camY=py2-(l.oy+(wy-l.oy)*r);
clampCam();
}
function DXY(){const l=L();return {dx:48*l.sc,dy:24*l.sc,hw:34.5*l.sc,hh:17.25*l.sc};}
function tpos(t){const l=L(),d=DXY();return {x:l.ox+(t.gx-t.gy)*d.dx,y:l.oy+(t.gx+t.gy)*d.dy};}
function tAt(gx,gy){return gx>=0&&gx<GRID&&gy>=0&&gy<GRID?G.tiles[gy*GRID+gx]:null;}
function recenterCam(){
const l=L(),d=DXY();
camX=0;
camY=Math.round(H/2-(l.oy+(OB0+OB1)*d.dy));
clampCam();
}
function resetCam(){
zoomS=ZOOM_DEF;
recenterCam();
}
function clampCam(){
const l=L(),d=DXY();
let minX=l.ox-(GRID-1)*d.dx-d.hw,maxX=l.ox+(GRID-1)*d.dx+d.hw;
let minY=l.oy-d.hh,maxY=l.oy+2*(GRID-1)*d.dy+d.hh;
if(G){
let mnX=Infinity,mxX=-Infinity,mnY=Infinity,mxY=-Infinity;
for(const t of G.tiles){
if(!drawnTile(t))continue;
const p=tpos(t);
if(p.x<mnX)mnX=p.x;
if(p.x>mxX)mxX=p.x;
if(p.y<mnY)mnY=p.y;
if(p.y>mxY)mxY=p.y;
}
if(mnX<Infinity){minX=mnX-d.hw;maxX=mxX+d.hw;minY=mnY-d.hh;maxY=mxY+d.hh;}
}
camX=Math.max(160-maxX,Math.min(camX,W-160-minX));
camY=Math.max(120-maxY,Math.min(camY,H-120-minY));
}
function isOrigin(t){return t.gx>=OB0&&t.gx<=OB1&&t.gy>=OB0&&t.gy<=OB1;}
function tierOf(t){
const dx=t.gx<OB0?OB0-t.gx:(t.gx>OB1?t.gx-OB1:0);
const dy=t.gy<OB0?OB0-t.gy:(t.gy>OB1?t.gy-OB1:0);
return dx+dy;
}
function revealedT(t){return t.state==="owned";}
function ownedAdjacent(t){for(const o of G.tiles){if(o.state!=="owned")continue;if(Math.abs(o.gx-t.gx)+Math.abs(o.gy-t.gy)===1)return true;}return false;}
function drawnTile(t){return t.state==="owned"||isOrigin(t)||(G.opened&&ownedAdjacent(t));}
function visibleTile(t){return drawnTile(t);}
function extinguishable(t){return t.state!=="owned"&&drawnTile(t)&&ownedAdjacent(t);}
function frontierT(t){if(t.state!=="owned")return false;for(const o of G.tiles){if(o.state==="owned")continue;if(Math.abs(o.gx-t.gx)+Math.abs(o.gy-t.gy)===1)return true;}return false;}
function tileAt(mx,my){
const d=DXY();
const wx=mx-camX,wy=my-camY;
for(const t of G.tiles){
const p=tpos(t);
const m=Math.abs(wx-p.x)/d.hw+Math.abs(wy-p.y)/d.hh;
if(m<=1)return visibleTile(t)?t:null;
}
return null;
}
