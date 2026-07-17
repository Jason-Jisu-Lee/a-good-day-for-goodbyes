const GRID=12,OB0=5,OB1=6;
function L(){
if(PORT)return {ox:W/2,oy:Math.round(H*0.18),sc:1,pnX:W/2-225,pnY:Math.round(H*0.4896),pnW:450,pnH:300,hud:20};
return {ox:W/2,oy:H/2-120,sc:1,pnX:W-204,pnY:60,pnW:188,pnH:392,hud:12};
}
function DXY(){const l=L();return {dx:48*l.sc,dy:24*l.sc,hw:34.5*l.sc,hh:17.25*l.sc};}
function tpos(t){const l=L(),d=DXY();return {x:l.ox+(t.gx-t.gy)*d.dx,y:l.oy+(t.gx+t.gy)*d.dy};}
function tAt(gx,gy){return gx>=0&&gx<GRID&&gy>=0&&gy<GRID?G.tiles[gy*GRID+gx]:null;}
function resetCam(){
const l=L(),d=DXY();
camX=0;
camY=Math.round(H/2-(l.oy+(OB0+OB1)*d.dy));
clampCam();
}
function clampCam(){
const l=L(),d=DXY();
const minX=l.ox-(GRID-1)*d.dx-d.hw,maxX=l.ox+(GRID-1)*d.dx+d.hw;
const minY=l.oy-d.hh,maxY=l.oy+2*(GRID-1)*d.dy+d.hh;
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
